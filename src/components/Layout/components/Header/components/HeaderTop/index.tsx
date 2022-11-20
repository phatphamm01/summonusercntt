import Router from 'next/router';
import { FC, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import Logo from '../Logo';
import IconLeft from './components/IconLeft';
import IconRight from './components/IconRight';

import isNullObject from '~/common/function/isNullObject';

import { storeSelector } from '~/store';

const HeaderTopContainer = styled.div`
  ${tw`md:pt-8 pt-14 text-2xl`}
`;
const NavExtra = styled.div`
  ${tw`flex justify-between md:mx-4 lg:mx-10 mx-20 text-xl font-medium`}
`;
const NavExtraLeft = styled.div`
  ${tw`flex gap-10`}
`;
const NavExtraRight = styled.div`
  ${tw`flex gap-10`}
`;

const HumburgerIcon = styled.div`
  ${tw`md:block hidden`}
`;
const WishlistIcon = styled.div`
  ${tw``}
`;
const CartIcon = styled.div`
  ${tw``}
`;

const UserDropdown = styled.div`
  ${tw`bg-white absolute shadow overflow-hidden h-0 invisible `}
`;

const height = keyframes`
  from {
    height: 0;
  }

  to {
    height: auto;
  }
`;

const UserIcon = styled.div`
  ${tw`md:hidden relative`}
  &:hover ${UserDropdown} {
    ${tw`visible opacity-100 pt-4 pb-2`}
    height: 80px;
    transition: all 200ms ease-in;
  }
`;

const UserDropdownItem = styled.p`
  ${tw`text-sm line-height[1] hover:bg-gray-100 pl-8 pr-12 py-4`}
`;

interface IHeaderTop {
  handleClickSearch: any;
}

const HeaderTop: FC<IHeaderTop> = ({ handleClickSearch }) => {
  const [user, wishlist, cart] = storeSelector((state) => [
    state.user,
    state.wishlist,
    state.cart,
  ]);

  const [overflowMenu, overflowUser] = storeSelector((state) => [
    state.overflowMenu,
    state.overflowMenu,
  ]);

  const handleClickMenuMobile = () => {
    storeSelector.getState().setOverflowMenu(!overflowMenu);
  };

  const handleOpenLogin = () => {
    if (!isNullObject(user)) {
      Router.push('/account');
      return;
    }

    storeSelector.getState().setOverflowUser(!overflowUser);
  };

  const handleLogout = useCallback(() => {
    storeSelector.getState().clearUser();
    Router.push('/');
  }, []);

  return (
    <HeaderTopContainer>
      <Logo width={230} height={50} />
      <NavExtra>
        <NavExtraLeft>
          <UserIcon>
            <IconLeft
              onClick={handleOpenLogin}
              title={isNullObject(user) ? 'Sign In' : 'My Account'}
              icon="/icon.svg#svgs-account"
            />
            {!isNullObject(user) && (
              <UserDropdown>
                <UserDropdownItem>Account</UserDropdownItem>
                <UserDropdownItem onClick={handleLogout}>
                  Logout
                </UserDropdownItem>
              </UserDropdown>
            )}
          </UserIcon>
          <HumburgerIcon>
            <IconLeft
              style={{ pointerEvents: overflowMenu ? 'none' : 'auto' }}
              onClick={() => handleClickMenuMobile()}
              href="/login"
              icon="/icon.svg#svgs-burger"
            />
          </HumburgerIcon>

          <IconLeft
            onClick={handleClickSearch}
            href="/help"
            title="Search"
            icon="/icon.svg#svgs-search"
          />
        </NavExtraLeft>
        <NavExtraRight>
          <WishlistIcon>
            <IconRight
              titleDropdown="Wishlist"
              data={wishlist}
              href="/wishlist"
              icon="/icon.svg#svgs-wish-main"
              title="Wishlist"
              itemCount={wishlist?.length || 0}
            />
          </WishlistIcon>
          <CartIcon>
            <IconRight
              titleDropdown="Cart"
              data={cart}
              href="/checkout/cart"
              icon="/icon.svg#svgs-bag"
              title="Shopping Bag"
              itemCount={cart?.length || 0}
            />
          </CartIcon>
        </NavExtraRight>
      </NavExtra>
    </HeaderTopContainer>
  );
};

export default HeaderTop;
