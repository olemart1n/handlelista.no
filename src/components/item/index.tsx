import { component$, useSignal } from "@builder.io/qwik";
import { type ListItem } from "~/lib";
import { LuInfo, LuCheck, LuCheckCheck } from "@qwikest/icons/lucide";
import { useTursoPurhaseItem } from "~/routes/liste/[id]";
import { ItemInfoBox } from "../item-info-box";
export interface ItemProps {
  props: ListItem;
}

export const Item = component$<ItemProps>(({ props }) => {
  const togglePurchase = useTursoPurhaseItem();
  const divEl = useSignal<HTMLDivElement>();
  const isInfo = useSignal(false);

  return (
    <div
      ref={divEl}
      class=" mx-auto my-2 flex h-10 w-11/12  rounded-lg border text-gray-800  shadow-[0_2px_15px_-3px_rgba(d,f,d,f.2),0_10px_20px_-2px_rgba(0,0,0,0.9)] dark:bg-slate-200"
    >
      <button onClick$={() => (isInfo.value = !isInfo.value)}>
        <LuInfo class="ms-2 h-4 w-4 text-gray-400" />
      </button>
      {!isInfo.value ? (
        <div class="flex w-full justify-between ">
          {" "}
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
              onClick$={() => {
                togglePurchase.submit({ itemId: props.id });
                props.purchased = true;
                props.bought_by = props.user_id;
              }}
            >
              <LuCheck class="m-auto text-gray-400" />
            </button>
          )}
        </div>
      ) : (
        <div class="flex w-full justify-between ">
          <ItemInfoBox
            userId={props.user_id}
            itemId={props.id}
            element={divEl}
            boughtBy={props.bought_by}
            isPurchased={props.purchased}
          />
        </div>
      )}
    </div>
  );
});
