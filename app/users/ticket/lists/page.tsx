'use client';

import { Title, Text, Card, TextInput, Button, Divider } from '@tremor/react';
import { useRef } from 'react';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';

export default async function IndexPage() {
  const userId = useRef("");
  const status = useRef("");
  
  const onSubmit = async () => {
    const session = await getSession(); // client side use, https://next-auth.js.org/getting-started/client#getsession
    const user = session?.user as any;
    console.log(user);

    // const res = await fetch("https://dev-api2.landbook.me/payment/admin/tickets", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `bearer ${user.token}`
    //   },
    //   body: JSON.stringify({
    //     "userId": userId,
    //     "status": [status]
    //   })
    // });
    // const data = await res.json();

    axios.get('http://localhost:8888/payment/admin/tickets', {
      params: {
        userId: userId.current,
        status: status.current
      },
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    
  };

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* <Search /> */}
      <Card className="mt-6">
        <TextInput className="mb-5" placeholder="userId" onChange={(e) => (userId.current = e.target.value)} />
        <TextInput className="mb-5" placeholder="status" onChange={(e) => (status.current = e.target.value)} />
        <Divider />
        <Button size="sm" onClick={onSubmit}>
          조회
        </Button>
      </Card>
    </div>
  );
}

