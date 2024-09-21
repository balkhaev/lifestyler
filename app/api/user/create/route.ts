import { createUser } from "@/lib/auth"

export const POST = async (req: Request) => {
  const errors = []
  const { password, email } = await req.json()

  if (password.length < 6) {
    errors.push("пароль должен содержать не менее 6 символов")

    return Response.json(
      { errors },
      {
        status: 400,
      }
    )
  }

  try {
    const user = createUser(email, password)
    return Response.json(
      { user },
      {
        status: 201,
      }
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return Response.json(
      { message: e.message },
      {
        status: 500,
      }
    )
  }
}
