import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "./turso-client";
export const deleteItem = async (
  env: EnvGetter,
  id: string,
): Promise<string> => {
    let response = "error"
  try {
    const client = turso(env);
    const item = await client.execute({
        sql: "DELETE FROM items WHERE id=?",
        args: [id],
      })
    if(item.rowsAffected > 0) {
        response = "Deleted"
    }
    return response
  } catch (error) {
    console.log("logged from the deleteItem: \n " + error);
    return "error"
  }
};
