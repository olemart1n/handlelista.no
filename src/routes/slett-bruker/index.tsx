import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";
import { deleteUser } from "~/lib/db/delete-user";
import { fetchMethod } from "~/lib";
export const useAuthDeleteUser = routeAction$(async (_, requestEv) => {
  const jwt = requestEv.cookie.get("jwt")?.value;
  const userId = requestEv.cookie.get("userId")?.value;
  await deleteUser(requestEv.env, Number(userId));
  await fetchMethod("DELETE", "/v1/auth/user", jwt!);

  const options = requestEv.url.origin.includes("localhost")
    ? { domain: "localhost", path: "/" }
    : { domain: ".handlelista.no", path: "/" };
  requestEv.cookie.delete("jwt", options);
  requestEv.cookie.delete("userId", options);
  throw requestEv.redirect(303, "/");
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
