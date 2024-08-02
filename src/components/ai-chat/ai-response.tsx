import { component$, useSignal } from "@builder.io/qwik";
import { type Cookie, server$ } from "@builder.io/qwik-city";
import {
  insertNewList,
  addListToCookies,
  insertManyItems,
  type List,
  type Prompt1,
} from "~/lib";
import { v4 } from "uuid";
import { Ingredient } from "./ingredient";
const insert = server$(async function (title: string, items: string[]) {
  const id = v4();
  const res = await insertNewList(this.env, id, title);
  await insertManyItems(this.env, id, items);
  addListToCookies(this.cookie as Cookie, { id, title });
  return res as List;
});

interface ButtonProps {
  list: List[];
  store: Prompt1;
}
export const AiResponse = component$<ButtonProps>(({ list, store }) => {
  const div = useSignal<HTMLDivElement>();
  return (
    <div ref={div}>
      <button
        class="mx-auto my-1 block w-fit rounded bg-green-400 p-2"
        onClick$={() => {
          insert(store.dinner, store.ingredients).then((data) => {
            list.push(data);
            div.value?.remove();
          });
        }}
      >
        Opprett liste{" "}
        <span class="underline">{store.dinner.split(" ")[0]}</span>
      </button>
      <h2 class="my-1 text-center font-semibold">{store.dinner}</h2>
      <div class="border-1 mx-auto w-1/2 border ">
        {store.ingredients.map((ing, i) => (
          <Ingredient name={ing} key={i} />
        ))}
      </div>
    </div>
  );
});
