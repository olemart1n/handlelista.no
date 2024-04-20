import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "./turso-client";
import type { ListItem, List } from "~/lib";

export const selectListItems = async (
  env: EnvGetter,
  list_id: string,
): Promise<ListItem [] | undefined> => {
    try {
        const client = turso(env);
        const res = await client.execute({
          sql: "SELECT * FROM items WHERE list_id= ?",
          args: [list_id],
        });
        return res.rows as unknown as ListItem[];
      } catch (error) {
        console.log("Error selectListItems: \n" + error);
      }
};


export const selectList = async(env: EnvGetter, list_id: string): Promise <List | undefined> => {
    try {
        const client = turso(env);
        const res = await client.execute({
          sql: "SELECT * FROM lists WHERE id= ?",
          args: [list_id],
        });
        return res.rows[0] as unknown as List;
      } catch (error) {
        console.log("selectList error: \n " + error);
      }
}


export const selectAllLists = async(env: EnvGetter) => {
  try {
      const client = turso(env);
      const res = await client.execute("SELECT * FROM lists");
      return res.rows as unknown as List[]
    } catch (error) {
      console.log("selectList error: \n " + error);
    }
}