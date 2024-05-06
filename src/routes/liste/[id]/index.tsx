import { component$, useStore } from "@builder.io/qwik";
import { ListWithItems, AddItemForm } from "~/components";
import { routeLoader$ } from "@builder.io/qwik-city";
import { selectListItems, selectList } from "~/lib/turso/select";
import type { ListItem, List } from "~/lib";

export const useTursoGetList = routeLoader$(
  async ({ params, redirect, env, cookie }) => {
    const res = await selectList(env, params.id);
    const id = params["id"];
    const cookieList = cookie.get("lists")?.value;

    if (!res?.title) {
      throw redirect(307, "/oups/" + id);
    }

    if (!cookie.get("lists")) {
      cookie.set("lists", JSON.stringify([{ id, title: res.title }]), {
        path: "/",
        expires: new Date("9999-12-31T23:59:59"),
      });
      return res as List | null;
    }

    const parsed = JSON.parse(cookieList!);
    const exists = parsed.find((obj: List) => obj.id === id);

    if (!exists) {
      parsed.push({ id, title: res.title });
      cookie.delete("lists", { path: "/" });
      cookie.set("lists", JSON.stringify(parsed), {
        path: "/",
        expires: new Date("9999-12-31T23:59:59"),
      });
    }
    return res as List | null;
  },
);

export const useTursoGetListItems = routeLoader$(async ({ params, env }) => {
  const res = await selectListItems(env, params.id);
  return res as ListItem[];
});

export default component$(() => {
  const list = useTursoGetList();
  const listItems = useTursoGetListItems();
  const listStore = useStore(listItems.value);
  return (
    <>
      <div class="mx-auto my-1 flex w-11/12 justify-between">
        <h2 class="barlow m-auto dark:text-slate-50">{list.value?.title}</h2>
      </div>

      <div class="relative mx-auto h-16 w-11/12 rounded-sm border shadow-md drop-shadow-sm dark:bg-slate-200 lg:w-1/2">
        <AddItemForm list={listStore} />
      </div>
      <div class="mx-auto mt-3 flex min-h-[400px] flex-col justify-between dark:text-slate-50 lg:w-1/2">
        <ListWithItems list={listStore} />
      </div>
    </>
  );
});
