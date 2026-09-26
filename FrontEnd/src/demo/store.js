// Seeded data for the in-browser demo (VITE_DEMO builds only). Kept in
// sessionStorage, so a visitor's peeps and sign-ups last for their visit.

const KEY = 'y-demo';

/** Shown on the login page in demo builds. */
export const DEMO_ACCOUNT = { email: 'demo@y.test', password: 'Demo123!' };

const HOUR = 60 * 60 * 1000;

const SEED_PEEPS = [
  ['ada', 'Shipped a tiny feature today and nothing broke. Suspicious.', 2],
  ['grace', 'Reminder: the bug is always in the last place you look, because then you stop looking.', 5],
  ['linus', 'Hot take: tabs vs spaces is a formatting problem, not a personality.', 9],
  ['margaret', 'Wrote the test first. It failed. Then it passed. Then I had a biscuit.', 20],
  ['alan', 'Is this machine thinking, or is it just very good at autocomplete?', 30],
  ['demo', 'Welcome to Y. Log in with the demo account and post a peep of your own.', 48],
];

export async function hashPassword(password) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function seed() {
  const now = Date.now();
  return {
    users: [
      {
        name: 'Demo Visitor',
        username: 'demo',
        email: DEMO_ACCOUNT.email,
        passwordHash: await hashPassword(DEMO_ACCOUNT.password),
      },
    ],
    peeps: SEED_PEEPS.map(([username, message, hoursAgo], i) => ({
      _id: `seed-${i}`,
      username,
      message,
      $date: new Date(now - hoursAgo * HOUR).toISOString(),
    })),
  };
}

export function createStore(storage = sessionStorage) {
  const load = async () => {
    const saved = storage.getItem(KEY);
    if (saved) return JSON.parse(saved);
    const fresh = await seed();
    storage.setItem(KEY, JSON.stringify(fresh));
    return fresh;
  };
  const save = (state) => storage.setItem(KEY, JSON.stringify(state));

  return {
    async peeps() {
      return (await load()).peeps;
    },
    async addPeep({ username, message, $date }) {
      const state = await load();
      state.peeps.push({ _id: `peep-${state.peeps.length}-${Date.now()}`, username, message, $date });
      save(state);
    },
    async findUser(email, password) {
      const state = await load();
      const hash = await hashPassword(password);
      return state.users.find((u) => u.email === email && u.passwordHash === hash) ?? null;
    },
    async hasUser(email, username) {
      const state = await load();
      return state.users.some((u) => u.email === email || u.username === username);
    },
    async addUser({ name, username, email, password }) {
      const state = await load();
      state.users.push({ name, username, email, passwordHash: await hashPassword(password) });
      save(state);
    },
  };
}
