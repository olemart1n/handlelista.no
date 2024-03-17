import {
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  server$,
  type RequestEvent,
} from "@builder.io/qwik-city";
import {
  getUserLists,
  deleteList,
  createList,
  addMemberToList,
  removeListMember,
} from "~/lib/db";
import { decodeInvitationId } from "~/lib";
import { fetchMethod } from "~/lib";
import type { List, User } from "~/lib";
import {
  LinkToList,
  CreateList,
  UserInfoSection,
  LinkToJoinedList,
} from "~/components";
import { LuPlus } from "@qwikest/icons/lucide";
export const useTursoGetLists = routeLoader$(async (requestEv) => {
  const userId = requestEv.cookie.get("userId")?.value;
  const res = await getUserLists(requestEv.env, userId!);
  const owner = res?.filter((list: List) => list.role === "owner");
  const member = res?.filter((list: List) => list.role === "member");
  return { owner, member };
});

export const addMemberToListServer = server$(async function (
  encryptedId: string,
) {
  const requestEvent = this as RequestEvent;
  const userId = requestEvent.cookie.get("userId")?.value;
  const listId = decodeInvitationId(requestEvent, encryptedId);
  const res = await addMemberToList(
    requestEvent.env,
    Number(userId),
    Number(listId),
  );
  return res;
});

export const useTursoDeleteList = routeAction$(async (form, requestEv) => {
  const { listId } = form;
  await deleteList(requestEv.env, Number(listId));
});
export const useTursoRemoveMember = routeAction$(async (form, requestEv) => {
  const userId = requestEv.cookie.get("userId")?.value;
  const { listId } = form;
  await removeListMember(requestEv.env, Number(userId), Number(listId));
});
export const useSignout = routeAction$(async (_, requestEv) => {
  const options = requestEv.url.origin.includes("localhost")
    ? { domain: "localhost", path: "/" }
    : { domain: ".handlelista.no", path: "/" };
  requestEv.cookie.delete("jwt", options);
  requestEv.cookie.delete("userId", options);
  throw requestEv.redirect(303, "/");
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

export const useDeliverJwt = routeLoader$((requestEv) => {
  const jwt = requestEv.cookie.get("jwt");
  if (jwt && jwt.value) {
    return { token: jwt.value as string };
  } else {
    return { token: "no token was found" };
  }
});

export default component$(() => {
  // const user = useHerokuGetUser();
  const jwt = useDeliverJwt();
  interface HandleUserData {
    data: User | null;
  }
  const user = useStore<HandleUserData>({ data: null });
  const routeData = useTursoGetLists();
  const listStore = useStore(routeData.value);
  const isAddingList = useSignal(false);
  const signOut = useSignout();
  const inputToFocusOn = useSignal<HTMLInputElement | undefined>();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const { data } = await fetchMethod("GET", "/v1/auth/user", jwt.value.token);
    if (data) user.data = data as User;
    const invitation = sessionStorage.getItem("invitation");
    if (invitation) {
      const res = await addMemberToListServer(invitation);
      sessionStorage.removeItem("invitation");
      listStore.member?.push(res!);
    }
  });

  return (
    <>
      {user.data && <UserInfoSection props={user.data} />}

      <div class="mx-auto my-3 w-11/12 lg:w-2/3">
        <div class="flex ">
          <h2 class="my-auto text-center text-2xl dark:text-slate-50">
            Dine handlelister
          </h2>
          <button
            onClick$={() => {
              isAddingList.value = !isAddingList.value;
              inputToFocusOn.value && inputToFocusOn.value.focus();
            }}
            class="my-3 ms-auto flex rounded-sm bg-green-400 p-1 text-center shadow-lg  outline outline-1"
          >
            <LuPlus class={"h-8 w-8  " + (isAddingList.value && "rotate-45")} />
          </button>
        </div>
        <CreateList
          isVisible={isAddingList}
          list={listStore.owner!}
          inputRef={inputToFocusOn}
        />
        {listStore.owner?.map((list: List) => (
          <LinkToList
            key={list.id}
            id={list.id}
            title={list.title}
            created_at={list.role}
            role={list.role}
          />
        ))}
        <div class="mt-10">
          {listStore.member!.length > 0 && (
            <h2 class="my-auto text-center text-xl dark:text-slate-50">
              Lister du er med på
            </h2>
          )}
          {listStore.member?.map((list: List) => (
            <LinkToJoinedList
              key={list.id}
              id={list.id}
              title={list.title}
              created_at={list.role}
              role={list.role}
            />
          ))}
        </div>
      </div>

      <div class="ms-10 mt-10 flex w-28 flex-col justify-between gap-5 lg:mx-auto">
        <button
          onClick$={() => {
            signOut.submit();
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
