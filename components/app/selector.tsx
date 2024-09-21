"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const activites = [
  {
    name: "Тренировки",
    link: "/training",
  },
  {
    name: "Танцы",
    link: "/dance",
  },
]

export function AppSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [key, setKey] = useState(+new Date())
  const [activity, setActivity] = useState<string | undefined>(
    activites.find((activity) => pathname.startsWith(activity.link))?.link
  )

  useEffect(() => {
    if (pathname === "/") {
      setActivity(undefined)
    }
  }, [pathname])

  return (
    <Select
      key={key}
      value={activity}
      onValueChange={(value) => {
        setActivity(value)
        router.push(value)
        setKey(+new Date())
      }}
    >
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Выберите занятие" />
      </SelectTrigger>
      <SelectContent>
        {activites.map(({ name, link }) => (
          <SelectItem key={link} value={link}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
