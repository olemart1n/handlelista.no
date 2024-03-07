import { component$, useSignal, useStore } from "@builder.io/qwik";
import { routeLoader$, routeAction$ } from "@builder.io/qwik-city";
import { getUserLists, deleteList, createList } from "~/lib/db";
import { useAuthSignout } from "..";
import { methodGet } from "~/lib";
import type { List, User } from "~/lib";
import { LinkToList, CreateList, UserInfoSection } from "~/components";
import { LuPlus } from "@qwikest/icons/lucide";

export const useTursoGetLists = routeLoader$(async (requestEv) => {
  const userId = requestEv.cookie.get("userId")?.value;
  const res = await getUserLists(requestEv.env, userId!);
  return { list: res };
});

export const useTursoDeleteList = routeAction$(async (form, requestEv) => {
  const { listId } = form;
  await deleteList(requestEv.env, Number(listId));
});

export const useTursoCreateList = routeAction$(async (form, requestEv) => {
  const userId = requestEv.cookie.get("userId")?.value;
  const { title } = form;
  const res = await createList(
    requestEv.env,
    title.toString(),
    Number(userId!),
  );
  return res as unknown as List;
});

export const useHerokuGetUser = routeLoader$(async (reqEv) => {
  const cookie = reqEv.cookie.get("jwt");
  const { error, data } = await methodGet("/v1/auth/user", cookie!);
  if (error) {
    return error as User;
  } else return data as User;
});

export default component$(() => {
  const user = useHerokuGetUser();
  const routeData = useTursoGetLists();
  const listStore = useStore(routeData.value);
  const isAddingList = useSignal(false);
  const signOut = useAuthSignout();
  return (
    <>
      <UserInfoSection props={user.value} />

      <div class="mx-auto my-3 w-11/12">
        <div class="flex">
          <h2 class="my-auto text-center text-2xl">Dine handlelister</h2>
          <button
            onClick$={() => (isAddingList.value = !isAddingList.value)}
            class="my-3 ms-auto flex rounded border border-slate-300 bg-green-300 p-2.5 text-center shadow-lg"
          >
            <LuPlus />
          </button>
        </div>
        {listStore.list?.map((list: List) => (
          <LinkToList
            key={list.id}
            id={list.id}
            title={list.title}
            created_at={list.role}
            role={list.role}
          />
        ))}
        {isAddingList.value && (
          <CreateList isVisible={isAddingList} list={listStore.list!} />
        )}
      </div>
      <div class="ms-10 mt-10 flex w-1/3 flex-col justify-between gap-5">
        <button
          onClick$={() => {
            signOut.submit().then(() => console.log("hello"));
          }}
          class="rounded border bg-slate-200 p-1.5 shadow-sm"
        >
          Logg ut
        </button>
        <a
          href="/slett-bruker"
          class="rounded border bg-slate-200 p-1.5 text-center shadow-sm"
        >
          Slett bruker
        </a>
      </div>
    </>
  );
});
