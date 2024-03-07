import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
import type { List } from "~/lib/types";
export const createList = async (
  env: EnvGetter,
  title: string,
  user_id: number,
) => {
  try {
    const client = turso(env);
    const transaction = await client.transaction("write");
    const res = await transaction.execute({
      sql: "INSERT INTO lists (title ) VALUES (?) RETURNING *",
      args: [title],
    });
    const id = res.rows[0].id;
    await transaction.execute({
      sql: "INSERT INTO user_list (user_id, list_id ) VALUES (?,?)",
      args: [user_id, id],
    });
    if (id) {
      transaction.commit();
      return res.rows[0] as unknown as List;
    } else {
      transaction.rollback();
    }
  } catch (error) {
    console.log("logged from the catchblock: \n " + error);
  }
};
