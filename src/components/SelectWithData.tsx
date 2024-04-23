import React, { useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ETypeAttribute } from '@/app/contract/[idContract]/(component)/addAttributeArea';

interface SelectWithDataProps {
    setSelectData: (value: ETypeAttribute) => void;
}

export default function SelectWithData({ setSelectData }: SelectWithDataProps) {
    const enumToArray = Object.entries(ETypeAttribute).map(([key, value]) => ({ key, value }));
    return (
        <div>
            <Select onValueChange={(value) => {
                setSelectData(value as ETypeAttribute)
            }}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel >Fruits</SelectLabel>
                        {enumToArray.map(({ key, value }, index) => (
                            <SelectItem value={key} key={index} >{value} </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
