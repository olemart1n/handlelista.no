import { component$, type Signal } from "@builder.io/qwik";
import { LuTrash2 } from "@qwikest/icons/lucide";
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
      <div>
        <button
          class="h-full"
          onClick$={() =>
            del.submit({ listId: listId }).then(() => divEl.value!.remove())
          }
        >
          <LuTrash2 class="my-auto ms-5 text-lg" />
        </button>
      </div>
    );
  },
);
