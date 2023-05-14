'use client';

import { Text, Card, TextInput, Button, Toggle, ToggleItem, Divider, Metric } from '@tremor/react';
import { useRef, useState } from 'react';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { Tickets } from '../../../interface/tickets';

const TicketFormPage = () => {
  const userId = useRef('');
  const orderId = useRef('');
  const [initial, setInitial] = useState('');
  const [tickets, setTickets] = useState<Object[]>([]);

  const onSubmit = async () => {
    const session = await getSession(); // client side use, https://next-auth.js.org/getting-started/client#getsession
    const user = session?.user as any;

    if (!userId.current) {
      alert('userId를 입력해주세요.'); // 경고 메시지 표시
      return;
    }
    if (!orderId.current) {
      alert('orderId를 입력해주세요.'); // 경고 메시지 표시
      return;
    }

    const requestData = {
      userId: userId.current,
      orderId: orderId.current,
      initial: initial
    };

    axios
      .post(
        'http://localhost:8888/payment/admin/tickets',
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
        setTickets(response.data);
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
        <Metric className="mb-5">Ticket 생성</Metric>

        <TextInput
          className="mb-5"
          placeholder="userId"
          onChange={(e) => (userId.current = e.target.value)}
        />
        <TextInput
          className="mb-5"
          placeholder="orderId"
          onChange={(e) => (orderId.current = e.target.value)}
        />
        <Toggle
          color="zinc"
          defaultValue="true"
          onValueChange={(value) => setInitial(value)}
        >
          <ToggleItem value="true" text="상품 티켓 갯수 생성" style={{marginRight: "1rem"}}/>
          <ToggleItem value="false" text="티켓 1개 생성" />
        </Toggle>
        <Divider />
        <Button size="sm" onClick={onSubmit}>
          생성
        </Button>
        <Card
          className="mt-6"
          style={
            tickets.length === 0 ? { display: 'none' } : { display: 'block' }
          }
        >
          {tickets.map((ticketId: any) => (
            <Text key={ticketId}>{ticketId}</Text>
          ))}
        </Card>
      </Card>
    </div>
  );
};

export default TicketFormPage;
