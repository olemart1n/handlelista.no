import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
export const removeItem = async (env: EnvGetter, itemId: number) => {
  try {
    const client = turso(env);

    const res = await client.execute({
      sql: "DELETE FROM items WHERE id=?",
      args: [itemId],
    });
    return res.rows[0];
  } catch (error) {
    console.log("logged from the catchblock: /b/ " + error);
  }
};
