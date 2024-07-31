import { component$, useStore } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { CreateListForm, LinkToList, AiChat } from "~/components";
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
      <div class=" min-h-32 border-2  shadow-md">
        <AiChat />
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
        "Bruk handlelista.no for å ha oversikt over det du handler. Legg til varer og merk av varer som er handlet for å ha oversikt.",
    },
    {
      name: "title",
      content: "handlelista",
    },
    {
      name: "keywords",
      content:
        "handleliste, liste, handle, oversikt, handleliste app, handle app, handle norge, norsk",
    },
    {
      name: "author",
      content: "Ole Martin Snoen",
    },
    {
      name: "robots",
      content: "index",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
};
