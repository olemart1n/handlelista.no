import type { CookieValue } from "@builder.io/qwik-city";
interface ReturnInterface {
  data: any;
  error: any
}
export const methodPost = async (
  route: string,
  cookie: CookieValue,
  formData: object,
) => {
  try {
    const req = await fetch(import.meta.env.PUBLIC_SERVER_URL + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${cookie.value}`,
      },
      body: JSON.stringify(formData),
    });
    return await req.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const methodGet = async (route: string, cookie: CookieValue) => {
    const req = await fetch(import.meta.env.PUBLIC_SERVER_URL + route, {
      headers: {
        Cookie: `jwt=${cookie.value}`,
      },
    });
    const {data, error} = await req.json();
    if(data) {
      return {data: data, error: null}
    } else {
      return {data: null, error: error}
    }
  };

  export const meothodPatch = async (
    route: string,
    cookie: CookieValue,
    formData: object,
  ) => {
    try {
      const req = await fetch(import.meta.env.PUBLIC_SERVER_URL + route, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt=${cookie.value}`,
        },
        body: JSON.stringify(formData),
      });
      return await req.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  export const meothodDelete = async (
    route: string,
    cookie: CookieValue,
    formData: object,
  ) => {
    try {
      const req = await fetch(import.meta.env.PUBLIC_SERVER_URL + route, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt=${cookie.value}`,
        },
        body: JSON.stringify(formData),
      });
      return await req.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };