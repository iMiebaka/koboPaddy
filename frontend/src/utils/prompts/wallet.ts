export function transferFundErrorResponse(params: any): any {
  const response = [];
  if (params.details) {
    if (params.details.amount) response.push(params.details.amount);
  }

  return response;
}
