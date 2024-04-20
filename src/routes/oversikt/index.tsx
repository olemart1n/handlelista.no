import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { selectAllLists } from "~/lib/turso/select";

export const useTursoGetLists = routeLoader$(async (reqEv) => {
  const res = await selectAllLists(reqEv.env);

  return { count: res?.length, lists: res };
});

export default component$(() => {
  const lists = useTursoGetLists();

  return (
    <>
      <h1>Antall lister: {lists.value.count} </h1>
      <div class="flex flex-col gap-1">
        {lists.value.lists?.map((list) => (
          <Link
            key={list.id}
            href={"/liste/" + list.id}
            class=" w-full rounded bg-yellow-200 p-1"
          >
            {list.title}
          </Link>
        ))}
      </div>
    </>
  );
});
