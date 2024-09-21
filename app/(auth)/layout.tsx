import { AppHeader } from "@/components/app/header"
import { auth } from "@/lib/auth"

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <div className="min-h-screen">
      <AppHeader user={session?.user} />
      {children}
    </div>
  )
}
