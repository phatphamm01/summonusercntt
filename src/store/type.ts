type Set<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

type Get<T> = () => T;

export type IStore<
  T extends Record<string, any> = {},
  API extends string = '',
  APIState extends string | undefined = undefined,
  APIOmit = Omit<T, Exclude<APIState, undefined>>
> = (
  set: Set<T>,
  get: Get<T>
) => {
  [K in keyof T]: T[K];
} & {
  [K in keyof T as K extends `${infer I}` ? `set${Capitalize<I>}` : K]: (
    params: T[K]
  ) => void;
} & {
  [K in keyof APIOmit as K extends `${infer I}`
    ? `get${Capitalize<I>}Api`
    : K]: (...arg: any) => Promise<void>;
} & {
  [K in API as K extends `${infer I}` ? `${I}Api` : K]?: (
    ...arg: any
  ) => Promise<void>;
};

export enum StoreName {
  'COMMON' = 'COMMON',
  'PRODUCT' = 'PRODUCT',
  'UI' = 'UI',
  'USER' = 'USER',
}
