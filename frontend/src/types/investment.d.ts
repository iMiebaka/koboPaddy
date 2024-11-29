declare interface ITInvestmentPlan {
  plan: string;
  active: boolean;
  min_investment: number;
  interest_rate: number;
}

declare interface ITWalletTx {
    amount: string;
  }