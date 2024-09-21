"use client"

import * as React from "react"
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  ShoppingBag,
  FileText,
  Settings,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MenuItem {
  icon: LucideIcon
  title: string
  href?: string
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    title: "Дашборд",
    href: "/",
  },
  {
    icon: Users,
    title: "Тренировки",
    submenu: [
      { icon: ChevronRight, title: "All Users", href: "/users" },
      { icon: ChevronRight, title: "Add User", href: "/users/add" },
      { icon: ChevronRight, title: "User Roles", href: "/users/roles" },
    ],
  },
  {
    icon: ShoppingBag,
    title: "Products",
    submenu: [
      { icon: ChevronRight, title: "All Products", href: "/products" },
      { icon: ChevronRight, title: "Add Product", href: "/products/add" },
      { icon: ChevronRight, title: "Categories", href: "/products/categories" },
    ],
  },
  {
    icon: FileText,
    title: "Orders",
    href: "/orders",
  },
  {
    icon: Settings,
    title: "Settings",
    submenu: [
      { icon: ChevronRight, title: "General", href: "/settings/general" },
      { icon: ChevronRight, title: "Security", href: "/settings/security" },
      {
        icon: ChevronRight,
        title: "Notifications",
        href: "/settings/notifications",
      },
    ],
  },
]

const MenuItem: React.FC<{ item: MenuItem; depth?: number }> = ({
  item,
  depth = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasSubmenu = item.submenu && item.submenu.length > 0
  const Icon = item.icon

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          depth > 0 && "pl-4",
          hasSubmenu && "font-semibold"
        )}
        onClick={() => hasSubmenu && setIsOpen(!isOpen)}
      >
        <Icon className="mr-2 h-4 w-4" />
        {item.title}
        {hasSubmenu && (
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        )}
      </Button>
      {isOpen && hasSubmenu && (
        <div className="ml-4">
          {item.submenu!.map((subItem, index) => (
            <MenuItem key={index} item={subItem} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function SidebarMenu() {
  return (
    <ScrollArea className="w-64">
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </ScrollArea>
  )
}
