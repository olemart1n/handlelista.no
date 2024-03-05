import type { CookieValue } from "@builder.io/qwik-city";
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
    try {
      const req = await fetch(import.meta.env.PUBLIC_SERVER_URL + route, {
        headers: {
          Cookie: `jwt=${cookie.value}`,
        },
      });
      return await req.json();
    } catch (error) {
      console.log(error);
      return error;
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