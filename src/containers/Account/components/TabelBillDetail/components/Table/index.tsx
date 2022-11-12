import moment from 'moment';
import { FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IBillList } from '~/store/user/types';

const TableContainer = styled.table`
  ${tw`w-full`}
`;

const Header = styled.tr`
  ${tw``}
`;
const HeaderItem = styled.th`
  ${tw`py-4 px-4 border border-gray-400 bg-green-400 text-white font-semibold text-sm`}
`;

const Tr = styled.tr`
  ${tw``}
`;

const Td = styled.td`
  ${tw`py-4 px-4 border border-gray-400 `}
`;

interface IItem {
  data: IBillList;
}

const Table: FC<IItem> = ({ data }) => {
  return (
    <TableContainer>
      <Header>
        <HeaderItem>ID1</HeaderItem>
        <HeaderItem>Amout</HeaderItem>
        <HeaderItem>Quantity</HeaderItem>
        <HeaderItem>Create At</HeaderItem>
        <HeaderItem>Action</HeaderItem>
      </Header>
      {data.map((value) => {
        let date = moment(Date.parse(value.createAt + '')).format(
          'MMMM Do YYYY, h:mm:ss a'
        );

        return (
          <Tr key={value._id}>
            <Td>{value._id}</Td>
            <Td>{value.amount}</Td>
            <Td>{value.quantity}</Td>
            <Td>{date}</Td>
            <Td className="font-semibold">Detail</Td>
          </Tr>
        );
      })}
    </TableContainer>
  );
};

export default Table;
