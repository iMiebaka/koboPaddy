export function signUpErrorResponse(params: any) {
  const response: string[] = [];
  if (params.password) {
    response.push(...params.password);
  }
  if (params.email) {
    response.push(...params.email);
  }
  if (params.first_name) {
    response.push(...params.first_name);
  }
  if (params.last_name) {
    response.push(...params.last_name);
  }
  if (params.detail) {
    response.push(...params.detail);
  }
  if (params.details) {
    if (params.details.non_field_errors) {
      response.push(...params.details.non_field_errors);
    } else {
      response.push(...params.details);
    }
  }
  return response;
}

export function loginErrorResponse(params: any) {
  const response: string[] = [];
  if (params.password) {
    response.push(...params.password);
  }
  if (params.email) {
    response.push(...params.email);
  }
  if (params.detail) {
    response.push(...params.detail);
  }
  if (params.details) {
    if (params.details.non_field_errors) {
      response.push(...params.details.non_field_errors);
    } else if (params.details.email) {
      response.push(...params.details.email);
    } else {
      response.push(...params.details);
    }
  }
  return response;
}
