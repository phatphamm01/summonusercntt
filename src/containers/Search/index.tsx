import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import CategoryProduct from './components/CategoryProducts';

import Layout from '~/components/Layout';

import { storeSelector } from '~/store/index';

const ProductContainer = styled.div<{ isActive: boolean }>`
  ${tw`container lg:max-w-full mx-auto xl:px-4 lg:mt-10 px-20 `}
  ${({ isActive }) => (isActive ? tw`hidden` : tw`block`)}
`;

const ProductMain = styled.div`
  ${tw`sm:mx-10 lg:mx-20 mx-40 gap-x-20 lg:gap-x-0 gap-y-4`}
`;

const CategoryProductContainer = styled.div`
  ${tw`col-span-3`}
`;
const Title = styled.div`
  ${tw`text-center text-5xl mb-14`}
`;

interface IProduct {}

const GAPCOMMON = 20;

const Product: FC<IProduct> = () => {
  const { query } = useRouter();
  const [isActive, setActive] = useState<boolean>(false);
  const data = storeSelector((state) => state.searchProduct);

  let { key } = query;

  useEffect(() => {
    if (key) {
      handleData();
    }
  }, [key, query]);

  const handleData = () => {
    if (!key) return;

    let _key = '';

    if (typeof key === 'string') {
      _key = key;
      getDataApi(_key);
      return;
    }
    getDataApi(_key[0]);
  };

  const getDataApi = (key: string) => {
    storeSelector.getState().getSearchProductApi?.({ key: key });
  };

  return (
    <Layout>
      <ProductContainer isActive={isActive}>
        <Title>Search results found for {`"${key}"`}</Title>
        <ProductMain>
          <CategoryProductContainer>
            <CategoryProduct gapX={GAPCOMMON} products={data} />
          </CategoryProductContainer>
        </ProductMain>
      </ProductContainer>
    </Layout>
  );
};

export default Product;
