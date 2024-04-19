import { component$, useSignal } from "@builder.io/qwik";
import type { List } from "~/lib";
import { LuLoader2 } from "@qwikest/icons/lucide";

import { Link } from "@builder.io/qwik-city";
export const LinkToList = component$<List>(({ id, title }) => {
  const isNavigating = useSignal(false);
  return (
    <div
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

      {isNavigating.value && (
        <LuLoader2 class="my-auto h-8 w-8 animate-spin text-gray-600" />
      )}
    </div>
  );
});
