import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // const users = [await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'name', 'username', 'email'])
  //   .where('name', 'like', `%${search}%`)
  //   .execute();]
  const users = [
    {"name": "Jay", "username": "장근식", "email": "jay@spacewalk.tech"}
  ]

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Landbook Admin ver 1.0.0</Title>
      <Text>
        by jay
      </Text>
      {/* <Search /> */}
      {/* <Card className="mt-6"> */}
        {/* @ts-expect-error Server Component */}
        {/* <UsersTable users={users} /> */}
      {/* </Card> */}
    </main>
  );
}
