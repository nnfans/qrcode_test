import cookies from '$lib/utils/cookies';
import { writable } from 'svelte/store';

export const user = writable(cookies.get('user') || null);

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOUR = 60 * MINUTES;
const DAY = 24 * HOUR;

const EXPIRED = 5 * MINUTES;

user.subscribe((newUser) => {
  // Return as cookies already set
  if (cookies.get('user')) {
    return;
  }

  if (newUser) {
    cookies.set('user', newUser, { expires: new Date(Date.now() + EXPIRED) });

    setTimeout(() => {
      user.set(null);
    }, EXPIRED);
  }
});
