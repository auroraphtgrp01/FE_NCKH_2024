/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
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
import ComboboxCustomize from '@/components/ComboBoxCustomize'
export interface GrantPermission {
    readContract: boolean,
    editPartyInfo: boolean,
    chatWithParty: boolean,
    editTheTerm: boolean
}

export default function page() {
    const [date, setDate] = React.useState<Date>()
    const [valueCombobox, setValueCombobox] = React.useState<Date>()
    const [isOpen, setIsOpen] = React.useState(false)
    const [openA, setOpenA] = React.useState(false)
    const [openB, setOpenB] = React.useState(false)
    const [per, setPer] = React.useState<GrantPermission>({
        readContract: true,
        chatWithParty: false,
        editPartyInfo: false,
        editTheTerm: false
    })
    const [valuesA, setValuesA] = useState<{ value: string, label: string }[]>([{ value: 'Select framework...', label: 'Select framework...' }])
    const [inputValueA, setInputvalueA] = useState("");
    const [inputsA, setInputsA] = useState<{ value: string }[]>([{ value: '' }]);

    const [valuesB, setValuesB] = useState<{ value: string, label: string }[]>([{ value: 'Select framework...', label: 'Select framework...' }])
    const [inputValueB, setInputvalueB] = useState("");
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
    const [propertiesA, setPropertyA] = useState<string>('')
    const [propertiesCBXA, setPropertiesCBXA] = useState<string[]>([
        'city',
        'date',
        'titleContract',
        'numberContract',
    ])
    const [newPropertiesAArrayA, setNewPropertiesA] = useState<string[]>([])

    useEffect(() => {
        console.log('values A : ');
        console.log(propertiesA);
    }, [propertiesA])


    const [propertiesB, setPropertyB] = useState<string>('')
    const [propertiesCBXB, setPropertiesCBXB] = useState<string[]>([
        'city',
        'date',
        'titleContract',
        'numberContract',
    ])
    const [newPropertiesAArrayB, setNewPropertiesB] = useState<string[]>([])
    useEffect(() => {
        console.log('values B : ');
        console.log(propertiesB);
    }, [propertiesB])
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
                            <div>
                                <ComboboxCustomize onSelectedData={setPropertyA} propertiesCBX={propertiesCBXA} setNewProperties={setNewPropertiesA} newPropertiesArray={newPropertiesAArrayA} setPropertiesCBX={setPropertiesCBXA} >
                                </ComboboxCustomize>
                                <Button className='ms-2'>Invite</Button>
                                <Button className='ms-2' variant={'destructive'} onClick={openGrantPermission}>Permissions</Button>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Party B:</Label>
                            <div>
                                <ComboboxCustomize onSelectedData={setPropertyB} propertiesCBX={propertiesCBXB} setNewProperties={setNewPropertiesB} newPropertiesArray={newPropertiesAArrayB} setPropertiesCBX={setPropertiesCBXB} >
                                </ComboboxCustomize>
                                <Button className='ms-2'>Invite</Button>
                                <Button className='ms-2' variant={'destructive'} onClick={openGrantPermission}>Permissions</Button>
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
