declare interface ITInvestmentPlan {
  plan: string;
  active: boolean;
  image: string;
  min_investment: number;
  interest_rate: number;
}
declare interface ITInvestmentPlanRes {
  data: ITInvestmentPlan[];
}
declare interface ITWalletTx {
  amount: string;
}
