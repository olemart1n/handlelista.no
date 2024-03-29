import { component$, useStore } from "@builder.io/qwik";
import { ListWithItems, ListInput } from "~/components";
import { routeAction$, routeLoader$, Link } from "@builder.io/qwik-city";
import { LuArrowLeft } from "@qwikest/icons/lucide";
import { fetchMethod } from "~/lib";
import {
  // getListMembers,
  getListItems,
  getList,
  insertItem,
  purchaseItem,
  // findUserById,
  removeItem,
} from "~/lib";
import type { ListItem, List, User } from "~/lib";
export const useTursoGetListItems = routeLoader$(async (requestEv) => {
  const pathname = requestEv.url.pathname;
  const id = pathname.match(/\/liste\/(\d+)\//);
  const res = await getListItems(requestEv.env, id![1]);
  if (res) {
    // console.log(res);
    return { data: res as ListItem[], error: null };
  } else {
    return { data: null, error: "error has occured" };
  }
});

// export const useTursoGetListMembers = routeLoader$(async (requestEv) => {
//   const pathname = requestEv.url.pathname;
//   const id = pathname.match(/\/liste\/(\d+)\//);
//   const res = await getListMembers(requestEv.env, id![1]);
//   if (res) {
//     // console.log(res);
//     return { data: res as ListMember[], error: null };
//   } else {
//     return { data: null, error: "error has occured" };
//   }
// });
export const useTursoGetList = routeLoader$(async (requestEv) => {
  const pathname = requestEv.url.pathname;
  const id = pathname.match(/\/liste\/(\d+)\//);
  const res = await getList(requestEv.env, id![1]);
  if (res) {
    // console.log(res);
    return { data: res as List, error: null };
  } else {
    return { data: null, error: "error has occured" };
  }
});
export const useHerokuGetUserById = routeAction$(async (form, requestEv) => {
  const { userId } = form;
  const cookie = requestEv.cookie.get("jwt")?.value;
  const { data, error } = await fetchMethod(
    "GET",
    "/v1/user/" + userId,
    cookie!,
  );
  if (data) return data as User;
  if (error) console.log(error);
});
export const useTursoRemoveItem = routeAction$(async (form, requestEv) => {
  const { itemId } = form;
  const res = removeItem(requestEv.env, Number(itemId));
  return res;
});

export const useTursoInsertItem = routeAction$(async (form, requestEv) => {
  const { value } = requestEv.cookie.get("userId")!;
  const { name } = form;
  const res = await insertItem(
    requestEv.env,
    name.toString(),
    Number(requestEv.params.id),
    Number(value),
  );
  return res;
});

export const useTursoPurhaseItem = routeAction$(async (form, requestEv) => {
  const { value } = requestEv.cookie.get("userId")!;
  const { itemId } = form;
  purchaseItem(requestEv.env, Number(itemId), Number(value));
});
export default component$(() => {
  const list = useTursoGetList();

  const listItems = useTursoGetListItems();
  // const listMembers = useTursoGetListMembers();
  const listStore = useStore(listItems.value);
  return (
    <>
      <div class="mx-auto my-1 flex w-11/12 justify-between">
        {" "}
        <Link
          href="/bruker"
          class="py-.5 flex rounded-sm border-2 border-gray-400 px-1 text-lg dark:border-slate-50 "
        >
          <LuArrowLeft class="my-auto text-lg" />{" "}
          <p class="dark:text-slate-50">Bruker</p>
        </Link>
        <h2 class="barlow my-auto dark:text-slate-50">
          {list.value.data?.title}
        </h2>
      </div>

      <div class="relative mx-auto h-16 w-11/12 rounded-sm border shadow-md drop-shadow-sm dark:bg-slate-200 lg:w-1/2">
        <ListInput list={listStore.data!} />
      </div>
      <div class="mx-auto mt-3 flex min-h-[400px] flex-col justify-between dark:text-slate-50 lg:w-1/2">
        <ListWithItems list={listStore.data!} />
      </div>
    </>
  );
});
