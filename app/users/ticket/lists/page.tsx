'use client';

import { Card, TextInput, Button, Divider, SelectBox, SelectBoxItem } from '@tremor/react';
import { useRef, useState } from 'react';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import GetTicketLists from './getTicketLists';
import { Tickets } from '../../../interface/tickets';

const IndexPage = () => {
  const userId = useRef('');
  const [status, setStatus] = useState('');
  const [tickets, setTickets] = useState<Tickets[]>([]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };
  
  const onSubmit = async () => {
    const session = await getSession(); // client side use, https://next-auth.js.org/getting-started/client#getsession
    const user = session?.user as any;
    
    if (!userId.current) {
      alert('userId를 입력해주세요.'); // 경고 메시지 표시
      return;
    }
    if (!status) {
      alert('status를 선택해주세요.'); // 경고 메시지 표시
      return;
    }

    axios.get('http://localhost:8888/payment/admin/tickets', {
      params: {
        userId: userId.current,
        status: status
      },
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      setTickets(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    
  };

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6 max-w-md">
        <TextInput className="mb-5" placeholder="userId" onChange={(e) => (userId.current = e.target.value)} />
        <SelectBox onValueChange={(value) => handleStatusChange(value)}>
          <SelectBoxItem value='AVAILABLE' text='이용가능' />
          <SelectBoxItem value='USED' text='사용완료' />
        </SelectBox>
        <Divider />
        <Button size="sm" onClick={onSubmit}>
          조회
        </Button>
      </Card>
      <Card className="mt-6">
        <GetTicketLists tickets={tickets} />
      </Card>
    </div>
  );
}

export default IndexPage;