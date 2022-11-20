import { IStore } from '../type';
import {
  IAllProducts,
  IFacets,
  IProductDetail,
  IProductsByType,
} from './types';

import { IDataResponse } from '~/common/utils/axios/interface';

import { storeSelector } from '~/store';

import fetchProduct from '~/services/products';

interface IProductSlice {
  productsByType: IProductsByType;
  searchProduct: IProductsByType;
  allProducts: IAllProducts;
  facets: IFacets;
  productDetail: IProductDetail;
}

export const productStore: IStore<IProductSlice> = (set, get) => ({
  productsByType: [],
  getProductsByTypeApi: async (payload: string) => {
    storeSelector.getState().setLoading({ status: 'start' });
    const response: IDataResponse = await fetchProduct.getProductByType(
      payload
    );
    storeSelector.getState().setLoading({ status: 'end' });

    const { data } = response;

    set({ productsByType: data });
  },
  setProductsByType: (productsByType) => set({ productsByType }),

  searchProduct: [],
  getSearchProductApi: async (action) => {
    const response: IDataResponse = await fetchProduct.searchProduct(action);

    const { data } = response;

    set({ searchProduct: data });
  },
  setSearchProduct: (searchProduct) => set({ searchProduct }),

  allProducts: [],
  getAllProductsApi: async (action) => {
    const { payload } = action;
    const response: IDataResponse = await fetchProduct.getAllProduct(payload);

    const { data } = response;

    set({ allProducts: data });
  },
  setAllProducts: (allProducts) => set({ allProducts }),

  facets: [],
  getFacetsApi: async (action: any) => {
    const response: IDataResponse = await fetchProduct.getFacts(action);

    const { data } = response;

    set({ facets: data });
  },
  setFacets: (facets) => set({ facets }),

  productDetail: {},
  getProductDetailApi: async (payload) => {
    storeSelector.getState().setLoading({ status: 'start' });
    const response: IDataResponse = await fetchProduct.getProductDetail(
      payload
    );
    storeSelector.getState().setLoading({ status: 'end' });
    const { data } = response;

    set({ productDetail: data });
  },
  setProductDetail: (productDetail) => set({ productDetail }),
});
