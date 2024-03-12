import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
import type { List } from "../../types";
export const getUserLists = async (env: EnvGetter, id: string) => {
  try {
    const client = turso(env);
    const res = await client.execute({
      sql: "SELECT lists.*, user_list.role FROM lists JOIN user_list ON lists.id = user_list.list_id WHERE user_list.user_id = ?",
      args: [id],
    });
      return res.rows as unknown as List[];
    
  } catch (error) {
    console.log("logged from the catchblock: /b/ " + error);
  }
};