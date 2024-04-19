import { component$, useSignal, $ } from "@builder.io/qwik";
import { LuCheck, LuLoader2 } from "@qwikest/icons/lucide";
import { server$ } from "@builder.io/qwik-city";
import type { List } from "~/lib/definitions";
import { insertNewList } from "~/lib/turso";
import { v4 } from "uuid";
interface CreateListProps {
  list: List[];
}
const tursoInsertNewList = server$(async function (title) {
  title;
  const newId = v4();
  const res = await insertNewList(this.env, newId, title);

  const value = { id: newId, title: title };
  const alreadyStored = this.cookie.get("lists")?.value;
  if (alreadyStored) {
    this.cookie.delete("lists", { path: "/" });
    const parsed = JSON.parse(alreadyStored);
    parsed.push(value);
    this.cookie.set("lists", JSON.stringify(parsed), {
      path: "/",
      expires: new Date("9999-12-31T23:59:59"),
    });
  } else {
    this.cookie.set("lists", JSON.stringify([value]), {
      path: "/",
      expires: new Date("9999-12-31T23:59:59"),
    });
  }
  return res as List;
});

export const CreateListForm = component$<CreateListProps>(({ list }) => {
  const title = useSignal("");
  const isLoading = useSignal(false);
  const submitList = $(() => {
    isLoading.value = true;
    tursoInsertNewList(title.value)
      .then((data) => list.push(data))
      .then(() => {
        title.value = "";
        isLoading.value = false;
      });
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
