import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const PopUpCookie = component$(() => {
  const classAdded = useSignal(false);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    classAdded.value = true;
  });
  const el = useSignal<HTMLDivElement>();
  return (
    <div
      ref={el}
      class={
        "fixed left-1/2 top-3/4 m-auto h-20 w-full max-w-md -translate-x-1/2 transition duration-500" +
        (classAdded.value
          ? " translate-y-0 opacity-100 "
          : " translate-y-20 opacity-0")
      }
    >
      <div class={"relative mx-auto w-10/12 rounded-md bg-sky-200 p-4"}>
        <p>Besøkte handlelister lagres i form av cookies i din nettleser</p>
        <button
          class="mx-auto  mt-3 block h-10 w-20 rounded-sm bg-slate-50 text-center font-bold"
          onClick$={() => el.value?.remove()}
        >
          OK
        </button>
      </div>
    </div>
  );
});
