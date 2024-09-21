import { TrainingSidebar } from "@/components/features/training/sidebar"

export default async function TrainingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 pb-4">
      <TrainingSidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
