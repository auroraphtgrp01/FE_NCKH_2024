'use client'
import { Combobox } from '@/components/ComboBox'
import { CalendarPicker } from '@/components/ui/calendar-picker'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Button } from '@/components/ui/button'
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { DialogOverlay, DialogPortal } from '@radix-ui/react-dialog'
import { Switch } from '@/components/ui/switch'

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
    const [per, setPer] = React.useState<GrantPermission>({
        readContract: true,
        chatWithParty: false,
        editPartyInfo: false,
        editTheTerm: false
    })
    function onChangePer(key: keyof GrantPermission): void {
        let pers = { ...per }
        pers[key] = !pers[key]
        setPer(pers)
        return undefined
    }
    function openGrantPermission() {
        setIsOpen(true)
    }
    return (
        <div className='w-full flex'>
            <div className='flex  py-4'>
                <Card className='min-w-[320px]'>
                    <CardHeader>
                        <CardTitle>Create a new Contract</CardTitle>
                        <CardDescription>Please fill in the inputs to continue</CardDescription>
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
                        <CardDescription>Please fill in the inputs to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Party A:</Label>
                            <div className='flex'>
                                <Combobox setValue={setValueCombobox} value={valueCombobox}></Combobox>
                                <Button className='ms-2'>Invite</Button>
                                <Button className='ms-2' variant={'destructive'} onClick={openGrantPermission}>Permissions</Button>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Party B:</Label>
                            <div className='flex'>
                                <Combobox setValue={setValueCombobox} value={valueCombobox}></Combobox>
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
