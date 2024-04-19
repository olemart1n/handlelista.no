import { component$, useSignal } from "@builder.io/qwik";
import { LuPlus, LuCheck } from "@qwikest/icons/lucide";
import type { ListItem } from "~/lib";
import { server$ } from "@builder.io/qwik-city";
import { insertNewItem } from "~/lib/turso";
interface ListInputProps {
  list: ListItem[];
}
const tursoInsertItem = server$(async function (name) {
  const id = this.params["id"];
  const res = await insertNewItem(this.env, id, name);
  if (res) {
    return res;
  }
});
export const AddItemForm = component$<ListInputProps>(({ list }) => {
  const title = useSignal("");
  const focusOutHiddenBtn = useSignal<HTMLButtonElement>();
  return (
    <form
      class="flex h-full w-full"
      preventdefault:submit
      onsubmit$={() => {
        if (title.value.length < 3) return;
        tursoInsertItem(title.value).then((data) => {
          if (!data) return;
          list.push(data);
          title.value = "";
          focusOutHiddenBtn.value?.focus();
        });
      }}
    >
      {" "}
      <input
        bind:value={title}
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
          (title.value.length > 2 && "z-20 bg-green-300")
        }
      >
        {title.value.length > 2 ? (
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
