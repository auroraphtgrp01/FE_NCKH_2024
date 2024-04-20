'use client'
import React, { useState } from 'react'
import { Combobox } from '@/components/ComboBox'
import { CalendarPicker } from '@/components/ui/calendar-picker'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { DialogOverlay, DialogPortal } from '@radix-ui/react-dialog'
import { Switch } from '@/components/ui/switch'

// Combobox
import { format, parse } from "date-fns";

import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Check,
    FilePen,
    FileSliders,
    MessagesSquare,
    SendHorizontal,
    X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";
export interface GrantPermission {
    readContract: boolean,
    editPartyInfo: boolean,
    chatWithParty: boolean,
    editTheTerm: boolean
}

export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = React.useState<Date>()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [valueCombobox, setValueCombobox] = React.useState<Date>()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = React.useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openA, setOpenA] = React.useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openB, setOpenB] = React.useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [per, setPer] = React.useState<GrantPermission>({
        readContract: true,
        chatWithParty: false,
        editPartyInfo: false,
        editTheTerm: false
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [valuesA, setValuesA] = useState<{ value: string, label: string }[]>([{ value: 'Select framework...', label: 'Select framework...' }])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputValueA, setInputvalueA] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputsA, setInputsA] = useState<{ value: string }[]>([{ value: '' }]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [valuesB, setValuesB] = useState<{ value: string, label: string }[]>([{ value: 'Select framework...', label: 'Select framework...' }])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputValueB, setInputvalueB] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputsB, setInputsB] = useState<{ value: string }[]>([{ value: '' }]);
    const handleSelectComboboxChangeA = (index: number, e: any) => {
        const clone = [...valuesA];
        clone[index].value = e;
        clone[index].label = e;
        setValuesA(clone);
        console.log('ValuesA');
        console.log(valuesA);
    };
    const handleAddComboboxChangeA = (index: number, e: any) => {
        const clone = [...frameworksA]
        clone.push({
            value: e,
            label: e,
        })
        setFrameworksA(clone)
    };

    const handleSelectComboboxChangeB = (index: number, e: any) => {
        const clone = [...valuesB];
        clone[index].value = e;
        clone[index].label = e;
        setValuesB(clone);
        console.log('ValuesB');
        console.log(valuesB);
    };
    const handleAddComboboxChangeB = (index: number, e: any) => {
        const clone = [...frameworksB]
        clone.push({
            value: e,
            label: e,
        })
        setFrameworksB(clone)
    };
    function onChangePer(key: keyof GrantPermission): void {
        let pers = { ...per }
        pers[key] = !pers[key]
        setPer(pers)
        return undefined
    }
    function openGrantPermission() {
        setIsOpen(true)
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [frameworksA, setFrameworksA] = useState([
        {
            value: "next111 .js",
            label: "Next11.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [frameworksB, setFrameworksB] = useState([
        {
            value: "next111 .js",
            label: "Next11.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]);
    return (
        <div className='w-full flex'>
            <div className='flex  py-4'>
                <Card className='min-w-[320px]'>
                    <CardHeader>
                        <CardTitle>Create a new Contract</CardTitle>
                        <CardDescription>Please fill in the inputsA to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Address Wallet: </Label>
                            <Input disabled readOnly />
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Name of Contract: </Label>
                            <Input />
                        </div>

                        <div className="flex flex-col space-y-2 mt-2">
                            <Label>Template Contract: </Label>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                orientation="vertical"
                                className="w-full max-w-xs"
                            >
                                <CarouselContent className="-mt-1 h-[280px]">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className="pt-1 md:basis-1/2">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex  justify-center p-6">
                                                        <Image alt='' src={'/avatar/profile-img.png'} width={'200'} height={'300'}></Image>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full me-2' variant={'destructive'}>Choose a Template</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className='flex py-4 ms-4'>
                <Card className='min-w-[350px]'>
                    <CardHeader>
                        <CardTitle>Infomation of Contract</CardTitle>
                        <CardDescription>Please fill in the inputsA to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Party A:</Label>
                            {/* <div className='flex'>
                                <Combobox setValue={setValueCombobox} value={valueCombobox}></Combobox>
                                <Button className='ms-2'>Invite</Button>
                                <Button className='ms-2' variant={'destructive'} onClick={openGrantPermission}>Permissions</Button>
                            </div> */}

                            {/* CBB A*/}
                            <div>
                                {inputsA.map((input, index) => (
                                    <div key={index} className='mt-3 flex' >
                                        {/* CBB */}
                                        {/* open={open} onOpenChange={setOpen} */}
                                        <Popover open={openA} onOpenChange={setOpenA}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className=" justify-between truncate w-[160px]">
                                                    {valuesA.length > 0 ?
                                                        frameworksA.find(framework => framework.value === valuesA[index].value)?.label || "Select framework..."
                                                        : "Select framework..."
                                                    }
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search framework..." className="h-9 text-ellipsis " onBlur={(e) => setInputvalueA(e.target.value)} />
                                                    <CommandEmpty>
                                                        {/*  */}
                                                        <Button type="button" className='w-[80%]' onClick={(e) => { handleAddComboboxChangeA(index, inputValueA) }}>
                                                            Thêm mới
                                                        </Button>
                                                    </CommandEmpty>
                                                    <CommandList>
                                                        <CommandGroup>
                                                            {frameworksA.map((framework) => (
                                                                <CommandItem className='cursor-pointer' style={{ pointerEvents: 'auto' }}
                                                                    key={framework.value}
                                                                    value={framework.value}
                                                                    onSelect={(currentValue) => {
                                                                        handleSelectComboboxChangeA(index, currentValue)
                                                                        setOpenA(false)
                                                                    }}
                                                                >
                                                                    {framework.label}
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            valuesA.toString() === framework.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}

                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <Button className='ms-2'>Invite</Button>
                                        <Button className='ms-2' variant={'destructive'} onClick={openGrantPermission}>Permissions</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Party B:</Label>
                            <div>
                                {inputsB.map((input, index) => (
                                    <div key={index} className='mt-3 flex'>
                                        {/* CBB */}
                                        {/* open={open} onOpenChange={setOpen} */}
                                        <Popover open={openB} onOpenChange={setOpenB}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className=" justify-between truncate w-[160px]">
                                                    {valuesB.length > 0 ?
                                                        frameworksA.find(framework => framework.value === valuesB[index].value)?.label || "Select framework..."
                                                        : "Select framework..."
                                                    }
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search framework..." className="h-9 text-ellipsis " onBlur={(e) => setInputvalueB(e.target.value)} />
                                                    <CommandEmpty>
                                                        {/*  */}
                                                        <Button type="button" className='w-[80%]' onClick={(e) => { handleAddComboboxChangeB(index, inputValueB) }}>
                                                            Thêm mới
                                                        </Button>
                                                    </CommandEmpty>
                                                    <CommandList>
                                                        <CommandGroup>
                                                            {frameworksB.map((framework) => (
                                                                <CommandItem className='cursor-pointer' style={{ pointerEvents: 'auto' }}
                                                                    key={framework.value}
                                                                    value={framework.value}
                                                                    onSelect={(currentValue) => {
                                                                        handleSelectComboboxChangeB(index, currentValue)
                                                                        setOpenB(false)
                                                                    }}
                                                                >
                                                                    {framework.label}
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            valuesA.toString() === framework.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}

                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <Button className='ms-2'>Invite</Button>
                                        <Button className='ms-2' variant={'destructive'} onClick={openGrantPermission}>Permissions</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label>Start Date: </Label>
                            <CalendarPicker onDateChange={setDate} selectedDate={date} />
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label>End Date: </Label>
                            <CalendarPicker onDateChange={setDate} selectedDate={date} />
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label>Message for Invitation: </Label>
                            <Textarea
                                placeholder="Message"
                                className="resize-none w-full min-h-[150px]"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full me-2'>Create Contract</Button>
                        <Button className='w=full' variant={'destructive'}>Cancel</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className='flex py-4 ms-4 '>
                <Card className='min-w-[630px]'>
                    <CardHeader>
                        <CardTitle className='text-center font-semibold text-lg '>
                            Preview the Contract
                        </CardTitle>
                        <CardDescription>Preview the contract here - Please choose a template</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* // gắn html của hợp đồng vào dây */}
                    </CardContent>
                </Card>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogPortal >
                    <DialogOverlay>
                        <DialogContent className="sm:max-w-[450px]" >
                            <DialogHeader >
                                <DialogTitle>Grant Permisison  </DialogTitle>
                                <DialogDescription>
                                    Grant Permisison of the contract to Party
                                </DialogDescription>
                            </DialogHeader>
                            <Accordion type="single" defaultValue="item-1" >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger >
                                        <div className='flex items-center space-x-2 me-2'>
                                            <Switch id="" />
                                            <Label htmlFor="">Full Access to Contract</Label>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div>
                                            <div className="grid gap-4 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className='flex items-center space-x-2 me-2'>
                                                        <Switch id="" />
                                                        <Label htmlFor="">Read the Contract</Label>
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <Switch id="" />
                                                        <Label htmlFor="">Edit the Party Info</Label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid gap-4 py-4 ">
                                                <div className="flex items-center space-x-2">
                                                    <div className='flex items-center space-x-2 me-6'>
                                                        <Switch id="" />
                                                        <Label htmlFor="">Chat with Party</Label>
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <Switch id="" />
                                                        <Label htmlFor="">Edit terms in the contract </Label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </DialogContent>
                    </DialogOverlay>
                </DialogPortal>
            </Dialog>
        </div >
    )
}
