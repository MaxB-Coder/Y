// Mock Service Worker handlers that stand in for Y's Express API in demo
// builds. Responses mirror the real API's shapes and status codes.
import { http, HttpResponse } from 'msw';

const isText = (value) => typeof value === 'string' && value.trim().length > 0;
const publicUser = ({ name, username, email }) => ({ name, username, email });

export function createHandlers(base, store) {
  return [
    http.get(base, async () => HttpResponse.json(await store.peeps())),

    http.post(base, async ({ request }) => {
      const { username, message, $date } = await request.json();
      if (!isText(username) || !isText(message)) return HttpResponse.json({ error: 'Invalid peep' }, { status: 422 });
      await store.addPeep({ username, message, $date: $date ?? new Date().toISOString() });
      return HttpResponse.json({}, { status: 201 });
    }),

    http.post(`${base}/login`, async ({ request }) => {
      const { email, password } = await request.json();
      if (!isText(email) || !isText(password)) return new HttpResponse('login failed', { status: 422 });
      const user = await store.findUser(email, password);
      return HttpResponse.json({ user: user ? [publicUser(user)] : [] });
    }),

    http.post(`${base}/sign-up`, async ({ request }) => {
      const { name, username, email, password } = await request.json();
      if (![name, username, email, password].every(isText)) {
        return HttpResponse.json({ error: 'Invalid sign-up details' }, { status: 422 });
      }
      if (await store.hasUser(email, username)) {
        return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
      await store.addUser({ name, username, email, password });
      return HttpResponse.json(publicUser({ name, username, email }), { status: 201 });
    }),
  ];
}
