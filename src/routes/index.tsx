import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { jwtDecode } from "jwt-decode";
import { LuLoader2 } from "@qwikest/icons/lucide";
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
  const loc = useLocation();
  return (
    <>
      {loc.isNavigating ? (
        <LuLoader2 class="mx-auto my-auto mt-10 h-8 w-8 animate-spin text-white" />
      ) : (
        <Link
          class="relative mx-auto mt-10 flex h-16 w-11/12 place-items-center justify-around rounded-sm border bg-green-100 text-center text-4xl shadow-md drop-shadow-sm"
          href="/bruker"
        >
          Din bruker
        </Link>
      )}
    </>
  );
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
