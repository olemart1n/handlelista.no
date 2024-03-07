import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
export const initializeUser = async (env: EnvGetter, id: number) => {
    console.log(id)
  try {
    const client = turso(env);
    const transaction = await client.transaction("write");
    const res = await transaction.execute({
      sql: "SELECT * FROM users WHERE id=?",
      args: [id],
    });

    if (!res.rows[0]) {
      const sql = "INSERT INTO users (id) VALUES (?)"
      const user = await transaction.execute({
        sql,
        args: [id],
      });
      // Step 1: Insert a new list
      const list = await transaction.execute({
        sql: "INSERT INTO lists (title) VALUES (?) RETURNING id",
        args: ["Liste nr 1"],
      });
      await transaction.execute({
        sql: "INSERT INTO user_list (user_id, list_id, role) VALUES (?, ?, ?)",
        args: [id, list.rows[0].id, "owner"],
      });
    } else {
      await transaction.rollback();
      return;
    }
    await transaction.commit();
  } catch (error) {
    console.log("logged from the catchblock: /b/ " + error);
  }
};
