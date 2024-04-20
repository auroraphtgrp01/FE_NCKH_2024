import React, { useState } from 'react'
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
}

export default function ComboboxCustomize({ onSelectedData }: ComboBoxPicker) {
    const [inputValue, setInputValue] = useState("");
    const [openPopover, setOpenPopover] = useState(false);
    const [indexProperty, setIndexProperty] = useState<number>(-1);
    const [properties, setProperty] = useState([
        'City', 'Date', 'Title Contract', 'Number Contract', 'Law', 'Signing Date', 'End Date',
        'Content', 'Supplier Name', 'Supplier Citizen ID', 'Supplier Surrogate', 'Supplier Address',
        'Supplier Phone Number', 'Supplier Fax', 'Supplier Account Number', 'Supplier Treasury', 'Supplier Signature',
        'Customer Name', 'Customer Citizen ID', 'Customer Surrogate', 'Customer Address', 'Customer Phone Number',
        'Customer Account Number', 'Customer Signature'
    ]);
    const handleAddComboboxChange = (index: number, e: any) => {
        const clone = [...properties]
        clone.push(e)
        setProperty(clone)
    };
    const handleSelectComboboxChange = (index: number, e: any) => {
        setIndexProperty(index);
        onSelectedData(properties[index])
        const clone = [...properties];
        clone[index] = e;
        clone[index] = e;
        setProperty(clone);
    };
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
