import {
  component$,
  Slot,
  useStore,
  useContextProvider,
} from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { type RequestHandler } from "@builder.io/qwik-city";
import { Nav } from "~/components";
import { appContext, type App } from "~/context";
export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 3,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 0,
  });
};

export const useGetTheme = routeLoader$((requestEv) => {
  return requestEv.cookie.get("theme")?.value as string;
});

export const useSetTheme = routeAction$((_, requestEv) => {
  if (requestEv.cookie.get("theme")?.value === "dark") {
    requestEv.cookie.delete("theme", { path: "/" });
  } else {
    requestEv.cookie.set("theme", "dark", {
      expires: "999999999",
      path: "/",
    });
  }
});

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const theme = useGetTheme();

  console.log(theme.value);
  const appState: App = useStore({
    theme: theme.value,
  });
  useContextProvider(appContext, appState);

  return (
    <>
      <header
        class={
          theme.value +
          " transition duration-300" +
          (theme.value === "dark" ? " bg-zinc-400" : "")
        }
      >
        <Nav />
      </header>
      <main
        class={
          theme.value +
          " transition duration-300" +
          (theme.value === "dark" ? " bg-slate-800" : "")
        }
      >
        <Slot />
      </main>
    </>
  );
});
