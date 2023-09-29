import { onDestroy } from 'svelte';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

import { user } from '../stores';

const LOGIN_PATH = '/login';
const HOME_PATH = '/';

function makeResolveWaitOnce(resolver) {
  let isCalled = false;
  return (data, duration) => {
    if (isCalled) {
      return;
    }

    isCalled = true;

    setTimeout(() => {
      resolver(data);
    }, duration);
  };
}

export function login(email, password) {
  if (email === 'a@gmail.com' && password === '123') {
    user.set(email);
  }
}

export function guard() {
  return new Promise((resolve) => {
    const resolveWaitOnce = makeResolveWaitOnce(resolve);

    if (!browser) {
      resolveWaitOnce(true, 0);
      return;
    }

    /** @type {import('svelte/store').Unsubscriber} */
    const subs = user.subscribe((value) => {
      if (!value) {
        goto(LOGIN_PATH);
        resolveWaitOnce(true, 100);
      } else {
        resolveWaitOnce(true, 0);
      }
    });

    onDestroy(() => {
      subs();
    });
  });
}

export function guest() {
  return new Promise((resolve) => {
    const resolveWaitOnce = makeResolveWaitOnce(resolve);

    if (!browser) {
      resolveWaitOnce(true, 0);
      return;
    }

    /** @type {import('svelte/store').Unsubscriber} */
    const subs = user.subscribe((value) => {
      if (value) {
        goto(HOME_PATH);
        resolveWaitOnce(true, 100);
      } else {
        resolveWaitOnce(true, 0);
      }
    });

    onDestroy(() => {
      subs();
    });
  });
}
