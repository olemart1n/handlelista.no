import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";

import { methodGet, initializeUser, type User } from "~/lib";

export const useDbGetUser = routeLoader$(async (reqEv) => {
  interface Obj {
    data: User | null;
    error: null | string;
  }
  let returnObj: Obj;
  const cookie = reqEv.cookie.get("jwt");
  if (!cookie) {
    returnObj = { data: null, error: "not authenticated" };
    return returnObj;
  }
  const { error, data } = await methodGet("/v1/auth/user", cookie);
  if (error) {
    returnObj = { data: null, error: error };
    return returnObj;
  } else {
    try {
      initializeUser(reqEv.env, data.id as number);
    } catch (error) {
      console.log(error);
      return;
    }
    returnObj = { data: data, error: null };
    return returnObj;
  }
});
export default component$(() => {
  const nav = useNavigate();
  const user = useDbGetUser();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (user.value?.data) {
      setTimeout(() => {
        nav("/bruker");
      }, 1000);
    }
  });
  return (
    <section>
      <h1>Setter opp din profil</h1>
    </section>
  );
});
