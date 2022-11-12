import { StoreApi, UseBoundStore } from 'zustand';
import { commonStore } from './common';
import { productStore } from './product';
import { uiStore } from './ui';
import { userStore } from './user';

export type IStore<T extends Record<string, any> = {}> = {
  [K in keyof T]: T[K];
} & {
  [K in keyof T as K extends `${infer I}` ? `set${Capitalize<I>}` : K]: (
    params: T[K]
  ) => void;
};

export enum StoreName {
  'COMMON' = 'COMMON',
  'PRODUCT' = 'PRODUCT',
  'UI' = 'UI',
  'USER' = 'USER',
}

type StateStore<T> = T extends UseBoundStore<StoreApi<IStore<infer Type>>>
  ? Type
  : T;
type DataStore<T> = { [key in keyof StateStore<T>]?: StateStore<T>[key] };

export type IStoreProps =
  | {
      type: StoreName.COMMON;
      data: DataStore<typeof commonStore>;
    }
  | { type: StoreName.PRODUCT; data: DataStore<typeof productStore> }
  | { type: StoreName.UI; data: DataStore<typeof uiStore> }
  | { type: StoreName.USER; data: DataStore<typeof userStore> };
