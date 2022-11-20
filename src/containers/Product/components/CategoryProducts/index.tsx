import { FC, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import ProductCard from '~/components/ProductCard';

import { storeSelector } from '~/store';
import { IProduct } from '~/store/product/types';
import { IWish } from '~/store/user/types';

const CategoryProductContainer = styled.div`
  ${tw``}
`;

const CategoryProductList = styled.ul`
  ${tw`grid grid-cols-3 md:grid-cols-2 gap-y-8`}
`;
const CategoryProductItem = styled.li`
  ${tw`text-center`}
`;

const NotFound = styled.div`
  ${tw`text-center`}
`;
const NotFoundMessage = styled.h3`
  ${tw`text-4xl`}
`;
interface ICategoryProduct {
  products?: Array<IProduct>;
  gapX: number;
}

const CategoryProduct: FC<ICategoryProduct> = ({ products, gapX }) => {
  const wishlist = storeSelector((state) => state.wishlist);

  const handleCheckIsLike = useCallback(
    (id: string) => {
      if (!(wishlist && wishlist.length > 0)) return;

      let index = wishlist.findIndex((value: IWish) => value._id === id);

      if (index === -1) return false;
      return true;
    },
    [wishlist]
  );

  return (
    <CategoryProductContainer>
      <CategoryProductList className={`gap-x-${gapX}`}>
        {products &&
          products?.map((value) => (
            <CategoryProductItem key={value._id}>
              <ProductCard
                isCheck={handleCheckIsLike(value._id)}
                data={value}
              />
            </CategoryProductItem>
          ))}
      </CategoryProductList>
    </CategoryProductContainer>
  );
};

export default CategoryProduct;
