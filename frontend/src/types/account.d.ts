declare interface ITUser {
  id: number | string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
}

declare interface ITLogin {
  password: string;
  email: string;
}

declare interface ITRegister {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

declare interface ITLoginToken {
  access_token: string;
}


