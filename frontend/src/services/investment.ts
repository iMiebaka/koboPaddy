import api from "./api";
import API_ROUTE from "./routes";

const getInvestmentPlans = async (data: any) => {
  try {
    return await api<ITInvestmentPlanRes>({
      url: API_ROUTE.investment,
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const getInvestments = async (data: any) => {
  try {
    return await api<ITInvestmentPlanRes>({
      url: API_ROUTE.subcriptions,
      data,
      method: "POST",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const getInvestment = async (data: any) => {
  try {
    return await api<any>({
      url: API_ROUTE.login,
      data,
      method: "POST",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const getWallet = async () => {
  try {
    return await api<ITWalletTx>({
      url: API_ROUTE.wallet,
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const getLedger = async (data: any) => {
  try {
    return await api<ITLedgerRes>({
      url: API_ROUTE.ledger,
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const creditWallet = async (data: any) => {
  try {
    return await api<ITWalletTx>({
      url: API_ROUTE.wallet,
      data,
      method: "POST",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const withdraw = async (data: any) => {
  try {
    return await api<ITWalletTx>({
      url: API_ROUTE.wallet,
      data,
      method: "PUT",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const makeInvestment = async (data: any) => {
  try {
    return await api<ITWalletTx>({
      url: API_ROUTE.subcriptions,
      data,
      method: "POST",
    });
  } catch (err) {
    import.meta.env.DEV && console.error(err);

    throw err;
  }
};

const INVESTMENT_API = {
  creditWallet,
  getInvestment,
  getInvestments,
  getInvestmentPlans,
  makeInvestment,
  getWallet,
  withdraw,
  getLedger,
};

export default INVESTMENT_API;
