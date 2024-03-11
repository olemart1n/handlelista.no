import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";

import { initializeUser } from "~/lib";

export const useTursoInitializeUser = routeLoader$(async (reqEv) => {
  const userId = reqEv.cookie.get("userId")?.value;
  try {
    initializeUser(reqEv.env, Number(userId!));
    console.log("logged from 'useTursoInitializeUse'");
  } catch (error) {
    return { user: null, error: "problem oppsto" };
  }
});
export default component$(() => {
  useTursoInitializeUser();
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
