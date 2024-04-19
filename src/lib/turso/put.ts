import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "./turso-client";

export const updateItemIsPurchased = async (
  env: EnvGetter,
  itemId: string,
): Promise<boolean | undefined> => {
    const client = turso(env)
        const res = await client.execute({
		sql: 'UPDATE items SET purchased = true WHERE id = ?',
		args: [itemId]
	});
	if (res.rowsAffected > 0) {
		return true
	}
	return false
};