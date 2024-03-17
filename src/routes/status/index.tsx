import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type RequestEvent, useNavigate, server$ } from "@builder.io/qwik-city";
import { initializeUser, addMemberToList, decodeInvitationId } from "~/lib";

const initializeUserServer = server$(async function () {
  const requestEvent = this as RequestEvent;
  const userId = requestEvent.cookie.get("userId")?.value;
  await initializeUser(requestEvent.env, Number(userId));
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
export default component$(() => {
  // useTursoInitializeUser();
  const nav = useNavigate();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const invitation = sessionStorage.getItem("invitation");
    if (invitation) {
      await addMemberToListServer(invitation);
      sessionStorage.removeItem("invitation");
      setTimeout(() => {
        nav("/bruker");
      }, 1000);
    } else {
      await initializeUserServer();
      setTimeout(() => {
        nav("/bruker");
      }, 1000);
    }
  });
  return (
    <section>
      <h1 class="my-10 text-center text-lg underline">
        Du har nå opprettet en profil
      </h1>
      <p class="text-center">Vent litt</p>
    </section>
  );
});
