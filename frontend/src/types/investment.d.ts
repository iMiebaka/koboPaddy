declare interface ITInvestmentPlan {
  id: number;
  plan: string;
  active: boolean;
  image: string;
  min_investment: number;
  interest_rate: number;
}
declare interface ITInvestmentPlanRes extends ITPaginationRequest {
  data: ITInvestmentPlan[];
}

declare interface ITWalletTx {
  amount: string;
}


declare interface ITMakeInvestmentTx {
  amount: string;
  id?: number
  payload?: ITInvestmentPlan
}

declare interface ITWithdrawInvestmentTx {
  amount: string;
  id?: number
}

declare interface ITInvestment {
  id: number;
  plan: ITInvestmentPlan;
  activated: boolean;
  deposit: number;
  closed_at: string;
  revenue: number[];
}

declare interface ITInvestmentRes extends ITPaginationRequest {
  data: ITInvestment[];
}