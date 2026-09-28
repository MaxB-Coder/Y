import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import Login from '../src/components/login/Login.jsx';
import HeaderPeeps from '../src/components/peeps/HeaderPeeps.jsx';
import AuthContext, { AuthProvider } from '../src/context/AuthProvider.jsx';
import useAuth from '../src/hooks/useAuth.js';
import { createHandlers } from '../src/demo/handlers.js';
import { createStore } from '../src/demo/store.js';

const BASE = 'http://y.test/api';
const server = setupServer();

/** Shows who is logged in, standing in for the timeline. */
function Timeline() {
  const { auth } = useAuth();
  return <p>Timeline for {auth.username ?? 'nobody'}</p>;
}

function renderLogin() {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

function renderHeader(auth, setAuth = () => {}) {
  render(
    <AuthContext.Provider value={{ auth, setAuth }}>
      <MemoryRouter>
        <HeaderPeeps />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  vi.stubEnv('VITE_PEEPSURL', BASE);
  const data = new Map();
  const storage = { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, String(v)) };
  server.resetHandlers(...createHandlers(BASE, createStore(storage)));
});
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});
afterAll(() => server.close());

describe('the login page', () => {
  it('in the demo, logs straight in to the demo account with one tap', async () => {
    vi.stubEnv('VITE_DEMO', 'true');
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: 'Try the demo account' }));
    expect(await screen.findByText('Timeline for demo')).toBeInTheDocument();
  });

  it('outside the demo, has no demo account button', () => {
    vi.stubEnv('VITE_DEMO', 'false');
    renderLogin();
    expect(screen.queryByRole('button', { name: 'Try the demo account' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });
});

describe('the timeline header', () => {
  it('offers both logging in and signing up to a visitor', () => {
    renderHeader({});
    expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute('href', '/sign-up');
  });

  it('offers logging out once logged in, which ends the session', async () => {
    const setAuth = vi.fn();
    renderHeader({ username: 'demo', email: 'demo@y.test' }, setAuth);
    expect(screen.queryByRole('link', { name: 'Sign up' })).toBeNull();
    fireEvent.click(screen.getByRole('link', { name: 'Log out' }));
    await waitFor(() => expect(setAuth).toHaveBeenCalledWith({}));
  });
});
