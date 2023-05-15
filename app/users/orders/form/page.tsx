'use client';

import {
  Text,
  Card,
  TextInput,
  Button,
  Toggle,
  ToggleItem,
  Divider,
  Metric,
  SelectBox,
  SelectBoxItem
} from '@tremor/react';
import { useRef, useState } from 'react';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { Tickets } from '../../../interface/tickets';

const OrderFormPage = () => {
  const userId = useRef('');
  const [item, setItem] = useState('');
  const [order, setOrder] = useState<Object[]>([]) as any;

  const itemList = [
    { name: 'AI 건축분석 이용권 1회', id: 5 },
    { name: 'AI 건축분석 이용권 3회', id: 6 },
    { name: 'AI 건축분석 이용권 5회', id: 7 },
    { name: 'AI 건축분석 이용권 10회', id: 8 },
    { name: 'AI 건축분석 이용권 50회', id: 9 },
    { name: 'AI 건축분석 이용권 100회', id: 10 }
  ];

  const onSubmit = async () => {
    const session = await getSession(); // client side use, https://next-auth.js.org/getting-started/client#getsession
    const user = session?.user as any;

    if (!userId.current) {
      alert('userId를 입력해주세요.'); // 경고 메시지 표시
      return;
    }

    if (!item) {
      alert('상품을 선택해주세요.'); // 경고 메시지 표시
      return;
    }

    const requestData = {
      itemId: item
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/orders/${userId.current}`,
        JSON.stringify(requestData),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const orderCompleteFree = async () => {
    const session = await getSession(); // client side use, https://next-auth.js.org/getting-started/client#getsession
    const user = session?.user as any;

    const requestData = {
      'order': {
        'status': 'COMPLETED',
        'orderedPrice': 0
      }
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/orders/${order.orderId}`,
        JSON.stringify(requestData),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card
        className="max-w-xl mx-auto"
        decoration="top"
        decorationColor="indigo"
      >
        <Metric className="mb-5">Order 생성</Metric>
        <TextInput
          className="mb-5"
          placeholder="userId"
          onChange={(e) => (userId.current = e.target.value)}
        />
        <SelectBox onValueChange={(value) => setItem(value)}>
          {itemList.map((key) => (
            <SelectBoxItem key={key.id}
              value={key.id as unknown as string}
              text={key.name}
            />
          ))}
        </SelectBox>
        <Divider />
        <Button size="sm" onClick={onSubmit}>
          생성
        </Button>
        <Card
          className="mt-6"
          style={
            order.length === 0 ? { display: 'none' } : { display: 'block' }
          }
        >
          <div>
            <Text>orderId : {order.orderId}</Text>
            <Text>count : {order.count}</Text>
            <Text>orderedPrice : {order.orderedPrice}</Text>
            <Text>discount : {order.discount}</Text>
            <Text>price : {order.price}</Text>
            <Text>sttus: {order.status}</Text>
            <Button onClick={orderCompleteFree}>주문완료 처리 (0원)</Button>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default OrderFormPage;
