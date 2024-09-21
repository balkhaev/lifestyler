import { login } from "@/lib/auth"

export const POST = async (req: Request) => {
  const { password, email } = await req.json()

  if (!email || !password) {
    return Response.json({ message: "invalid inputs" }, { status: 400 })
  }

  const user = await login(email, password)

  if (user) {
    return Response.json(user, { status: 200 })
  } else {
    return Response.json({ message: "invalid credentials" }, { status: 401 })
  }
}
