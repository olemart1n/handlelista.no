import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
export const removeListMember = async (env: EnvGetter, userId: number, listId: number) => {
  const client = turso(env);
  try {
        await client.execute({sql: "SELECT * FROM user_list WHERE user_id = ? AND list_id = ?", args: [userId, listId]})
  } catch (error) {
    console.log("logged from the removeListMember catchblock: \n\ " + error);
  }
};
