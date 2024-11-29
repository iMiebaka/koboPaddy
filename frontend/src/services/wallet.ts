import api from "./api";
import API_ROUTE from "./routes";

const getWallet = async (data: any) => {
  try {
    return await api<ITLoginToken>({
      url: API_ROUTE.login,
      data,
      method: "POST",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const transaction = async (data: any) => {
  try {
    return await api<ITLoginToken>({
      url: API_ROUTE.login,
      data,
      method: "POST",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const WALLET_API = {
  getWallet,
  transaction,
};

export default WALLET_API;
