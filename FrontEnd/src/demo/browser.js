import { setupWorker } from 'msw/browser';
import { createHandlers } from './handlers.js';
import { createStore } from './store.js';

/** Starts the in-browser API for demo builds, scoped to this app's base path. */
export async function startDemo() {
  const base = import.meta.env.BASE_URL;
  const worker = setupWorker(...createHandlers(import.meta.env.VITE_PEEPSURL, createStore()));
  await worker.start({
    serviceWorker: { url: `${base}mockServiceWorker.js`, options: { scope: base } },
    onUnhandledRequest: 'bypass',
    quiet: true,
  });
}
