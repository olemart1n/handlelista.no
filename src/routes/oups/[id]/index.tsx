import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { List } from "~/lib";

export const useTursoGetList = routeLoader$(async (reqEv) => {
  const id = reqEv.params["id"];
  const cookieList = reqEv.cookie.get("lists")?.value;

  if (cookieList) {
    const parsed = JSON.parse(cookieList);
    const cookieListAfterNotFoundInDb = parsed.filter(
      (obj: List) => obj.id !== id,
    );
    reqEv.cookie.delete("lists", { path: "/" });
    reqEv.cookie.set("lists", JSON.stringify(cookieListAfterNotFoundInDb), {
      path: "/",
      expires: new Date("9999-12-31T23:59:59"),
    });
  }
  return id;
});
export default component$(() => {
  const routeLoad = useTursoGetList();
  const nav = useNavigate();
  const time = useSignal(5);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => time.value);
    if (time.value === 0) {
      nav("/");
    }
  });
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    setInterval(() => {
      time.value -= 1;
    }, 1000);
  });
  return (
    <>
      <p class="text-center">OUPS</p>
      <p class="text-center">id: {routeLoad.value}</p>
      <h1 class="text-center">Finner ikke listen du ser etter</h1>
      <div class="my-5 text-center text-blue-600">
        Sender deg tilbake om: {time.value} sekunder
      </div>
    </>
  );
});
