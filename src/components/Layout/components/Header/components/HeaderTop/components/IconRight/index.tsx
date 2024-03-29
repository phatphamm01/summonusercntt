import { FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import HoverDropdown from '../HoverDropdown';

import Link from '~/designs/Link';

import { IDropdown } from '~/store/ui/types';

const HoverDropdownBox = styled.div`
  ${tw`transition-all`}
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
`;

const IconRightContainer = styled.div`
  ${tw`relative z-[60]`}

  &:hover ${HoverDropdownBox} {
    visibility: visible;
    opacity: 100;
  }
`;
const IconLink = styled.a`
  ${tw`flex items-center gap-3`}
`;
const IconSVG = styled.svg`
  ${tw`bg-transparent fill-[transparent] h-9 w-9`}
`;
const IconTitle = styled.p`
  ${tw`md:hidden text-sm`}
`;
const ItemCount = styled.span`
  ${tw`block uppercase text-xs`}
`;

interface IIconRight {
  href: string;
  icon: string;
  title: string;
  itemCount: number;
  titleDropdown: string;
  data: IDropdown;
}

const IconRight: FC<IIconRight> = ({
  href,
  icon,
  title,
  itemCount,
  titleDropdown,
  data,
}) => {
  return (
    <IconRightContainer>
      <Link href={href}>
        <IconLink className="text-red-200">
          <IconSVG>
            <use href={icon}></use>
          </IconSVG>
          <IconTitle>
            {title}
            <ItemCount>{itemCount} ITEMS</ItemCount>
          </IconTitle>
        </IconLink>
      </Link>

      <HoverDropdownBox>
        <HoverDropdown title={titleDropdown} data={data} />
      </HoverDropdownBox>
    </IconRightContainer>
  );
};

export default IconRight;
