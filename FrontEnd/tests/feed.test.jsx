import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Peep from '../src/components/peeps/Peep.jsx';
import PostPeeps from '../src/components/peeps/PostPeeps.jsx';
import PeepModel from '../src/components/utils/peep.model.js';
import AuthContext from '../src/context/AuthProvider.jsx';

describe('a peep', () => {
  it('shows who posted it, when, and what they said', () => {
    const posted = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    render(<Peep peep={new PeepModel('grace', posted, 'The bug is always in the last place you look.', 'p1')} />);
    const peep = screen.getByRole('article', { name: 'grace' });
    expect(peep).toHaveTextContent('The bug is always in the last place you look.');
    expect(peep.querySelector('time')).toHaveAttribute('datetime', posted);
    expect(peep.querySelector('time')).toHaveTextContent('2 hours ago');
  });
});

describe('posting', () => {
  const renderPost = () =>
    render(
      <AuthContext.Provider value={{ auth: { username: 'demo' }, setAuth: () => {} }}>
        <PostPeeps />
      </AuthContext.Provider>
    );

  it('has a labelled button for a new peep', () => {
    renderPost();
    expect(screen.getByRole('button', { name: 'New peep' })).toBeInTheDocument();
  });

  it('counts the characters as you type', () => {
    renderPost();
    fireEvent.change(screen.getByPlaceholderText('But say it here...'), { target: { value: 'Hello, Y' } });
    expect(screen.getByText('8/280')).toBeInTheDocument();
  });
});
