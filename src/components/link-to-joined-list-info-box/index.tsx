import { component$, type Signal, useSignal } from "@builder.io/qwik";
import { type RequestEvent, server$ } from "@builder.io/qwik-city";
import { LuArrowUpSquare, LuCheck } from "@qwikest/icons/lucide";
import { useTursoRemoveMember } from "~/routes/bruker";
import { LuCopy } from "@qwikest/icons/lucide";
import { encodeInvitationId } from "~/lib";
export interface LinkToListInfoBoxProps {
  listId: number;
  divEl: Signal<HTMLDivElement | undefined>;
}

const generateEncryptedId = server$(function (listId: number) {
  const requestEvent = this as RequestEvent;
  return encodeInvitationId(requestEvent, listId);
});

export const LinkToJoinedListInfoBox = component$<LinkToListInfoBoxProps>(
  ({ listId, divEl }) => {
    const del = useTursoRemoveMember();
    const isCopied = useSignal(false);
    // SENERE KAN MELDEMMER AV LISTEN INKLUDERES I DENNE INFO BOKSEN
    // useTask$(() => {
    // user.submit({ userId: userId });
    // });
    return (
      <div class="flex">
        <button
          class="h-full w-40 bg-yellow-100"
          onClick$={() =>
            del.submit({ listId: listId }).then(() => divEl.value!.remove())
          }
        >
          <p class="my-auto text-sm">Meld meg av</p>
        </button>
        <div>
          {isCopied.value ? (
            <div class="relative flex h-full w-20">
              <LuCopy class="m-auto h-6 w-6" />{" "}
              <LuCheck class="absolute right-2 top-2 rounded-full bg-green-200" />
            </div>
          ) : (
            <button
              class="relative flex h-full w-20 place-content-center bg-blue-100"
              onClick$={async () => {
                const key = await generateEncryptedId(listId);
                try {
                  await navigator.share({
                    title: "Handlelista.no",
                    text: "Bli med på handlelista",
                    url: "https://handlelista.no/invitasjon?id=" + key,
                  });
                } catch (err) {
                  isCopied.value = true;
                  navigator.clipboard.writeText(
                    "https://handlelista.no/invitasjon?id=" + key,
                  );
                }
              }}
            >
              <LuArrowUpSquare class="my-auto text-lg" />

              <span class="my-auto text-sm">Inviter</span>
            </button>
          )}
        </div>
      </div>
    );
  },
);
