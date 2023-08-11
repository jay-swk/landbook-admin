'use client'
import { Metric, Card, Button, Divider, TextInput } from "@tremor/react";
import { signIn } from "next-auth/react";
import { useRef } from "react";

export default function LoginPage() {
  const userName = useRef("");
  const password = useRef("");
  const error = useRef("");

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
