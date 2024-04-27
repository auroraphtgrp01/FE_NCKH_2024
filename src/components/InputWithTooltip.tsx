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
import { IContractAttribute } from '@/interface/contract.i'
import { v4 as uuidRandom } from 'uuid';
export interface IInputWithTooltipProps extends React.InputHTMLAttributes<HTMLInputElement> {
    description?: string
    alignCenter?: boolean
    index: number
    contractAttribute: IContractAttribute[]
    setContractAttribute: (item: IContractAttribute[]) => void
    setIsDetailOpen: (item: boolean) => void
    setInfoOfContractAttribute: (item: any) => void
}

const InputWithTooltip = React.forwardRef<HTMLInputElement, IInputWithTooltipProps>(({ className, type, description, alignCenter, index, contractAttribute, setIsDetailOpen, setInfoOfContractAttribute, setContractAttribute, ...props }, ref) => {
    const handleAddNewItem = () => {
        const newContractAttribute: IContractAttribute = {
            value: '',
            id: uuidRandom(),
            isCreate: true
        }
        const newContractAttributeArray = [...contractAttribute]
        newContractAttributeArray.splice(index + 1, 0, newContractAttribute)
        setContractAttribute(newContractAttributeArray)
    }
    const handleDeleteItem = () => {
        const newContractAttributeArray = [...contractAttribute]
        newContractAttributeArray.splice(index, 1)
        setContractAttribute(newContractAttributeArray)
    }
    const handleOpenDetail = () => {
        setInfoOfContractAttribute(contractAttribute[index])
        setIsDetailOpen(true)
    }
    return (
        <div className={cn(className)}>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Input {...props} ref={ref} className={alignCenter ? 'text-center' : ''} />
                    </TooltipTrigger>
                    <TooltipContent className='bg-transparent' side='left'>
                        <div className='flex flex-col'>
                            <Button variant={'destructive'} type='button' onClick={handleDeleteItem}>
                                <Icons.badgeX />
                            </Button>
                            <Button variant={'blue'} className='mt-1' type='button' onClick={handleOpenDetail}>
                                <Icons.badgeInfo />
                            </Button>
                            <Button variant={'default'} className='mt-1' onClick={handleAddNewItem} type='button'>
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