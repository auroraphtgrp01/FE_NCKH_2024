import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from '@/components/ui/tooltip';
import { Icons } from "@/components/ui/icons";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

export default function NavbarVertical() {
    return (
        <div className="bg-white z-50">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-[55px] flex-col border-r sm:flex backdrop-blur">
                <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
                    <Link
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full  text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Icons.logo className="h-4 w-4 " />
                    </Link>
                    <div className="mt-5">
                        <TooltipProvider>
                            <Tooltip delayDuration={50}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/contract"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg mt-2"
                                    >
                                        <Button className="justify-start flex rounded-lg transition-colors w-full mt-2 px-2  bg-black text-white hover:bg-black hover:text-white" variant={'ghost'}>
                                            <Icons.briefcase className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-black mt-2">
                                    <span className="font-semibold">
                                        My Contract
                                    </span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={50}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg mt-2"
                                    >
                                        <Button className="justify-start flex rounded-lg transition-colors w-full mt-2 px-2" variant={'ghost'}>
                                            <Icons.layers className="h-4 w-4 " />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-black mt-2">
                                    <span className="font-semibold">
                                        Supply Chain
                                    </span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={50}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                                    >
                                        <Button className="justify-start flex rounded-lg transition-colors w-full mt-2 px-2" variant={'ghost'}>
                                            <Icons.newspaper className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-black mt-2">
                                    <span className="font-semibold">
                                        Supply Chain Management
                                    </span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip delayDuration={50}>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                                >
                                    <Button className="justify-start flex rounded-lg transition-colors w-full mt-2 px-2" variant={'ghost'}>
                                        <Icons.logout className="h-4 w-4 " />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-black mt-2">
                                <span className="font-semibold">
                                    Logout
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
        </div>
    )
}
