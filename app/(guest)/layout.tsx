export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container mx-auto max-w-lg h-screen flex flex-col justify-center">
      {children}
    </div>
  )
}
