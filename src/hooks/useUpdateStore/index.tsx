import { useEffect } from 'react';
import { store } from '~/store/index';
import { IStoreProps } from '~/store/type';

export const useUpdateStore = (values: IStoreProps[]) => {
  useEffect(() => {
    values.forEach((value) => {
      store[value.type].setState(value.data);
    });
  }, [values]);
};
