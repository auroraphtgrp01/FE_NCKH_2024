import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Command } from '@/components/ui/command';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface ComboBoxPicker {
    onSelectedData: (data: any) => void
    propertiesCBX: string[],
    setNewProperties: (data: string[]) => void
    newPropertiesArray: string[]
    setPropertiesCBX: (data: string[]) => void
}

export default function ComboboxCustomize({ onSelectedData, propertiesCBX, setNewProperties, newPropertiesArray, setPropertiesCBX }: ComboBoxPicker) {
    const [inputValue, setInputValue] = useState("");
    const [openPopover, setOpenPopover] = useState(false);
    const [indexProperty, setIndexProperty] = useState<number>(-1);
    const [properties, setProperty] = useState(
        propertiesCBX
    );
    const handleAddComboboxChange = (index: number, e: any) => {
        const clone = [...properties]
        clone.push(e)
        setProperty(clone)
        setPropertiesCBX([...propertiesCBX, e])
        handleExportNewPropertiesArray(clone)
    };

    const handleSelectComboboxChange = (index: number, e: any) => {
        setIndexProperty(index);
        onSelectedData(properties[index])
        const clone = [...properties];
        clone[index] = e;
        clone[index] = e;
        setProperty(clone);
    };
    const handleExportNewPropertiesArray = (properties: any) => {
        let newPropertiesCompare: string[] = [];
        for (let i = 0; i < properties.length; i++) {
            if (!propertiesCBX.includes(properties[i])) {
                newPropertiesCompare.push(properties[i]);
            }
        }
        setNewProperties(newPropertiesArray.concat(newPropertiesCompare))
    }
    return (
        <div>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className=" justify-between truncate w-[160px]">
                        {
                            indexProperty > -1 ? properties[indexProperty] : "Select property"
                        }
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search property..." className="h-9 text-ellipsis " onBlur={(e) => setInputValue(e.target.value)} />
                        <CommandEmpty>
                            <Button type="button" className='w-[80%]' onClick={(e) => { handleAddComboboxChange(properties.length, inputValue) }}>
                                Thêm mới
                            </Button>
                        </CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                {properties.map((property, index) => (
                                    <CommandItem className='cursor-pointer' style={{ pointerEvents: 'auto' }}
                                        key={property}
                                        value={property}
                                        onSelect={(currentValue) => {
                                            handleSelectComboboxChange(index, currentValue)
                                            setOpenPopover(false)
                                        }}
                                    >
                                        {property}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                properties[indexProperty]?.toString() === property ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
