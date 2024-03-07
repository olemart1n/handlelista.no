import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
export const deleteUser = async (env: EnvGetter, userId: number) => {
  try {
    const client = turso(env);
    await client.execute({
      sql: "DELETE FROM users WHERE id=?",
      args: [userId],
    });
  } catch (error) {
    console.log("logged from the catchblock: /b/ " + error);
  }
};
