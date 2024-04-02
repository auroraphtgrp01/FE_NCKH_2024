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
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'



export default function page() {
    const [date, setDate] = React.useState<Date>()
    const [valueCombobox, setValueCombobox] = React.useState<Date>()
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
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <Label >Party B:</Label>
                            <div className='flex'>
                                <Combobox setValue={setValueCombobox} value={valueCombobox}></Combobox>
                                <Button className='ms-2'>Invite</Button>
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
        </div >
    )
}
