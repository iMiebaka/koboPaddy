declare interface ITInvestmentPlan {
  plan: string;
  active: boolean;
  image: string;
  min_investment: number;
  interest_rate: number;
}

declare interface ITLedgerRes extends ITPaginationRequest {
  data: ITLedger[];
}

declare type ITTX_TYPE = "deposit" | "withdrawal";
declare type ITLedgerStatus = "pending" | "approved" | "rejected";

declare interface ITLedger {
  id: number;
  amount: number;
  created_at: string;
  status: ITLedgerStatus;
  tx_type: ITTX_TYPE;
}
