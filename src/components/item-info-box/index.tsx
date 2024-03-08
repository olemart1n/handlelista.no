import { component$, useTask$, type Signal } from "@builder.io/qwik";
import { LuTrash2 } from "@qwikest/icons/lucide";
import { useHerokuGetUserById, useTursoRemoveItem } from "~/routes/liste/[id]";
export interface ItemInfoBoxProps {
  userId: number;
  itemId: number;
  element: Signal<HTMLDivElement | undefined>;
  boughtBy: number;
  isPurchased: boolean;
}

export const ItemInfoBox = component$<ItemInfoBoxProps>(
  ({ userId, itemId, element, boughtBy, isPurchased }) => {
    const action = useHerokuGetUserById();
    const deleteItem = useTursoRemoveItem();
    const infoText = isPurchased ? "Kjøpt av " : "Lagt til av ";
    useTask$(() => {
      action.submit({ userId: isPurchased ? boughtBy : userId });
    });
    return (
      <>
        <p class="my-auto ms-2">
          {action.value
            ? infoText + action.value.name.toString().split(" ")[0]
            : ""}
        </p>
        <button
          class="m-auto mx-5 aspect-square h-6 w-6 rounded-sm shadow-md"
          onClick$={() => {
            deleteItem.submit({ itemId });
            element.value!.remove();
          }}
        >
          <LuTrash2 class="m-auto" />
        </button>
      </>
    );
  },
);
