import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="box-shadow first-letter fixed bottom-10 left-5 right-5 top-20 ">
      <Slot />
    </div>
  );
});
