import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="box-shadow first-letter fixed bottom-10 left-5 right-5 top-20 ">
      <div class="flex h-20 w-full flex-col place-content-end">
        <h2 class=" inline text-center text-xl font-medium">
          Logg inn for å bruke handlelista.no
        </h2>
      </div>

      <Slot />
    </div>
  );
});
