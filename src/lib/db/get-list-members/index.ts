import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
import type { ListMember } from "~/lib/types";
export const getListMembers = async (env: EnvGetter, list_id: string) => {
  try {
    const client = turso(env);
    const res = await client.execute({
      sql: "SELECT user_list.*, Users.name, Users.avatar FROM user_list JOIN Users ON user_list.user_id = Users.id WHERE user_list.list_id = ?",
      args: [list_id],
    });

    return res.rows as unknown as ListMember[];
  } catch (error) {
    console.log("logged from the catchblock: /b/ " + error);
  }
};
