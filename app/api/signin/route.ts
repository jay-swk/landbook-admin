import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://dev-api2.landbook.me/auth/signin"

export async function POST(request: Request) {
    const {email, password}: Partial<Signin>= await request.json()

    if (!email || !password) return NextResponse.json({
        "message": "Missing required data"
    })

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })

    const result : Auth = await res.json()

    return NextResponse.json(result)
}