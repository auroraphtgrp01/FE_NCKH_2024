'use client'
import { use, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Button } from "@/components/ui/button";
import GrantPermission, { IPermission } from '@/components/GrantPermission'
import { useAppContext } from '@/components/ThemeProvider'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { fetchAPI } from '@/utils/fetchAPI'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import BreadCrumbHeader from '@/components/BreadCrumbHeader'
export const initPermission: IPermission = {
    READ_CONTRACT: false,
    EDIT_CONTRACT: false,
    INVITE_PARTICIPANT: false,
    CHANGE_STATUS_CONTRACT: false,
    SET_OWNER_PARTY: false
}

export interface InvitationItem {
    email: string
    permission: IPermission
}

export interface ContractTemplate {
    id: string
    name: string
    img: string
}

const initContractTemplate = [
    {
        id: '1',
        name: 'Template 1',
        img: '/avatar/profile-img.png'
    },
    {
        id: '2',
        name: 'Template 2',
        img: '/avatar/profile-img.png'
    },
    {
        id: '3',
        name: 'Template 3',
        img: '/avatar/profile-img.png'
    },
    {
        id: '4',
        name: 'Template 4',
        img: '/avatar/profile-img.png'
    },
    {
        id: '5',
        name: 'Template 5',
        img: '/avatar/profile-img.png'
    }
]

export default function page() {
    const [template, setTemplate] = useState<ContractTemplate[]>(initContractTemplate)
    const [isOpen, setOpen] = useState(false)
    const { userInfo, setUserInfo }: any = useAppContext()
    const [invitationInput, setInvitationInput] = useState('')
    const [invitation, setInvitation] = useState<InvitationItem[]>([])
    const [indexPerson, setIndexPerson] = useState<number>(-1)
    const [nameOfContractInput, setNameOfContractInput] = useState('')
    const [templateSelect, setTemplateSelect] = useState<any>(undefined)
    const [contract, setContract] = useState<any>({})
    const [messages, setMessages] = useState('')
    const Router = useRouter();
    const { toast } = useToast()
    function onAddInvitation(): void {
        const isEmail = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        if (!isEmail.test(invitationInput)) {
            alert('Email is invalid !')
            return
        }
        setInvitation([...invitation, { email: invitationInput, permission: initPermission }])
        setInvitationInput('')
    }
    function updatePermission(data: IPermission): void {
        invitation[indexPerson].permission = data
        setInvitation([...invitation])
    }
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        if (!api) {
            return
        }
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])
    function onClickCreateContractButton() {
        const payload = {
            addressWallet: userInfo?.data?.addressWallet,
            name: nameOfContractInput,
            template: templateSelect?.id || null,
            invitation: invitation,
            messagesForInvitation: messages
        }
        fetchAPI('/contracts', 'POST', payload).then((res) => {
            if (res.status === 201) {
                toast({
                    title: "Create contract success",
                    description: "You have successfully created a contract",
                    variant: "success",
                    duration: 2000,
                })
                Router.push(`/contract/${res.data.contract.id}`)
            }
        }).catch((err) => {
            toast({
                title: "Create contract failed",
                description: "Please check your information again",
                variant: "destructive",
                duration: 2000,
            })
        })
    }
    return (
        <div>
            <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
                <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
                    <div className='flex translate-x-[-35px]'>
                        <BreadCrumbHeader />
                    </div>
                </div>
            </header>
            <div className='w-full flex container'>
                <div className='flex py-4'>
                    <Card className='min-w-[320px]'>
                        <CardHeader>
                            <CardTitle>Create a new Contract</CardTitle>
                            <CardDescription>Please fill to continue</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-2 mt-2">
                                <Label >Address Wallet: </Label>
                                <Input disabled readOnly defaultValue={userInfo?.data?.addressWallet} />
                            </div>
                            <div className="flex flex-col space-y-2 mt-2">
                                <Label >Name of Contract: </Label>
                                <Input defaultValue={nameOfContractInput} onChange={(e) =>
                                    setNameOfContractInput(e.target.value)
                                } />
                            </div>

                            <div className="flex flex-col space-y-2 mt-2">
                                <Label>Template Contract: </Label>
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    orientation="vertical"
                                    className="w-full max-w-xs"
                                    setApi={setApi}
                                >
                                    <CarouselContent className="-mt-1 h-[280px]" >
                                        {template.map((item, index) => (
                                            <CarouselItem key={index} className="pt-1 md:basis-1/2">
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex justify-center p-6">
                                                            <Image alt='' src={item.img} width={'200'} height={'300'}></Image>
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
                            <Button className='w-full me-2' variant={'destructive'} onClick={() => {
                                setTemplateSelect(template[current])
                            }}>Choose a Template</Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className='flex py-4 ms-4'>
                    <Card className='min-w-[450px]'>
                        <CardHeader>
                            <CardTitle>Infomation of Contract</CardTitle>
                            <CardDescription>Please fill in all to continue</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-2 mt-2">
                                <Label >Invitation Participants:</Label>
                                <div className='flex'>
                                    <Input className='me-2' onChange={(e) => {
                                        setInvitationInput(e.target.value)
                                    }} value={invitationInput} onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            onAddInvitation()
                                        }
                                    }}></Input>
                                    <Button onClick={onAddInvitation}>Invite</Button>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 mt-2 ">
                                <ScrollArea className="h-72 rounded-md border px-2">
                                    <Table className=''>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="">#</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead className="text-center">Permission</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {invitation.map((inv, index) => (
                                                <TableRow key={inv.email}>
                                                    <TableCell>{index}</TableCell>
                                                    <TableCell>{inv.email}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className='flex'>
                                                            <Button variant={'default'} className='me-2' onClick={() => {
                                                                setIndexPerson(index)
                                                                setOpen(true)
                                                            }}>Grant</Button>
                                                            <Button variant={'destructive'}>Delete</Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </div>
                            <div className="flex flex-col space-y-2 mt-2">
                                <Label>Message for Invitation: </Label>
                                <Textarea
                                    placeholder="Message"
                                    className="resize-none w-full min-h-[150px]"
                                    defaultValue={messages}
                                    onChange={(e) => {
                                        setMessages(e.target.value)
                                    }}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className='w-full me-2' onClick={onClickCreateContractButton}>Create Contract</Button>
                            <Button className='w=full' variant={'destructive'}>Cancel</Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className='flex py-4 ms-4 '>
                    <Card className='min-w-[600px]'>
                        <CardHeader>
                            <CardTitle className='text-center font-semibold text-lg '>
                                {template[current]?.name}
                            </CardTitle>
                            <CardDescription>Preview the contract here - Please choose a template</CardDescription>
                        </CardHeader>
                        <CardContent>
                        </CardContent>
                    </Card>
                </div>
                <GrantPermission isOpen={isOpen} setOpen={setOpen} permission={invitation[indexPerson]?.permission} callback={updatePermission}></GrantPermission>
            </div >
        </div>
    )
}
