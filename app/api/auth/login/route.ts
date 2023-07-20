import { NextResponse } from "next/server"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { findUserById } from "@/lib/actions"

const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password should be minimum 5 characters"),
})

export async function POST(req: Request) {
  try {
    const supabase = createClientComponentClient()
    const requestData = await req.json()
    const { email, password } = loginUserSchema.parse(requestData)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)
      return NextResponse.json({ error: "User not found" }, { status: 500 })
    }

    const userInfo = await findUserById(data.user.id)
    return NextResponse.json({
      user: userInfo,
      message: "Login Successful",
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error signing up" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
