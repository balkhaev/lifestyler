import { eq } from "drizzle-orm"
import { users } from "../schema"
import { db } from "../db"

import { webcrypto } from "crypto"

export const hashPassword = async (string: string) => {
  const buffer = await webcrypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(string)
  )
  return new TextDecoder().decode(buffer)
}

export const login = async (email: string, password: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (user?.password !== (await hashPassword(password))) {
    return null
  }

  return user
}

export const createUser = async (email: string, password: string) => {
  return db
    .insert(users)
    .values({ email, password: await hashPassword(password) })
}
