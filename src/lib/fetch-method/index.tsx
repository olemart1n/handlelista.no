interface ReturnInterface {
  data: any;
  error: any
}


const headerConfig = (method: string, jwt: string, formData?: {}) => {
  if (method === "GET" || method === "DELETE") {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      
  }
  } else {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(formData),
    }
  }
}

export const fetchMethod = async (
  method:string, 
  route: string,
  jwt: string,
  formData?: object) : Promise<ReturnInterface> => {

    try {
      const res = await fetch(import.meta.env.PUBLIC_SERVER_URL + route, headerConfig(method, jwt, formData));
      const {data, error} =await res.json()
      if(error) {
        console.log("error1 " + error)
        return {data: null, error: error}
      } else {
        return {data: data, error: null}
      }
    } catch (error) {
      console.log("error2 " + error)
      console.log(error);
      return {data: null, error: error}
    }  
    
}

