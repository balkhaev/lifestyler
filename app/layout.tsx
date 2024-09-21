import type { Metadata } from "next"
import "./globals.css"

import { Roboto } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Несокрушимая качалка",
  description: "Уаааааааааааааааааа гей-техно качалка",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
