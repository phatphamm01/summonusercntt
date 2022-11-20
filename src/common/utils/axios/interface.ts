export type IDataAxios = Record<string, any>;
export type IResponseAxios = Promise<any>;
export interface IDataResponse {
  data?: any;
  status?: string;
}
