import { Cookie } from "@builder.io/qwik-city";
import type { List } from "~/lib/definitions";

export const addListToCookies = (cookies: Cookie, value: List) => {
    const alreadyStored = cookies.get("lists")?.value;
    if (alreadyStored) {
        cookies.delete("lists", { path: "/" });
      const parsed = JSON.parse(alreadyStored);
      parsed.push(value);
      cookies.set("lists", JSON.stringify(parsed), {
        path: "/",
        expires: new Date("9999-12-31T23:59:59"),
      });
    } else {
        cookies.set("lists", JSON.stringify([value]), {
        path: "/",
        expires: new Date("9999-12-31T23:59:59"),
      });
    }
}