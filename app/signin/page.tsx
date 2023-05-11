'use client'
import { Metric, Card, Button, Divider, TextInput } from "@tremor/react";

function landbookSignin() {
  return console.log("click")
}

export default function Signin() {
  return (
    <div className="relative mt-5 mb-5">
      <Card className="max-w-xl mx-auto" decoration="top" decorationColor="indigo">

        <Metric className="mb-5">Landbook Admin</Metric>

        <TextInput className="mb-5" placeholder="username (email)" />
        <TextInput type="password" className="mb-5" placeholder="password" />

        <Divider />

        <Button size="sm" onClick={landbookSignin}>
          Login
        </Button>

      </Card>
    </div>
  )
}