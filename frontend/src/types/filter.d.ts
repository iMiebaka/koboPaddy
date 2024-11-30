declare interface ITInvestmentFilterMethod {
  methods: UseFormReturn<ITPaginationRequest, any, undefined>;
}


declare interface ITLedgerFilterMethod {
  methods: UseFormReturn<ITInvestmentPlan, any, undefined>;
}


declare interface ITMakeInvestmentFilterMethod {
  methods: UseFormReturn<ITMakeInvestmentTx, any, undefined>;
}