import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from '@paypal/react-paypal-js';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { userStore } from '~/store/user';
import { ICartList } from '~/store/user/types';
import fetchCart from '~/services/cart';

const PaypalContainer = styled.div`
  ${tw`z-0`}

  & * {
    z-index: 0;
  }
`;

interface IPaypal {
  price: string;
  data: ICartList;
}

export interface Amount {
  currency_code?: string;
  value: string;
}
export type PurchaseItem = {
  name: string;
  quantity: string;
  unit_amount: Amount;
  tax?: Amount;
  description?: string;
  sku?: string;
  category?: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION';
};

const Paypal: FC<IPaypal> = ({ price, data }) => {
  const [dataItem, setDataItem] = useState<{
    data: PurchaseItem[];
    quantity: number;
  }>();
  // const [dataPaypal, setDataPaypal] = useState<any>();
  const dataPaypal = useRef<any>();

  const handleItemList = useCallback(() => {
    let resultData = data?.map((value) => ({
      name: value.name,
      quantity: value.quantity + '',
      sku: value.variants._id,
      unit_amount: {
        currency_code: 'USD',
        value: value.price + '',
      },
    }));

    let quantity = resultData.reduce(
      (result, value) => result + Number(value.quantity),
      0
    );

    return {
      data: resultData,
      quantity: quantity,
    };
  }, [data]);

  useEffect(() => {
    setDataItem(handleItemList());
  }, [handleItemList]);

  const handleDataSuccess = () => {
    let quantityTotal = dataItem?.data.reduce(
      (result, value) => result + Number(value.quantity),
      0
    );

    return {
      shipping_address: dataPaypal?.current?.shipping_address,
      data: dataItem?.data,
      quantityTotal: quantityTotal,
      total: price,
    };
  };

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    createOrder(data, actions) {
      return actions.order.create({
        intent: 'CAPTURE',

        purchase_units: [
          {
            items: dataItem?.data,
            amount: {
              value: price + '',
              currency_code: 'USD',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: price + '',
                },
              },
            },
          },
        ],
      });
    },
    onError(err) {
      console.log(err);
    },
    onShippingChange(data, actions) {
      dataPaypal.current = data;

      return actions.resolve();
    },
    onApprove(data, actions) {
      return actions.order.capture().then(async (details) => {
        const bills = await fetchCart.addBill(handleDataSuccess());
        if (bills) {
          userStore.getState().setCart([]);
        }
      });
    },
  };

  return (
    <PaypalContainer>
      <PayPalScriptProvider
        options={{
          components: 'buttons',
          currency: 'USD',
          'client-id':
            'AUYYe_jA-9FTUNZF-UFRISfMvUAnKTzxAb1pELVDW36PaFFvg_a3YXGJfgrc32USF79FL3C59jTluzvc',
        }}
      >
        <PayPalButtons
          {...paypalbuttonTransactionProps}
          style={{ layout: 'horizontal' }}
        />
      </PayPalScriptProvider>
    </PaypalContainer>
  );
};

export default Paypal;
