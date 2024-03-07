import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { turso } from "../turso";





// BRUKER DATA LIGGER IKKE LENGER I TURSO DB
export const findUser = async (env: EnvGetter, email: string) => {
  try {
    const client = turso(env);
    const result = await client.execute({
      sql: "SELECT * FROM Users WHERE email=?",
      args: [email],
    });
    return result;
  } catch (error) {
    console.log("logged from the catchblock: /b/ " + error);
  }
};
