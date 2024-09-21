import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { login } from "./methods"
import { exclude } from "../utils"

export default {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        const user = await login(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) {
          throw new Error("User not found")
        }

        return exclude(user, ["password"])
      },
    }),
  ],
} satisfies NextAuthConfig
