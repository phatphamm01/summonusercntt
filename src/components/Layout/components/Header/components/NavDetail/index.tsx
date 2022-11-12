import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import NavImage from './components/NavImage';
import Link from '~/designs/Link';
import { ICategory } from '~/store/common/types';

const CategoryContainer = styled.div`
  ${tw`w-full`}
`;
const CategoryBox = styled.div`
  ${tw`container mx-auto grid grid-cols-4 xl:px-4 px-40 `}
`;
const NavDetailContainer = styled.div`
  ${tw`absolute top-[100%] left-0 right-0`}

  height: 400px;
  overflow: hidden;
  background: linear-gradient(180deg, #f6f6f6 0, #fff 4em, #fff);
`;
const NavTitle = styled.p`
  ${tw`text-xl font-medium mb-8`}
`;
const NavList = styled.a`
  ${tw`block align-top whitespace-normal`}
`;
const CategoryLevel2 = styled.div`
  ${tw`not-last:pt-20 before:bg-gray-300 relative`}

  &:not(:last-child):before {
    content: '';
    position: absolute;
    height: 300px;
    width: 1px;
    left: -2.5rem;
  }
`;
const CategoryLevel3 = styled.a`
  ${tw`block break-words [line-height:1.1] text-xl`}
`;

interface INavDetail {
  data?: Array<ICategory>;
}

type ILength = {
  id: string;
  len: number;
  start: number;
  end: number;
  span: string;
};

interface IDataUI {
  category1: number;
  category2: Array<ILength>;
}

const LENGTH_CATEGORY = 14;

const NavDetail: FC<INavDetail> = ({ data }) => {
  const [lengthCategoryLevel1, setLengthCategoryLevel1] = useState<any>();
  const [lengthCategoryLevel2, setLengthCategoryLevel2] =
    useState<Array<ILength>>();

  const [column, setColumn] = useState<number>(0);

  const handleDataUI = useCallback((): IDataUI | undefined => {
    if (!data) return undefined;

    let category1 = data.length;
    let category2 = data.reduce((result: any, value: ICategory) => {
      let length = (value && value.children && value.children.length) || 0;
      let div = divide(length, LENGTH_CATEGORY);
      let residuals = length - div * LENGTH_CATEGORY;
      let isLessThan = residuals < LENGTH_CATEGORY && residuals !== 0 ? 1 : 0;

      return [
        ...result,
        {
          id: value._id,
          len: div === 0 ? isLessThan : div + isLessThan,
        },
      ];
    }, []);

    category2 = category2.reduce(
      (result: Array<ILength>, value: { id: string; len: number }) => {
        if (result.length === 0) {
          return [
            {
              ...value,
              start: 1,
              end: value.len + 2,
              span: `1 / ${value.len + 2}`,
            },
          ];
        }

        if (result && result.at(result.length - 1)) {
          let start = result.at(result.length - 1)?.end || 0;
          let end = start + value.len + 1;
          return [
            ...result,
            {
              ...value,
              start: start,
              end: end,
              span: `${start} / ${end}`,
            },
          ];
        }
      },
      []
    );

    return {
      category1: category1,
      category2: category2,
    };
  }, [data]);

  useEffect(() => {
    let result = handleDataUI();

    if (!result) return;

    setLengthCategoryLevel1(result.category1);
    setLengthCategoryLevel2(result.category2);
    setColumn(
      result.category2.reduce(
        (result: number, value: ILength) => result + value.len + 1,
        0
      ) + 2
    );
  }, [handleDataUI]);

  const divide = (divisor: number, divider: number) => {
    return (divisor - (divisor % divider)) / divider;
  };

  const handleChunkArray = (
    inputArray: Array<any> | undefined,
    perChunk: number
  ) => {
    var result =
      inputArray &&
      inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
    return result;
  };

  const handleColumn = (id: string) => {
    let item = lengthCategoryLevel2?.find((value) => value.id === id);

    return item?.span;
  };

  return (
    <NavDetailContainer>
      <CategoryContainer>
        <CategoryBox
          style={{
            gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
          }}
        >
          {data &&
            data?.map((categoryLevel2) => (
              <CategoryLevel2
                key={categoryLevel2._id}
                style={{
                  gridColumn: `${handleColumn(categoryLevel2._id)}`,
                }}
              >
                <Link
                  href={`/category/${categoryLevel2._id}/${categoryLevel2.slug}`}
                >
                  <NavTitle>{categoryLevel2.name}</NavTitle>
                </Link>
                <div style={{ display: 'flex', gap: '30px' }}>
                  {handleChunkArray(
                    categoryLevel2?.children,
                    LENGTH_CATEGORY
                  )?.map(
                    (listCategoryLevel3: Array<ICategory>, index: number) => (
                      <div key={index}>
                        {listCategoryLevel3?.map(
                          (categoryLevel3: ICategory) => (
                            <span key={categoryLevel3._id}>
                              <Link
                                href={`/category/${categoryLevel3._id}/${categoryLevel3.slug}`}
                              >
                                <NavList>{categoryLevel3.name}</NavList>
                              </Link>
                            </span>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </CategoryLevel2>
            ))}
          <CategoryLevel2
            style={{
              gridColumn: `${column - 1} / ${column}`,
            }}
          >
            <CategoryLevel3>
              <NavImage />
            </CategoryLevel3>
          </CategoryLevel2>
        </CategoryBox>
      </CategoryContainer>
    </NavDetailContainer>
  );
};

export default NavDetail;
