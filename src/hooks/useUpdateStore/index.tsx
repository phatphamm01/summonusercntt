import { useEffect } from 'react';

import { storeSelector } from '~/store';

import { StateStore } from '~/types/nextjs';

export const useUpdateStore = (values: StateStore) => {
  useEffect(() => {
    storeSelector.setState(values);
  }, [values]);
};
