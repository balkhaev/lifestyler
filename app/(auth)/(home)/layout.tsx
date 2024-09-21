export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 pb-4">
      <div className="w-64">Общий сайдбар</div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
