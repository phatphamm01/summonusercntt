import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { commonStore } from './common';
import { productStore } from './product';
import { uiStore } from './ui';
import { userStore } from './user';

export const storeSelector = create<
  ReturnType<typeof commonStore> &
    ReturnType<typeof productStore> &
    ReturnType<typeof uiStore> &
    ReturnType<typeof userStore> & { clearUser: () => void }
>()(
  persist(
    devtools(
      (set, get) =>
        ({
          ...commonStore(set, get),
          ...productStore(set, get),
          ...uiStore(set, get),
          ...userStore(set, get),
          clearUser: () => set({ user: {}, wishlist: [], cart: [], bill: [] }),
        } as any)
    ),
    {
      name: 'store',
      getStorage: () => localStorage,
      partialize: (s) => ({ user: s.user, wishlist: s.wishlist, cart: s.cart }),
    }
  )
);
