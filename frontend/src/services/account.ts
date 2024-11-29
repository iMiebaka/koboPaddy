import api from "./api";
import API_ROUTE from "./routes";

const login = async (data: any) => {
  try {
    return await api<ITLoginToken>({
      url: API_ROUTE.login,
      data,
      secure: false,
      method: "POST",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const logOut = async (data: any) => {
  try {
    return await api<any>({ url: API_ROUTE.logout, data, method: "POST" });
  } catch (err: any) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const register = async (data: ITRegister) => {
  try {
    return await api<any>({ url: API_ROUTE.logout, data, method: "POST" });
  } catch (err: any) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const verify = async (data: any) => {
  try {
    return await api<any>({ url: API_ROUTE.logout, data, method: "POST" });
  } catch (err: any) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const profile = async (id: string) => {
  if (!id) {
    throw new Error("Request not ready");
  }
  try {
    return await api<any>({ url: API_ROUTE.profile + id });
  } catch (err: any) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const ACCOUNT_API = {
  login,
  logOut,
  profile,
  register,
  verify
};

export default ACCOUNT_API;
