import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";

import { methodGet, initializeUser, type User } from "~/lib";

export const useDbGetUser = routeLoader$(async (reqEv) => {
  const cookie = reqEv.cookie.get("userId");
  const jwtCookie = reqEv.cookie.get("jwt");
  const { error, data } = await methodGet("/v1/auth/user", jwtCookie!);
  if (error) {
    return { user: null, error: "problem oppsto" };
  } else {
    try {
      initializeUser(reqEv.env, data.id as number);
    } catch (error) {
      console.log(error);
      return { user: null, error: "problem oppsto" };
    }

    return { user: data as User, error: null };
  }
});
export default component$(() => {
  const nav = useNavigate();
  const user = useDbGetUser();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (user.value.user !== null) {
      setTimeout(() => {
        nav("/bruker");
      }, 2000);
    }
  });
  return (
    <section>
      <h1 class="text-center text-lg underline">
        Hei {user.value.user ? user.value.user.name : " "}
      </h1>
      <p class="mx-auto">Du har nå opprettet en profil</p>
    </section>
  );
});
