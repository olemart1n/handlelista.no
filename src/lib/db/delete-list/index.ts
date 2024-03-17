import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
export const deleteList = async (env: EnvGetter, listId: number) => {
  try {
    const client = turso(env);
    await client.execute({
      sql: "DELETE FROM lists WHERE id=?",
      args: [listId],
    });
  } catch (error) {
    console.log("logged from the catchblock: \n " + error);
  }
};
