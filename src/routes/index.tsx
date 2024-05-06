import { component$, useStore } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { CreateListForm, LinkToList } from "~/components";
import type { List } from "~/lib";

export const useStoredLists = routeLoader$((reqEv) => {
  const lists = reqEv.cookie.get("lists")
    ? reqEv.cookie.get("lists")
    : undefined;
  if (!lists) {
    return [] as List[];
  }
  return JSON.parse(lists.value) as List[];
});

export default component$(() => {
  const routeData = useStoredLists();
  const lists = useStore(routeData.value);
  return (
    <>
      <div class="mx-auto w-10/12  lg:w-1/3">
        <CreateListForm list={lists} />
      </div>
      <div class="mx-auto my-3 w-11/12 lg:w-2/3">
        {lists.map((list: List) => (
          <LinkToList key={list.id} id={list.id} title={list.title} />
        ))}
      </div>
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
