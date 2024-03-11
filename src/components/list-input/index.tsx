import { component$, useSignal } from "@builder.io/qwik";
import { LuPlus, LuCheck } from "@qwikest/icons/lucide";
import { useTursoInsertItem } from "~/routes/liste/[id]";
import type { ListItem } from "~/lib";

interface ListInputProps {
  list: ListItem[];
}
export const ListInput = component$<ListInputProps>(({ list }) => {
  const inputValue = useSignal("");
  const insertItem = useTursoInsertItem();
  const focusOutHiddenBtn = useSignal<HTMLButtonElement>();
  return (
    <form
      class="flex h-full w-full"
      preventdefault:submit
      onsubmit$={() => {
        if (inputValue.value.length < 3) return;
        insertItem.submit({ name: inputValue.value }).then((data) => {
          list.push(data.value as unknown as ListItem);
          inputValue.value = "";
          focusOutHiddenBtn.value?.focus();
        });
      }}
    >
      {" "}
      <input
        bind:value={inputValue}
        type="text"
        name="item"
        maxLength={20}
        id="item"
        class={
          "absolute z-10 m-auto h-full w-full border-gray-700 bg-transparent ps-3 text-center text-2xl "
        }
      ></input>
      <button
        ref={focusOutHiddenBtn}
        class="absolute -left-full"
        type="button"
      ></button>
      <button
        class={
          "right-0 m-1 my-auto ms-auto h-14 w-14 rounded bg-green-200 " +
          (inputValue.value.length > 2 && "z-20 bg-green-300")
        }
      >
        {inputValue.value.length > 2 ? (
          <LuCheck
            class="m-auto h-12 w-12"
            aria-hidden="true"
            focusable="false"
          />
        ) : (
          <LuPlus
            class="m-auto h-12 w-12"
            aria-hidden="true"
            focusable="false"
          />
        )}
      </button>
    </form>
  );
});
