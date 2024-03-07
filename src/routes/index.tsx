import { component$ } from "@builder.io/qwik";
import { Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { jwtDecode } from "jwt-decode";
export const useDbCheckJwtExpired = routeLoader$(async (reqEv) => {
  // THIS ROUTELOADER RUNS ONLY WHEN VISITING "/"
  const jwtCookie = reqEv.cookie.get("jwt");
  if (!jwtCookie) {
    throw reqEv.redirect(303, "/autentisering");
  }
  const decodedToken = jwtDecode(jwtCookie.value);
  //decodedToken.exp converted to milliseconds
  if (Date.now() >= decodedToken.exp! * 1000) {
    // Check if the current time is after the expiration time
    // Token has expired
    reqEv.cookie.delete("jwt");
    throw reqEv.redirect(303, "/autentisering");
  }
});

export default component$(() => {
  return (
    <>
      <Link
        class="relative mx-auto flex h-16 w-11/12 place-items-center justify-around rounded-sm border bg-green-100 text-center text-4xl shadow-md drop-shadow-sm"
        href="/bruker"
      >
        Din bruker
      </Link>
    </>
  );
});

export const useAuthSignout = routeAction$((_, requestEv) => {
  requestEv.cookie.delete("jwt");
  requestEv.cookie.delete("userId");
  throw requestEv.redirect(303, "/autentisering");
});

export const head: DocumentHead = {
  title: "Handlelista",
  meta: [
    {
      name: "description",
      content:
        "handlelista.no er ett nettsted der man kan lage sette opp handlelister",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
};
