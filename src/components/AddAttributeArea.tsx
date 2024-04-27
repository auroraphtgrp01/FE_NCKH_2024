import { Button } from '@/components/ui/button'
import React, { use, useEffect, useState } from 'react'
import { InputWithTooltip } from '@/components/InputWithTooltip';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { v4 as uuidRandom } from 'uuid';

import { EContractAttributeType, EContractAttributeTypeAdditional, IContractAttribute } from '@/interface/contract.i';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';


export default function AddAttributeArea({ contractAttribute, setContractAttribute, index }: { contractAttribute: any, setContractAttribute: any, index?: number }) {
    const contractAttributeTypeArray: { key: string, value: string }[] = Object.keys(EContractAttributeTypeAdditional).map((key) => ({
        key,
        value: EContractAttributeTypeAdditional[key as keyof typeof EContractAttributeTypeAdditional],
    }));
    const { toast } = useToast()
    const [SelectType, setSelectType] = useState<EContractAttributeType>()
    const [inputValue, setInputValue] = useState<any>()
    const [textArea, setTextArea] = useState<string>('')
    function handleAddAttribute() {
        if (!SelectType || !inputValue || (SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE && !textArea)) {
            toast({
                title: "Empty Field",
                description: "Please fill all the fields",
                variant: "destructive",
            })
            return
        }
        const newContractAttribute: IContractAttribute = {
            value: (SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE) ? textArea : inputValue,
            property: (SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE) ? inputValue : undefined,
            id: uuidRandom(),
            type: SelectType as EContractAttributeType,
            isCreate: false
        }
        if (!index) {
            setContractAttribute([
                ...contractAttribute,
                newContractAttribute
            ])
            setInputValue('')
            setTextArea('')
        }
        else {
            const newContractAttributeArray = [...contractAttribute]
            newContractAttributeArray.splice(index, 0, newContractAttribute)
            newContractAttributeArray.splice(index + 1, 1)
            setContractAttribute(newContractAttributeArray)
            setInputValue('')
            setTextArea('')
        }
        setInputValue('')
        setTextArea('')
    }
    return (
        <div className='flex flex-col'>
            <div className='flex mt-2 w-full'>
                <Input className='w-[32%]'
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }} defaultValue={inputValue} />
                <Select onValueChange={(e: EContractAttributeType) => {
                    setSelectType(e)
                }}>
                    <SelectTrigger className="w-[180px] ms-2">
                        <SelectValue placeholder="Select Attribute Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Attribute Type</SelectLabel>
                            {contractAttributeTypeArray.map((item, index) => (
                                <SelectItem value={item.value} key={index}>{item.value}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className='ms-2 w-[34%]' type='button' onClick={handleAddAttribute}>
                    Add New Attribute
                </Button>
            </div>
            {SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE && (
                <div>
                    <Textarea onChange={(e) => {
                        setTextArea(e.target.value)
                    }} className='mt-2 w-[100%]' defaultValue={textArea} />
                </div>
            )}
        </div>
    )
}