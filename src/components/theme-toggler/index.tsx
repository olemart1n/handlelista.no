import { component$ } from "@builder.io/qwik";
import { LuSun, LuMoon } from "@qwikest/icons/lucide";
import { useContext } from "@builder.io/qwik";
import { appContext } from "~/context";
import { useSetTheme } from "~/routes/layout";
export const ThemeToggler = component$(() => {
  const setTheme = useSetTheme();
  const app = useContext(appContext);
  return (
    <button
      class="relative  flex h-4 w-9 items-center rounded-full outline outline-1 transition  duration-300 dark:text-slate-50 dark:outline dark:outline-1 lg:mx-0 lg:my-0"
      onClick$={() => {
        app.theme === "dark" ? (app.theme = "light") : (app.theme = "dark");
        setTheme.submit();
      }}
    >
      <LuMoon class=" absolute right-0 transform opacity-0 transition duration-300 dark:left-auto dark:-translate-x-5 dark:opacity-100" />
      <LuSun class="absolute right-0 transform transition duration-300   dark:-translate-x-5  dark:opacity-0" />
    </button>
  );
});
