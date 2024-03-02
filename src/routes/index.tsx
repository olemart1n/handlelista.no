import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <Link
        class="relative mx-auto flex h-16 w-11/12 place-items-center justify-around rounded-sm border bg-green-100 text-center text-4xl shadow-md drop-shadow-sm"
        href="/bruker"
      >
        Din bruker
      </Link>
      <h2>Lucia</h2>
    </>
  );
});

export const head: DocumentHead = {
  title: "Handlelista",
  meta: [
    {
      name: "description",
      content:
        "handlelista.no er ett nettsted der man kan lage sette opp handlelister",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
};
