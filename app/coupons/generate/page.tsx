'use client';

import {
  Card,
  TextInput,
  Button,
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
    { name: 'PREMIUM', value: 'PREMIUM' },
    { name: 'PREMIUMBUNDLE', value: 'PREMIUMBUNDLE' }
  ];
  const discountTypeList = [
    { name: '퍼센트 할인', value: 'PERCENTAGE' },
    { name: '가격 할인', value: 'AMOUNT' }
  ];
  const couponTraitList = [
    { name: '공용', value: 'PUBLIC' },
    { name: '개인', value: 'PRIVATE' }
  ];

  const [couponData, setCouponData] = useState({
    count: 0,
    expiredDate: '',
    value: 0,
    couponCode: null as string | null,
    discountType: '',
    couponTrait: '',
    couponType: '',
    prefix: '',
    name: '',
    contents: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCouponData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isCouponDataValid = () => {
    // Perform validation here
    return (
      couponData.count > 0 &&
      couponData.expiredDate !== '' &&
      couponData.value > 0 &&
      (couponData.couponCode !== '' || couponData.prefix !== '') &&
      couponData.discountType !== '' &&
      couponData.couponTrait !== '' &&
      couponData.couponType !== '' &&
      couponData.name !== '' &&
      couponData.contents !== ''
    );
  };

  const onSubmit = async () => {
    const session = await getSession(); // client side use, https://next-auth.js.org/getting-started/client#getsession
    const user = session?.user as any;

    if (!isCouponDataValid()) {
      alert('Invalid coupon data');
      return;
    }

    if (couponData.couponCode === '' || couponData.prefix !== '') {
      couponData.couponCode = null
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/admin/coupons`,
        JSON.stringify(couponData),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        //setOrder(response.data);
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
        <Metric className="mb-5">쿠폰 생성</Metric>
        <SelectBox 
          placeholder="쿠폰 구분" 
          className="mb-5" 
          onValueChange={(value) => handleSelectChange("couponTrait", value)}
        >
          {couponTraitList.map((key) => (
            <SelectBoxItem key={key.value}
              value={key.value as unknown as string}
              text={key.name}
            />
          ))}
        </SelectBox>
        <SelectBox 
          placeholder="쿠폰 종류" 
          className="mb-5" 
          onValueChange={(value) => handleSelectChange("couponType", value)}
        >
          {couponTypeList.map((key) => (
            <SelectBoxItem key={key.value}
              value={key.value as unknown as string}
              text={key.name}
            />
          ))}
        </SelectBox>
        <SelectBox 
          placeholder="할인 유형" 
          className="mb-5" 
          onValueChange={(value) => handleSelectChange("discountType", value)}
        >
          {discountTypeList.map((key) => (
            <SelectBoxItem key={key.value}
              value={key.value as unknown as string}
              text={key.name}
            />
          ))}
        </SelectBox>
        <TextInput 
          placeholder="할인 가격" 
          className="mb-5" 
          inputMode="numeric"
          name="value"
          onChange={handleInputChange}
        />
        <TextInput 
          placeholder="개수" 
          className="mb-5" 
          inputMode="numeric"
          name="count"
          onChange={handleInputChange}
        />
        <TextInput 
          placeholder="만료기간 E.g. 2023-09-31" 
          className="mb-5" 
          inputMode="numeric"
          name="expiredDate"
          onChange={handleInputChange}
        />
        <TextInput 
          placeholder="쿠폰 코드" 
          className="mb-5"
          name="couponCode"
          onChange={handleInputChange}
        />
        <TextInput 
          placeholder="쿠폰 코드 접두어 (접두어 입력 시 접두어 기준으로 생성)" 
          className="mb-5"
          name="prefix"
          onChange={handleInputChange}
        />
        <TextInput 
          placeholder="쿠폰 이름 E.g. AI 건축분석 할인쿠폰" 
          className="mb-5"
          name="name"
          onChange={handleInputChange}
        />
        <TextInput 
          placeholder="쿠폰 내용 E.g. 30000원 할인" 
          className="mb-5"
          name="contents"
          onChange={handleInputChange}
        />
        <Divider />
        <Button size="sm" onClick={onSubmit}>
          생성
        </Button>
      </Card>
    </div>
  );
};

export default CouponsGenerate;
