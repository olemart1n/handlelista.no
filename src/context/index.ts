import { createContextId } from "@builder.io/qwik";

export interface App {
  theme: string;
}
export const appContext = createContextId<App>("appContext");
