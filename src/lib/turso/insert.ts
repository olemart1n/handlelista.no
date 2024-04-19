import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "./turso-client";
import type { List, ListItem } from "~/lib";
export const insertNewList = async (
  env: EnvGetter,
  id: string,
  title: string,
): Promise<List | undefined> => {
  try {
    const client = turso(env);
    const newList = await client.execute({
        sql: "INSERT INTO lists (id,title) VALUES (?,?) RETURNING *",
        args: [id, title],  
    })
    if(newList.rows.length > 0) {
        return newList.rows[0] as unknown as List
    }
  } catch (error) {
    console.log("logged from the insertList: \n " + error);
  }

};


export const insertNewItem = async (
    env: EnvGetter,
    list_id: string,
    name: string
): Promise<ListItem | undefined> => {
    try {
        const client = turso(env);
        const res = await client.execute({
            sql: 'INSERT INTO items (name, list_id) VALUES (?, ?) RETURNING *',
            args: [name, list_id]
        });
        if (res.rows.length > 0) {
            return res.rows[0] as unknown as ListItem
        }
    } catch (error) {
        console.log(error)
    }    
}