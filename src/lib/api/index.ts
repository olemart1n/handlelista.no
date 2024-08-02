import { RequestEventCommon } from "@builder.io/qwik-city/middleware/request-handler"
export const prompt1 = async(env: RequestEventCommon["env"]) => {
    const api = env.get("PRIVATE_API")
    if(!api) {
        throw new Error("PRIVATE_API is not defined")
    }

    try {
        const res = await fetch(api + "/api/prompt1")
        return {data: res, error: null}
    } catch (error) {
        console.log(error)
        return {data: null, error: "some error occured in prompt1 function"}
    }
}

