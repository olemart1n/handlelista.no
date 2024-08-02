import { component$, useSignal } from "@builder.io/qwik";
import type { List } from "~/lib";
import {
  LuLoader2,
  LuTrash2,
  LuCopy,
  LuCheck,
  LuShare,
} from "@qwikest/icons/lucide";
import { Link, server$ } from "@builder.io/qwik-city";

const removeLink = server$(function (id: string) {
  const lists = this.cookie.get("lists") ? this.cookie.get("lists") : undefined;
  if (!lists) return;
  this.cookie.delete("lists");
  const parsed: List[] = JSON.parse(lists.value);
  const indexToRemove = parsed.findIndex((obj) => obj.id === id);
  if (indexToRemove !== -1) {
    parsed.splice(indexToRemove, 1);
  }
  this.cookie.set("lists", JSON.stringify(parsed), {
    path: "/",
    expires: new Date("9999-12-31T23:59:59"),
  });
  return { ok: true };
});
export const LinkToList = component$<List>(({ id, title }) => {
  const isNavigating = useSignal(false);
  const divEl = useSignal<HTMLDivElement>();
  const isCopied = useSignal(false);
  return (
    <div
      ref={divEl}
      key={id}
      class="border-1 min-h-12 mx-auto my-2 flex w-full justify-between rounded-sm bg-sky-100  align-middle shadow-md"
    >
      <button
        class="mx-2 flex text-gray-700"
        onClick$={() =>
          removeLink(id).then((ok) => ok && divEl.value?.remove())
        }
      >
        <LuTrash2 class="m-auto " />
      </button>

      <div class="mx-2">
        {isCopied.value ? (
          <div class="relative flex h-full">
            <LuCopy class="m-auto text-lg" />{" "}
            <LuCheck class="absolute right-2 top-2 rounded-full bg-green-200 opacity-90" />
          </div>
        ) : (
          <button
            class="relative flex h-full place-content-center text-gray-700"
            onClick$={async () => {
              try {
                await navigator.share({
                  title: "Handlelista.no",
                  text: "Bli med på handlelista",
                  url: "https://handlelista.no/liste/" + id,
                });
              } catch (err) {
                isCopied.value = true;
                navigator.clipboard.writeText(
                  "https://handlelista.no/liste/" + id,
                );
              }
            }}
          >
            <LuShare class="my-auto text-lg" />
          </button>
        )}
      </div>

      <Link
        onClick$={() => (isNavigating.value = !isNavigating.value)}
        class="my-auto w-full p-2 text-lg"
        href={`/liste/${id}`}
      >
        {title}
      </Link>

      <LuLoader2
        class={
          "my-auto h-8 w-8 animate-spin text-gray-600 " +
          (isNavigating.value ? "visible" : "invisible")
        }
      />
    </div>
  );
});
