import Cookie from "js-cookie";
// import API_V1_ROUTE from "./routes/api-v1";

export default async function api<T>({
  data = undefined,
  url,
  secure,
  method = "GET",
  multipart = false,
}: {
  data?: any;
  url: string;
  secure?: boolean;
  method?: "GET" | "PUT" | "POST" | "DELETE";
  multipart?: boolean;
}) {
  return new Promise<T>(async (resolve, reject) => {
    const headers: any = {
    };
    let body = data && JSON.stringify(data);
    if (multipart) {
      body = data;
    }
    else{
      headers["Content-type"] = "application/json"
    }
    if (secure || secure == undefined) {
      headers["Authorization"] = `Bearer ${Cookie.get("access_token")}`;
    }
    try {
      const response = await fetch(import.meta.env.VITE_APP_API_DOMAIN + url, {
        method,
        headers,
        body,
      });
      if (!response.ok) {
        if (response.json) {
          const err = await response.json();

          return reject({ ...err, statusCode: response.status });
        } else {
          reject({
            details: "Something went wrong",
            statusCode: response.status,
          });
        }
      }
      if (response.status == 204) {
        return resolve("" as T);
      } else {
        const result: T = await response.json();
        return resolve(result);
      }
    } catch (err: any) {
      reject({ detail: err.message });
    }
  });
}


