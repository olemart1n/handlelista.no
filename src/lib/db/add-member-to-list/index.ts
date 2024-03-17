import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
import { List } from "~/lib/types";
export const addMemberToList = async (env: EnvGetter, userId: number, listId: number) => {
  const client = turso(env);
    const transaction = await client.transaction()
  try {
    
      await transaction.execute({
        sql: "INSERT INTO user_list (user_id, list_id, role) VALUES (?, ?, ?)",
        args: [userId, listId, "member"],
      });

  } catch (error) {
    console.log("logged from the addMemberToList catchblock-1: \n\ " + error);
  }
  try {
    const list = await transaction.execute({sql: "SELECT * FROM lists WHERE id = ?", args: [listId]})
    if(list.rows.length === 0) transaction.rollback()
    transaction.commit()
    return list.rows[0] as unknown as List    
  } catch (error) {
    console.log("logged from the addMemberToList catchblock-2: \n\ " + error);
  }
};
