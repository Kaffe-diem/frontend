import { writable } from "svelte/store";
import PocketBase from "pocketbase";
import { PUBLIC_PB_HOST } from "$env/static/public";

const pb = new PocketBase(PUBLIC_PB_HOST);

export const auth = writable({
  isAuthenticated: pb.authStore.isValid,
  user: pb.authStore.model
});

pb.authStore.onChange(() => {
  auth.set({
    isAuthenticated: pb.authStore.isValid,
    user: pb.authStore.model
  });
});

if (typeof document !== "undefined") {
  pb.authStore.loadFromCookie(document.cookie);
}

export { pb };