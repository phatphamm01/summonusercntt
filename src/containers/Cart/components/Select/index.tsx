import useToggleAndCloseVer2 from "@hooks/useToggleAndCloseVer2";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const SelectContainer = styled.div`
  ${tw`w-[42px]`}
`;
const SelectBox = styled.div`
  ${tw`relative text-sm`}
`;
const SelectedBox = styled.div<{ isOpen: boolean }>`
  ${tw`flex items-center pl-5 py-4 border-t border-l border-r border-gray-600`}
  ${({ isOpen }) => (!isOpen ? tw`border-b` : tw`border-b-0`)};
  &::before {
    ${tw`border-l-2 border-b-2  border-black-lv3`}
    content: "";
    position: absolute;
    height: 5px;
    aspect-ratio: 1/1;

    transform: rotate(-45deg);

    right: 8px;
  }
`;
const Selected = styled.div`
  ${tw`text-black-lv2 font-medium`}
`;
const SelectListBox = styled.div`
  ${tw``}
`;
const SelectList = styled.ul`
  ${tw`absolute w-full bg-white border  border-gray-600 z-20`}
`;
const SelectItem = styled.li`
  ${tw`py-1 pl-5 text-xs text-black-lv2 hover:bg-gray-200`}
`;

interface ISelect {}

const Select: FC<ISelect> = () => {
  const ref = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useToggleAndCloseVer2(ref);
  const [selected, setSelected] = useState<{ id: number; value: number }>();

  useEffect(() => {
    setSelected(data[0]);
  }, []);

  const handleSelect = (value: { id: number; value: number }) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectBox>
        <SelectedBox isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <Selected>{selected?.value}</Selected>
        </SelectedBox>
        <SelectListBox>
          {isOpen && (
            <SelectList ref={ref}>
              {data.map(
                (value) =>
                  value.id !== selected?.id && (
                    <SelectItem
                      key={value.id}
                      onClick={() => handleSelect(value)}
                    >
                      {value.value}
                    </SelectItem>
                  )
              )}
            </SelectList>
          )}
        </SelectListBox>
      </SelectBox>
    </SelectContainer>
  );
};

export default Select;

let data = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 2,
  },
  {
    id: 3,
    value: 3,
  },
  {
    id: 4,
    value: 4,
  },
  {
    id: 5,
    value: 5,
  },
  {
    id: 6,
    value: 6,
  },
  {
    id: 7,
    value: 7,
  },
  {
    id: 8,
    value: 8,
  },
  {
    id: 9,
    value: 9,
  },
  {
    id: 10,
    value: 10,
  },
];
