'use client'
import { Metric, Card, Button, Divider, TextInput } from "@tremor/react";
import { signIn } from "next-auth/react";
import { useRef } from "react";

interface Iprops {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function LoginPage({searchParams}: Iprops) {
  const userName = useRef("");
  const password = useRef("");
  const error = useRef("");

  // console.log(searchParams)

  const onSubmit = async() => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/"
    });
  };

  return (
    <div className="relative mt-5 mb-5">
      {/* {searchParams?.error && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{searchParams?.error}</p>} */}
      <Card className="max-w-xl mx-auto" decoration="top" decorationColor="indigo">

        <Metric className="mb-5">Landbook Admin</Metric>

        <TextInput className="mb-5" placeholder="username (email)" onChange={(e) => (userName.current = e.target.value)} />
        <TextInput type="password" className="mb-5" placeholder="password" onChange={(e) => (password.current = e.target.value)} />

        <Divider />

        <Button size="sm" onClick={onSubmit}>
          Login
        </Button>

      </Card>
    </div>
  )
}