import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
import type { List } from "~/lib/types";
export const insertItem = async (
  env: EnvGetter,
  itemName: string,
  list_id: string,
  user_id: string,
) => {
  try {
    const client = turso(env);
    const res = await client.execute({
      sql: "INSERT INTO items  (name, list_id, user_id ) VALUES (?, ?, ?) RETURNING *",
      args: [itemName, list_id, user_id],
    });
    return res.rows[0] as unknown as List;
  } catch (error) {
    console.log("logged from the catchblock: \n " + error);
  }
};
