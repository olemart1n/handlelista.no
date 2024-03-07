//DELETE THIS FILE IF NOT NEEDED
import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";
export const findUserById = async (env: EnvGetter, userId: number) => {
  try {
    const client = turso(env);
    const result = await client.execute({
      sql: "SELECT * FROM Users WHERE id=?",
      args: [userId],
    });

    if (result.rows.length > 0) {
      return result.rows[0] ;
    } else {
      // Optionally handle the case where the user is not found
      console.log("No user found with ID:", userId);
      return null; // or a default value indicating no user was found
    }
  } catch (error) {
    console.log("logged from the catch block: ", error);
    return null; // or a default error value, or even re-throw the error depending on your use case
  }
};
