import { Button } from "@/components/ui/button"
import { User } from "next-auth"
import { signOut } from "@/lib/auth"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppSelector } from "./selector"

type AppHeaderProps = {
  user?: User
}

export function AppHeader({ user }: AppHeaderProps) {
  return (
    <div className="flex px-4 gap-4 items-center h-16">
      <Link href="/">
        <h1 className="text-3xl font-bold md:w-64">Lifestyler</h1>
      </Link>
      <div className="flex gap-2 justify-between flex-1">
        <div className="flex gap-2">
          <AppSelector />
          <Button variant="secondary">Новая тренировка</Button>
        </div>
        <div>
          {user ? (
            <DropdownMenu>
              <Button asChild>
                <DropdownMenuTrigger>{user?.email}</DropdownMenuTrigger>
              </Button>
              <DropdownMenuContent>
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <form
                    action={async () => {
                      "use server"
                      await signOut()
                    }}
                  >
                    <button type="submit">Выйти</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Войти</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
