import { toast } from 'react-toastify';

import { IStore } from '../type';
import { IBillList, ICartList, IUser, IWishlist } from './types';

import { IDataResponse } from '~/common/utils/axios/interface';

import fetchCart from '~/services/cart';
import fetchWishlist from '~/services/wishlist';

interface IUserSlice {
  user: IUser;
  wishlist: IWishlist;
  cart: ICartList;
  bill: IBillList;
}

export const userStore: IStore<
  IUserSlice,
  'addCart' | 'updateCart' | 'deleteCart' | 'addBill' | 'addWishlist',
  'user'
> = (set, get) => ({
  user: {},
  setUser: (user) => set({ user }),

  wishlist: [],
  getWishlistApi: async () => {
    const response: IDataResponse = await fetchWishlist.get();
    const { data } = response;
    const handleData = data.products?.map(
      (value: { product: any }) => value.product
    );

    set({ wishlist: handleData });
  },
  setWishlist: (wishlist) => set({ wishlist }),

  cart: [],
  getCartApi: async () => {
    const response: IDataResponse = await fetchCart.get();

    const { data } = response;
    const dataFormat = handleData(data);

    set({ cart: dataFormat });
  },
  setCart: (cart) => set({ cart }),

  bill: [],
  getBillApi: async () => {
    const response: IDataResponse = await fetchCart.getBill();

    const { data } = response;

    if (!data) {
      toast.error(response);
      return;
    }

    set({ bill: data });
  },
  setBill: (bill) => set({ bill }),

  addCartApi: async (action: any) => {
    const response: IDataResponse = await fetchCart.add(action);
    const { data, status } = response;

    if (!data) {
      toast.error(response);
      return;
    }

    toast.success(status);

    const dataFormat = handleData(data);

    set({ cart: dataFormat });
  },
  updateCartApi: async (action: any) => {
    const response: IDataResponse = await fetchCart.updateQuantity(action);
    const { data, status } = response;

    if (!data) {
      toast.error(response);
      return;
    }

    toast.success(status);
    const dataFormat = handleData(data);

    set({ cart: dataFormat });
  },

  deleteCartApi: async (action: any) => {
    const response: IDataResponse = await fetchCart.deleteCart(action);
    const { data, status } = response;

    if (!data) {
      toast.error(response);
      return;
    }

    toast.success(status);
    const dataFormat = handleData(data);

    set({ cart: dataFormat });
  },
  addBillApi: async (action: any) => {
    const response: IDataResponse = await fetchCart.addBill(action);

    const { data, status } = response;

    if (status !== 'Success') {
      toast.error(response);
      return;
    }

    toast.success(status);
    set({ bill: data });
  },
  addWishlistApi: async (action: any) => {
    const response: IDataResponse = await fetchWishlist.add(action);

    const { data, status } = response;

    if (!data) {
      toast.error(response);
      return;
    }

    const handleData = data.products?.map(
      (value: { product: any }) => value.product
    );

    toast.success(status);
    set({ wishlist: handleData });
  },
});

const handleData = (action: any) => {
  if (action.items.length < 0) {
    return;
  }
  const handleData = action.items?.map((value: any) => ({
    ...value.data,
    _id: value.data.variants._id,
    id: value.data._id,
    idProduct: value.data._id,
    idVariant: value.data.variants.sizeId,
    price: value.data.variants.price,
    quantity: value.quantity,
  }));

  return handleData;
};
