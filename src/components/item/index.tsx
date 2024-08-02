import { component$, $, useSignal } from "@builder.io/qwik";
import { type ListItem } from "~/lib";
import { LuCheck, LuCheckCheck, LuTrash2 } from "@qwikest/icons/lucide";
import { deleteItem, updateItemIsPurchased } from "~/lib/turso";
import { server$ } from "@builder.io/qwik-city";

export interface ItemProps {
  props: ListItem;
}

const tursoTogglePurchased = server$(async function (itemId) {
  const res = await updateItemIsPurchased(this.env, itemId);
  return res;
});

const tursoDeleteItem = server$(async function (itemId) {
  const res = await deleteItem(this.env, itemId);

  return res;
});

export const Item = component$<ItemProps>(({ props }) => {
  const purchase = $(() => {
    tursoTogglePurchased(props.id);
    props.purchased = true;
  });
  const divEl = useSignal<HTMLDivElement>();
  return (
    <div
      ref={divEl}
      class=" min-h-10 mx-auto my-2 flex w-11/12  rounded-lg border text-gray-800  shadow-[0_2px_15px_-3px_rgba(d,f,d,f.2),0_10px_20px_-2px_rgba(0,0,0,0.9)] dark:bg-slate-200"
    >
      <div class="flex w-full justify-between ">
        <button
          class="m-auto mx-2 aspect-square h-6 w-6 rounded-sm text-gray-600 shadow-md"
          onClick$={() => {
            tursoDeleteItem(props.id).then((data) => {
              data === "Deleted" && divEl.value?.remove();
            });
          }}
        >
          <LuTrash2 class="m-auto" />
        </button>
        <div class=" mx-auto my-1">
          <h5 class="lg:text-xxl relative text-xl font-bold leading-tight ">
            {props.name}
          </h5>
        </div>
        {props.purchased ? (
          <button
            class="m-auto mx-5 aspect-square h-6 w-6 rounded-sm bg-green-200 shadow-md"
            disabled
          >
            <LuCheckCheck class="m-auto" />
          </button>
        ) : (
          <button
            class="m-auto mx-5 aspect-square h-6 w-6 rounded-sm shadow-md shadow-gray-200 outline outline-1"
            onClick$={purchase}
          >
            <LuCheck class="m-auto text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
});
