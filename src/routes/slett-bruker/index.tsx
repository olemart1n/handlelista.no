import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";
import { deleteUser } from "~/lib/db/delete-user";
import { meothodDelete } from "~/lib";
export const useAuthDeleteUser = routeAction$(async (form, requestEv) => {
  const cookie = requestEv.cookie.get("userId");
  const userId = requestEv.cookie.get("userId")?.value;
  deleteUser(requestEv.env, Number(userId));
  meothodDelete("/v1/auth/user", cookie!, { userId: userId });
  requestEv.cookie.delete("jwt");
  requestEv.cookie.delete("userId");
  requestEv.redirect(303, "/");
});
export default component$(() => {
  const del = useAuthDeleteUser();

  return (
    <>
      <section class="flex flex-col text-center">
        <h1>Alle dine data vil bli slettet</h1>
        <ul class="mx-auto w-1/2 border-b-2 text-left">
          <li>Dine lister</li>
          <li class="deco">Din profil</li>
        </ul>
      </section>
      <div class="mx-auto mt-10 flex w-1/2 flex-col justify-between gap-5">
        <button
          onClick$={() => {
            del.submit();
          }}
          class="rounded border bg-slate-200 p-2"
        >
          Slett bruker
        </button>
      </div>
    </>
  );
});
