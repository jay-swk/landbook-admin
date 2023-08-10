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

const CouponsGenerate = () => {
  const [item, setItem] = useState('');
  const couponTypeList = [
    { name: 'PREMIUM' },
    { name: 'PREMIUMBUNDLE' }
  ];

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card
        className="max-w-xl mx-auto"
        decoration="top"
        decorationColor="indigo"
      >
        <Metric className="mb-5">쿠폰 생성</Metric>

        <TextInput placeholder="count" className="mb-5" />
        <TextInput placeholder="expiredDate" className="mb-5" />
        <TextInput placeholder="value" className="mb-5" />
        <TextInput placeholder="couponCode" className="mb-5" />
        <TextInput placeholder="discountType" className="mb-5" />
        <TextInput placeholder="couponTrait" className="mb-5" />
        <SelectBox className="mb-5" onValueChange={(value) => setItem(value)}>
          {couponTypeList.map((key) => (
            <SelectBoxItem key={key.name}
              value={key.name as unknown as string}
              text={key.name}
            />
          ))}
        </SelectBox>
        <TextInput placeholder="name" className="mb-5" />
        <TextInput placeholder="contents" className="mb-5" />

        <Divider />

        <Button size="sm">
          생성
        </Button>
        
      </Card>
    </div>
  );
};

export default CouponsGenerate;
