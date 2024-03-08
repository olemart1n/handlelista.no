import {
  component$,
  Slot,
  useStore,
  useContextProvider,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
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

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const appState: App = useStore({
    theme: "light",
  });
  useContextProvider(appContext, appState);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Slot />
      </main>
    </>
  );
});
