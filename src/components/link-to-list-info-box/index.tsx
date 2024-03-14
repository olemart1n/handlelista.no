import { component$, type Signal } from "@builder.io/qwik";
import { LuTrash2, LuArrowUpSquare } from "@qwikest/icons/lucide";
import { useTursoDeleteList } from "~/routes/bruker";
export interface LinkToListInfoBoxProps {
  listId: number;
  divEl: Signal<HTMLDivElement | undefined>;
}

export const LinkToListInfoBox = component$<LinkToListInfoBoxProps>(
  ({ listId, divEl }) => {
    const del = useTursoDeleteList();
    // SENERE KAN MELDEMMER AV LISTEN INKLUDERES I DENNE INFO BOKSEN
    // useTask$(() => {
    // user.submit({ userId: userId });
    // });
    return (
      <div class="flex">
        <button
          class="h-full w-10 bg-yellow-100"
          onClick$={() =>
            del.submit({ listId: listId }).then(() => divEl.value!.remove())
          }
        >
          <LuTrash2 class="m-auto text-lg" />
        </button>
        <button class="flex h-full w-20 place-content-center bg-blue-100">
          <LuArrowUpSquare class="my-auto text-lg" />
          <span class="my-auto text-sm">Inviter</span>
        </button>
      </div>
    );
  },
);
