import { StoreApi, UseBoundStore } from 'zustand';
import { commonStore } from './common';
import { productStore } from './product/index';
import { StoreName } from './type';
import { uiStore } from './ui';
import { userStore } from './user';

export const store: Record<StoreName, UseBoundStore<StoreApi<any>>> = {
  [StoreName.COMMON]: commonStore,
  [StoreName.PRODUCT]: productStore,
  [StoreName.UI]: uiStore,
  [StoreName.USER]: userStore,
};
