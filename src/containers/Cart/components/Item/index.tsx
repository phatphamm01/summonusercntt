import { FC, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Select from '../Select';
import Button from '~/designs/Button';
import IconSVG from '~/designs/IconSVG';
import { userStore } from '~/store/user';
import { ICart, IWish } from '~/store/user/types';
import fetchCart from '~/services/cart';
import fetchWishlist from '~/services/wishlist';

const ItemContainer = styled.div`
  ${tw`py-8`}
`;
const ItemBox = styled.div`
  ${tw`flex gap-10`}
`;
const ImageBox = styled.div`
  ${tw`h-80 w-80 p-4 shadow rounded`}
`;
const ItemMain = styled.div`
  ${tw`flex-grow flex flex-col`}
`;
const Image = styled.img`
  ${tw`h-full w-full object-cover block`}
`;
const Design = styled.h3`
  ${tw`font-semibold text-base`}
`;
const IdProdcut = styled.p`
  ${tw` text-xs`}
`;
const Name = styled.p`
  ${tw`text-xs `}
`;
const Price = styled.p`
  ${tw`font-bold text-4xl text-gray-600 [line-height:1]`}
`;
const InfoBox = styled.div`
  ${tw`flex justify-between items-center flex-grow`}
`;

const ControlBox = styled.div`
  ${tw`flex gap-6`}
`;
const ButtonContent = styled.div`
  ${tw`flex justify-center items-center gap-4`}
`;
const ButtonText = styled.span`
  ${tw`sm:hidden`}
`;
const ButtonWrraper = styled(Button)`
  ${tw``}

  &:hover * {
    color: white;
  }
`;
const HeartBox = styled.div<{ isCheck?: boolean }>`
  ${({ isCheck = false }) =>
    isCheck &&
    css`
      color: transparent !important;
      use {
        fill: #ff3f3f !important;
      }
    `}
  &:hover {
    color: transparent !important;
    use {
      fill: #ff8484;
    }
  }
`;

interface IItem {
  data: ICart;
}

const Item: FC<IItem> = ({ data }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const wishlist = userStore((s) => s.wishlist);

  const handleCheckIsLike = useCallback(
    (id: string) => {
      if (!(wishlist && wishlist.length > 0)) return false;

      let index = wishlist.findIndex((value: IWish) => value._id === id);

      if (index === -1) return false;
      return true;
    },
    [wishlist]
  );

  useEffect(() => {
    let checkIsLike = handleCheckIsLike(data?.idProduct!);

    setIsLike(checkIsLike);
  }, [data?.idProduct, handleCheckIsLike, wishlist]);

  const handleAddWishlist = () => {
    setIsLike(!isLike);

    addWishlistApi();
  };

  const addWishlistApi = async () => {
    let payload = {
      product: data.idProduct!,
    };
    const wishlist = await fetchWishlist.add(payload);
    userStore.getState().setWishlist(wishlist);
  };

  const handleDelete = () => {
    callDeleteApi(data._id);
  };

  const callDeleteApi = async (id: string) => {
    const cart = await fetchCart.deleteCart({ id });
    userStore.getState().setCart(cart);
  };

  return (
    <ItemContainer>
      <ItemBox>
        <ImageBox>
          <Image src={data.imageCovers[0]} />
        </ImageBox>
        <ItemMain>
          <Design>{data.name}</Design>
          <IdProdcut>
            Product number:{' '}
            {data.variants.sizeId ? data.variants.sizeId : 'Default'}
          </IdProdcut>
          <Name>{data.name}</Name>
          <InfoBox>
            <Price>${data.price * data.quantity}</Price>
            <Select data={data} />
          </InfoBox>
          <ControlBox>
            <ButtonWrraper variant="outlined" onClick={() => handleDelete()}>
              <ButtonContent>
                <IconSVG iconHref="/icon.svg#svgs-bin" />
                <ButtonText>Remove</ButtonText>
              </ButtonContent>
            </ButtonWrraper>
            <ButtonWrraper variant="outlined" hoverColor="#00883d">
              <ButtonContent onClick={handleAddWishlist}>
                <HeartBox isCheck={isLike}>
                  <IconSVG iconHref="/icon.svg#svgs-wishlist" />
                </HeartBox>
                <ButtonText>{isLike ? 'Remove' : 'Add'} Wishlist</ButtonText>
              </ButtonContent>
            </ButtonWrraper>
          </ControlBox>
        </ItemMain>
      </ItemBox>
    </ItemContainer>
  );
};

export default Item;
