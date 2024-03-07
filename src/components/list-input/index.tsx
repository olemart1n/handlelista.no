import { component$, useSignal } from "@builder.io/qwik";
import { LuPlus, LuCheck } from "@qwikest/icons/lucide";
import { useTursoInsertItem } from "~/routes/liste/[id]";
import type { ListItem } from "~/lib";

interface ListInputProps {
  list: ListItem[];
}
export const ListInput = component$<ListInputProps>(({ list }) => {
  const inputValue = useSignal("");
  const isInFocus = useSignal(false);
  const insertItem = useTursoInsertItem();

  return (
    <>
      {" "}
      <input
        bind:value={inputValue}
        onFocusOut$={() => (isInFocus.value = false)}
        onKeyUp$={() =>
          inputValue.value.length > 2
            ? (isInFocus.value = true)
            : (isInFocus.value = false)
        }
        type="text"
        name="item"
        maxLength={20}
        id="item"
        class={
          "absolute z-10 m-auto h-full w-full border-gray-700 bg-transparent ps-3 text-center text-2xl "
        }
      ></input>
      <button
        onFocusIn$={() => (isInFocus.value = true)}
        onFocusOut$={() => (isInFocus.value = false)}
        class={
          "right-0 m-1 my-auto ms-auto h-14 w-14 rounded bg-green-200 " +
          (isInFocus.value && "z-20 bg-green-300")
        }
        onClick$={() =>
          insertItem.submit({ name: inputValue.value }).then((data) => {
            list.push(data.value as unknown as ListItem);
            inputValue.value = "";
            isInFocus.value = false;
          })
        }
      >
        {isInFocus.value ? (
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
    </>
  );
});
