import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { LuArrowLeft } from "@qwikest/icons/lucide";
export const Nav = component$(() => {
  const loc = useLocation();
  return (
    <nav class="flex w-full justify-between p-3">
      {!loc.url.pathname.includes("liste") ? (
        <Link href="/">
          <h1>handlelista.no</h1>
        </Link>
      ) : (
        <Link
          href="/bruker"
          class="flex rounded border-2 border-gray-600 p-1 text-lg  "
        >
          <LuArrowLeft class="my-auto text-lg" /> <p>Bruker</p>
        </Link>
      )}
    </nav>
  );
});
