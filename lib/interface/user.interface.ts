export interface User {
  email: string;
  password: string;
  passwordCheck?: string;
  name?: string;
}

export interface UserValidation {
  email: boolean;
  password: boolean;
  passwordCheck: boolean;
  name: boolean;
}
