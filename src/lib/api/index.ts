import { RequestEventCommon } from "@builder.io/qwik-city/middleware/request-handler"
export const prompt1 = async(env: RequestEventCommon["env"]) => {
    const api = env.get("PRIVATE_API")
    if(!api) {
        throw new Error("PRIVATE_API is not defined")
    }
    const res = await fetch(api + "/robokokk/prompt1")
    if(res.status > 299) {
        console.log( await res.json())
        return {data: null, error: {message: await res.json(), code: res.status}}
    }
    return {data: res, error: null}

}

