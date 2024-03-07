import { component$, useTask$, type Signal } from "@builder.io/qwik";
import { LuTrash2 } from "@qwikest/icons/lucide";
import { useHerokuGetUserById, useTursoRemoveItem } from "~/routes/liste/[id]";
export interface ItemInfoBoxProps {
  userId: number;
  itemId: number;
  element: Signal<HTMLDivElement | undefined>;
}

export const ItemInfoBox = component$<ItemInfoBoxProps>(
  ({ userId, itemId, element }) => {
    const action = useHerokuGetUserById();
    const deleteItem = useTursoRemoveItem();

    useTask$(() => {
      action.submit({ userId: userId });
    });
    return (
      <>
        <p class="my-auto ms-2">
          {action.value
            ? "lagt til av " + action.value.name.toString().split(" ")[0]
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
