export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginDataResponse {
  data: IUser;
  token: string;
}