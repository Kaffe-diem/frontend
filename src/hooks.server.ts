import { restrictedRoutes } from "$lib/constants";
import { pb } from "$lib/stores/authStore";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const cookie = event.request.headers.get("cookie") || "";
  pb.authStore.loadFromCookie(cookie);

  const isAuthenticated = pb.authStore.isValid;
  const isRestricted = restrictedRoutes.includes(event.url.pathname);
  if (isRestricted && !isAuthenticated) {
    throw redirect(303, "/");
  }

  event.locals.pb = pb;

  const response = await resolve(event);

  response.headers.set(
    "set-cookie",
    pb.authStore.exportToCookie({ secure: true, httpOnly: false })
  );

  return response;
};