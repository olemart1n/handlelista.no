import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
import type { ListItem } from "~/lib/types";
export const getListItems = async (env: EnvGetter, list_id: string) => {
  try {
    const client = turso(env);
    const res = await client.execute({
      sql: "SELECT * FROM items WHERE list_id= ?",
      args: [list_id],
    });
    return res.rows as unknown as ListItem[];
  } catch (error) {
    console.log("logged from the catchblock: /b/ " + error);
  }
};
