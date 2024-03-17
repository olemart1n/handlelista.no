import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  type RequestEvent,
  routeLoader$,
  server$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { jwtDecode } from "jwt-decode";
import { getList, addMemberToList, decodeInvitationId } from "~/lib";
import { LuLoader2 } from "@qwikest/icons/lucide";

export const useJwtCheck = routeLoader$(async (reqEv) => {
  const jwtCookie = reqEv.cookie.get("jwt");
  if (!jwtCookie) {
    return { auth: false };
  }
  const decodedToken = jwtDecode(jwtCookie.value);
  if (Date.now() >= decodedToken.exp! * 1000) {
    reqEv.cookie.delete("jwt");
    return { auth: false };
  }
  return { auth: true };
});

export const useInvitationParamsReturnList = routeLoader$(async (requestEv) => {
  const id = requestEv.url.searchParams.get("id");
  if (!id) return;
  const listId = decodeInvitationId(requestEv, id);
  const list = await getList(requestEv.env, listId);
  return list;
});

export const addUserToList = server$(async function (encryptedId: string) {
  const reqEv = this as RequestEvent;
  const userId = reqEv.cookie.get("userId")?.value;
  if (!userId) return false;
  const listId = decodeInvitationId(reqEv, encryptedId);
  try {
    await addMemberToList(this.env, Number(userId), Number(listId));
    return true;
  } catch (error) {
    console.log("logged from routeAction: " + error);
    return null;
  }
});

export default component$(() => {
  const nav = useNavigate();
  const auth = useJwtCheck();
  const loc = useLocation();
  const list = useInvitationParamsReturnList();
  const isLoading = useSignal(false);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    sessionStorage.setItem("invitation", loc.url.searchParams.get("id")!);
  });
  return (
    <div class="flex h-full flex-col">
      <h1 class="my-10 text-center text-lg dark:text-slate-50">
        Du er invitert til å bli med på liste:{" "}
        <span class="underline">{list.value?.title}</span>
      </h1>

      <button
        onClick$={async () => {
          if (auth.value.auth === true) {
            isLoading.value = true;
            await addUserToList(loc.url.searchParams.get("id")!).then(
              (data) => {
                if (data) {
                  sessionStorage.removeItem("invitation");
                  nav("/liste/" + list.value?.id);
                }
              },
            );
          } else {
            nav("/autentisering");
          }
        }}
        class="mx-auto my-20 block h-12 w-28 rounded bg-green-200 text-lg font-bold text-gray-800"
      >
        Bli med
      </button>
      {isLoading.value && (
        <div class="mx-auto rounded p-1 px-5 shadow-sm outline">
          <p>Vent litt</p> <LuLoader2 class="mx-auto animate-spin" />
        </div>
      )}
    </div>
  );
});
