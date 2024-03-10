import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { List } from "~/lib";
import { LuMoreVertical } from "@qwikest/icons/lucide";
import { LinkToListInfoBox } from "../link-to-list-info-box";
export const LinkToList = component$<List>(({ id, title }) => {
  const isInfoClicked = useSignal(false);
  const divEl = useSignal<HTMLDivElement>();
  return (
    <div
      ref={divEl}
      key={id}
      class="border-1 mx-auto my-2 flex h-12 w-full justify-between bg-slate-100  align-middle shadow-md"
    >
      {isInfoClicked.value ? (
        <LinkToListInfoBox listId={id} divEl={divEl} />
      ) : (
        <Link class="my-auto w-full p-2 text-lg" href={`/liste/${id}`}>
          {title}
        </Link>
      )}

      <button onClick$={() => (isInfoClicked.value = !isInfoClicked.value)}>
        <LuMoreVertical class="h-6 w-6" />
      </button>
    </div>
  );
});
