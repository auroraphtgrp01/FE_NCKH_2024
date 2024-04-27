import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import parse from 'html-react-parser';
import { Icons } from '@/components/ui/icons'
export interface IInputWithTooltipProps extends React.InputHTMLAttributes<HTMLInputElement> {
    description?: string
    alignCenter?: boolean
}

const InputWithTooltip = React.forwardRef<HTMLInputElement, IInputWithTooltipProps>(({ className, type, description, alignCenter, ...props }, ref) => {
    return (
        <div className={cn(className)}>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Input {...props} ref={ref} className={alignCenter ? 'text-center' : ''} />
                    </TooltipTrigger>
                    <TooltipContent className='bg-transparent' side='left'>
                        {/* <div>{parse(description)} </div> */}
                        <div className='flex flex-col'>
                            <Button variant={'destructive'}>
                                <Icons.badgeX />
                            </Button>
                            <Button variant={'blue'} className='mt-1'>
                                <Icons.badgeInfo />
                            </Button>
                            <Button variant={'default'} className='mt-1'>
                                <Icons.badgePlus />
                            </Button>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div >
    )
})

InputWithTooltip.displayName = "InputWithTooltip"
export { InputWithTooltip }
