import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
import type { List } from "~/lib/types";
export const getList = async (env: EnvGetter, list_id: string) => {
  try {
    const client = turso(env);
    const res = await client.execute({
      sql: "SELECT * FROM lists WHERE id= ?",
      args: [list_id],
    });
    return res.rows[0] as unknown as List;
  } catch (error) {
    console.log("logged from the getList catchblock: /b/ " + error);
  }
};
