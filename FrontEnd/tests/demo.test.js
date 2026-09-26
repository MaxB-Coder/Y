// @vitest-environment node
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkLogin } from '../src/asyncFunctions/loginAPICalls.js';
import { getPeeps, postPeep } from '../src/asyncFunctions/peepAPICalls.js';
import { checkSignUp } from '../src/asyncFunctions/signUpAPICalls.js';
import { createHandlers } from '../src/demo/handlers.js';
import { createStore, DEMO_ACCOUNT } from '../src/demo/store.js';

const BASE = 'http://y.test/api';

/** A tiny in-memory Storage, standing in for sessionStorage. */
function memoryStorage() {
  const data = new Map();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, String(v)) };
}

let storage;
const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  vi.stubEnv('VITE_PEEPSURL', BASE);
  storage = memoryStorage();
  server.resetHandlers(...createHandlers(BASE, createStore(storage)));
});
afterEach(() => vi.unstubAllEnvs());
afterAll(() => server.close());

describe('Y demo backend', () => {
  it('starts with a timeline of seeded peeps', async () => {
    const { peeps, status } = await getPeeps();
    expect(status).toBe(200);
    expect(peeps.length).toBeGreaterThanOrEqual(5);
    expect(peeps[0]).toMatchObject({ username: expect.any(String), message: expect.any(String), $date: expect.any(String) });
  });

  it('logs in the demo account without ever returning a password', async () => {
    const { login, status } = await checkLogin(DEMO_ACCOUNT);
    expect(status).toBe(200);
    expect(login.user).toHaveLength(1);
    expect(login.user[0].username).toBe('demo');
    expect(JSON.stringify(login)).not.toMatch(/password/i);
  });

  it('rejects a wrong password', async () => {
    const { login } = await checkLogin({ email: DEMO_ACCOUNT.email, password: 'Wrong123!' });
    expect(login.user).toEqual([]);
  });

  it('signs up a new visitor who can then log in', async () => {
    const visitor = { name: 'Ada', username: 'ada', email: 'ada@example.com', password: 'Visitor1!' };
    expect(await checkSignUp(visitor)).toBe(true);
    const { login } = await checkLogin({ email: visitor.email, password: visitor.password });
    expect(login.user[0].username).toBe('ada');
  });

  it('refuses a second account with the same email', async () => {
    const result = await checkSignUp({ name: 'X', username: 'someone', email: DEMO_ACCOUNT.email, password: 'Other123!' });
    expect(result).not.toBe(true);
    expect(result.status).toBe(500);
  });

  it('adds a posted peep to the timeline', async () => {
    const { status } = await postPeep({ username: 'demo', message: 'Hello from the demo', $date: new Date().toISOString() });
    expect(status).toBe(201);
    const { peeps } = await getPeeps();
    expect(peeps.map((p) => p.message)).toContain('Hello from the demo');
  });

  it('keeps the visitor\'s changes for the rest of the session', async () => {
    await postPeep({ username: 'demo', message: 'Still here', $date: new Date().toISOString() });
    server.resetHandlers(...createHandlers(BASE, createStore(storage)));
    const { peeps } = await getPeeps();
    expect(peeps.map((p) => p.message)).toContain('Still here');
  });

  it('never stores passwords in plain text', async () => {
    await checkSignUp({ name: 'Ada', username: 'ada', email: 'ada@example.com', password: 'Visitor1!' });
    expect(storage.getItem('y-demo')).not.toContain('Visitor1!');
  });
});
