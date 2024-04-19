import { component$, useStore } from "@builder.io/qwik";
import { ListWithItems, AddItemForm } from "~/components";
import { routeLoader$ } from "@builder.io/qwik-city";
import { selectListItems, selectList } from "~/lib/turso/select";
import type { ListItem, List } from "~/lib";

export const useTursoGetListItems = routeLoader$(async (reqEv) => {
  const res = await selectListItems(reqEv.env, reqEv.params.id);
  return res as ListItem[];
});

export const useTursoGetList = routeLoader$(async (reqEv) => {
  const res = await selectList(reqEv.env, reqEv.params.id);

  const id = reqEv.params["id"];
  const alreadyStored = reqEv.cookie.get("lists")?.value;
  if (alreadyStored) {
    const parsed = JSON.parse(alreadyStored);
    const exists = parsed.find((obj: List) => obj.id === id);
    if (exists) {
      parsed.push({ id, title: exists.title });
      reqEv.cookie.delete("lists", { path: "/" });
      reqEv.cookie.set("lists", JSON.stringify(parsed), {
        path: "/",
        expires: new Date("9999-12-31T23:59:59"),
      });
    }
  } else {
    reqEv.cookie.set("lists", JSON.stringify([{ id, title: res?.title }]), {
      path: "/",
      expires: new Date("9999-12-31T23:59:59"),
    });
  }

  if (res) {
    res as List;
  } else return null;
});

export default component$(() => {
  const list = useTursoGetList();
  const listItems = useTursoGetListItems();
  const listStore = useStore(listItems.value);
  return (
    <>
      <div class="mx-auto my-1 flex w-11/12 justify-between">
        <h2 class="barlow my-auto dark:text-slate-50">{list.value}</h2>
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
