import { component$, useSignal } from "@builder.io/qwik";
import type { List } from "~/lib";
import { LuLoader2, LuTrash2 } from "@qwikest/icons/lucide";
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
  return (
    <div
      ref={divEl}
      key={id}
      class="border-1 mx-auto my-2 flex h-12 w-full justify-between rounded-lg bg-slate-100  align-middle shadow-md"
    >
      <Link
        onClick$={() => (isNavigating.value = !isNavigating.value)}
        class="my-auto w-full p-2 text-lg"
        href={`/liste/${id}`}
      >
        {title}
      </Link>
      <button
        class="flex"
        onClick$={() =>
          removeLink(id).then((ok) => ok && divEl.value?.remove())
        }
      >
        <LuTrash2 class="m-auto " />
      </button>
      <LuLoader2
        class={
          "my-auto h-8 w-8 animate-spin text-gray-600 " +
          (isNavigating.value ? "visible" : "invisible")
        }
      />
    </div>
  );
});
