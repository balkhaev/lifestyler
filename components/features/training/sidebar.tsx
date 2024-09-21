"use client"

import { Button } from "@/components/ui/button"
import { Dumbbell, Map, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ElementType } from "react"

function TrainingSidebarNavItem({
  link,
  title,
  Icon,
}: {
  link: string
  title: string
  Icon: ElementType
}) {
  const pathname = usePathname()

  return (
    <Button
      variant={pathname === link ? "default" : "outline"}
      className="w-full justify-start"
      asChild
    >
      <Link href={link}>
        <Icon className="mr-2 h-4 w-4" /> {title}
      </Link>
    </Button>
  )
}

export function TrainingSidebar() {
  return (
    <aside className="w-full md:w-64 space-y-2">
      <TrainingSidebarNavItem link="/training" title="Профиль" Icon={User} />
      <TrainingSidebarNavItem
        link="/training/progress"
        title="Прогресс"
        Icon={Map}
      />
      <TrainingSidebarNavItem
        link="/training/trainings"
        title="Тренировки"
        Icon={Dumbbell}
      />
      <TrainingSidebarNavItem
        link="/training/community"
        title="Сообщества"
        Icon={Users}
      />
    </aside>
  )
}
