import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
// import { type ListItem } from "";
export const purchaseItem = async (env: EnvGetter, itemId: number, userId: number) => {
  try {
    const client = turso(env);
    await client.execute({
      sql: "UPDATE items SET purchased = true, bought_by=? WHERE id=?",
      args: [userId,itemId],
    });
    // return res.rows[0] as unknown as ListItem;
  } catch (error) {
    console.log("logged from the catchblock: \n " + error);
  }
};
