import { component$, useSignal, type Signal, $ } from "@builder.io/qwik";
import { LuCheck, LuLoader2 } from "@qwikest/icons/lucide";
import { useTursoCreateList } from "~/routes/bruker";
import type { List } from "~/lib";
export interface CreateListProps {
  isVisible: Signal;
  list: List[];
}

export const CreateList = component$<CreateListProps>(({ isVisible, list }) => {
  const create = useTursoCreateList();
  const title = useSignal("");
  const isLoading = useSignal(false);
  const submitList = $(() => {
    isLoading.value = true;
    create
      .submit({ title: title.value })
      .then((data) => {
        list.push(data.value as unknown as List);
      })
      .then(() => {
        title.value = "";
        isVisible.value = false;
      })
      .catch((err) => console.log(err));
  });
  return (
    <form class="my-2 flex h-10" preventdefault:submit onsubmit$={submitList}>
      <input
        bind:value={title}
        type="text"
        name="title"
        id="title"
        placeholder="tittel"
        class="w-full rounded border-2 border-slate-600 text-center text-xl"
      />

      <button
        type="button"
        class={
          " mx-2 aspect-square rounded " +
          (title.value.length > 2 ? "bg-green-300" : "bg-green-100")
        }
        disabled={title.value.length < 2}
      >
        {isLoading.value ? (
          <LuLoader2 class="m-auto h-8 w-8 animate-spin text-white" />
        ) : (
          <LuCheck class="m-auto h-8 w-8 " />
        )}
      </button>
    </form>
  );
});
