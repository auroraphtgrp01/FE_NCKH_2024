import { ModeToggle } from "@/components/DarkModeToggle"
import { MainNav } from "@/components/MainNav"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"


export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav/>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
                <Link href={'/login'}>
                <Button variant={"outline"}   > 
                    <Icons.login className="h-5 w-5 me-2"/> LOGIN
                </Button>
                 </Link>
                <Link href={'/register'}> 
                <Button variant={"outline"}  > 
                    <Icons.register className="h-5 w-5 me-2"/> REGISTER
                </Button>
                </Link>
                
                    <ModeToggle/>
          </nav>
        </div>
      </div>
    </header>
  )
}
