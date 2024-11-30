export function makeInvestmentErrorResponse(params: any): any {
  const response = [];
  if (params.details) {
    if (params.details.amount) response.push(params.details.amount);
    if (params.details.plan) response.push(params.details.plan);
  }

  return response;
}
