import { component$, useStore } from "@builder.io/qwik";
import { ListWithItems, ListInput } from "~/components";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { methodGet } from "~/lib";
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
  const cookie = requestEv.cookie.get("jwt");
  const { data, error } = await methodGet("/v1/user/" + userId, cookie!);
  if (data) return data as User;
  if (error) console.log(error);
});
export const useTursoRemoveItem = routeAction$(async (form, requestEv) => {
  const { itemId } = form;
  const res = removeItem(requestEv.env, Number(itemId));
  return res;
});

export const useTursoInsertItem = routeAction$(async (form, requestEv) => {
  const pathname = requestEv.url.pathname;
  const id = pathname.match(/\/liste\/(\d+)\//);
  const userId = requestEv.cookie.get("userId")?.value;
  const { name } = form;
  const res = await insertItem(
    requestEv.env,
    name.toString(),
    id![1],
    JSON.stringify(userId),
  );
  return res;
});

export const useTursoPurhaseItem = routeAction$(async (form, requestEv) => {
  const { itemId } = form;
  purchaseItem(requestEv.env, Number(itemId));
});
export default component$(() => {
  const list = useTursoGetList();

  const listItems = useTursoGetListItems();
  // const listMembers = useTursoGetListMembers();
  const listStore = useStore(listItems.value);
  return (
    <>
      <h2 class="barlow absolute right-2 top-2">{list.value.data?.title}</h2>
      <div class="relative mx-auto flex h-16 w-11/12 justify-between rounded-sm border shadow-md drop-shadow-sm">
        <ListInput list={listStore.data!} />
      </div>
      <div class="flex min-h-[400px] flex-col justify-between">
        <ListWithItems list={listStore.data!} />
      </div>
    </>
  );
});
