import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  const btn = useSignal<HTMLButtonElement>();
  const messageDiv = useSignal<HTMLDivElement>();
  const shareData = {
    title: "MDN",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  };
  useVisibleTask$(() => {
    btn.value?.addEventListener("click", async () => {
      try {
        console.log(navigator.canShare);

        await navigator.share(shareData);
        messageDiv.value!.textContent = "MDN shared successfully";
      } catch (err) {
        messageDiv.value!.textContent = `Error: ${err}`;
      }
    });
  });
  return (
    <div>
      <button class="bg-slate-100" ref={btn}>
        Test sharing
      </button>
      <div ref={messageDiv}></div>
    </div>
  );
});
