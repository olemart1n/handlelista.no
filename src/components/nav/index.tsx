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
        <Link href="/bruker" class="flex rounded border p-1">
          <LuArrowLeft /> Bruker
        </Link>
      )}
    </nav>
  );
});
