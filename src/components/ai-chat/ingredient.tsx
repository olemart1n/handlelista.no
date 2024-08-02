import { component$ } from "@builder.io/qwik";
interface Ing {
  name: string;
}
export const Ingredient = component$<Ing>((ing) => {
  return (
    <p class="mx-auto my-1 w-1/2 rounded bg-slate-100 p-1 text-center">
      {ing.name}
    </p>
  );
});
