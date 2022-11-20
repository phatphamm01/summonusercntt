import { FC, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Table from './components/Table';

import { storeSelector } from '~/store/index';

const TableBillContainer = styled.div`
  ${tw`w-full text-center mt-10`}
`;
const Title = styled.span`
  ${tw`text-3xl font-semibold`}
`;
const TableContainer = styled.div`
  ${tw`mt-10`}
`;

interface ITableBill {}

const TableBill: FC<ITableBill> = () => {
  const bill = storeSelector((state) => state.bill);

  useEffect(() => {
    storeSelector.getState().getBillApi();
  }, []);

  return (
    <TableBillContainer>
      <Title>My Order</Title>
      <TableContainer>
        <Table data={bill} />
      </TableContainer>
    </TableBillContainer>
  );
};

export default TableBill;
