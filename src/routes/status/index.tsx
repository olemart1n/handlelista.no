import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";

import { initializeUser } from "~/lib";

export const useTursoInitializeUser = routeLoader$(async (reqEv) => {
  const userId = reqEv.cookie.get("userId")?.value;
  try {
    initializeUser(reqEv.env, Number(userId!));
  } catch (error) {
    return { user: null, error: "problem oppsto" };
  }
});
export const useDeliverJwt = routeLoader$((requestEv) => {
  const jwt = requestEv.cookie.get("jwt");
  if (jwt && jwt.value) {
    return { token: jwt.value as string };
  } else {
    return { token: "no token was found" };
  }
});
export default component$(() => {
  const nav = useNavigate();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    setTimeout(() => {
      nav("/bruker");
    }, 2000);
  });
  return (
    <section>
      <h1 class="text-center text-lg underline">
        Du har nå opprettet en profil
      </h1>
    </section>
  );
});
