import { component$, useSignal } from "@builder.io/qwik";

import type { List } from "~/lib";
import { LuLoader2, LuMoreVertical } from "@qwikest/icons/lucide";
import { LinkToListInfoBox } from "../link-to-list-info-box";
import { useLocation } from "@builder.io/qwik-city";
export const LinkToList = component$<List>(({ id, title }) => {
  const loc = useLocation();
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
        <a class="my-auto w-full p-2 text-lg" href={`/liste/${id}`}>
          {title}
        </a>
      )}

      {loc.isNavigating ? (
        <LuLoader2 class="my-auto h-8 w-8 animate-spin text-gray-600" />
      ) : (
        <button onClick$={() => (isInfoClicked.value = !isInfoClicked.value)}>
          <LuMoreVertical class="h-6 w-6" />
        </button>
      )}
    </div>
  );
});
