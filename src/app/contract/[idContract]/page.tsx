"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import parse from 'html-react-parser';
import PreviewContract from "@/app/contract/[idContract]/(component)/PreviewContract"
import { initContractAttribute } from "@/app/contract/[idContract]/(component)/(store)/storeContractData"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from '@/components/ui/icons';
import ChatBox from "@/components/ChatBox"
import { useParams } from "next/navigation"
import BreadCrumbHeader from "@/components/BreadCrumbHeader"
import { fetchAPI } from "@/utils/fetchAPI"
import { IContractParticipant } from "@/interface/contract.i"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [contractAttribute, setContractAttribute] = useState(initContractAttribute);
  const [contractData, setContractData] = useState<any>();
  const [contractParticipants, setContractParticipants] = useState<IContractParticipant[]>(
    [{
      id: "1",
      address: "0x1234567890",
      name: "Minh Tuan",
      email: "",
      status: "Active"
    }]
  );
  const [showChat, setShowChat] = useState(false);
  const { idContract } = useParams();
  useEffect(() => {
    fetchAPI(`/contracts/get-contract-details/${idContract}`, "GET")
      .then((response) => {
        console.log(response.data.participants);
        setContractAttribute(response.data.contractAttributes);
        setContractData(response.data.contract)
        setContractParticipants(response.data.participants)
      }).catch((error) => {
        console.log(error)
      })
  }, [])
  function handleBadgeColor(status: string) {
    switch (status) {
      case "JOINED":
        return `default`
      case "PENDING":
        return `blue`
      case "REFUSED":
        return `destructive`
      default:
        return `blue`
    }
  }
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <BreadCrumbHeader />
      <div className="flex justify-center">
        <main className="flex items-start py-4">
          <div className="min-w-[300px] px-3 flex-1">
            <Card className="overflow-hidden w-[420px]">
              <CardHeader className="flex flex-row items-start">
                <div className="w-full">
                  <CardTitle className="flex items-center text-lg">
                    Contract Infomation
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                  <Separator className="mt-4" />
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Name of Contract: <span>{contractData?.contractTitle}</span></div>

                  <div className="font-semibold">Created By:  <span>{contractData?.createdBy?.name}</span></div>
                  <div>
                    <div className="font-semibold">Contract Progress </div>
                    <Progress value={75} className="my-2" />
                    <div className="flex">
                      <div className="text-center ms-1 font-semibold">
                        Participated
                      </div>
                      <div className="ms-8 text-center font-semibold">
                        Signed <br /> Contract
                      </div>
                      <div className="ms-8 text-center font-semibold">
                        Enforce <br /> Contract
                      </div>
                      <div className="ms-5 text-center font-semibold">
                        Completed
                      </div>
                    </div>
                  </div>
                  <Separator className="" />
                  <div className="flex justify-center text-center items-center">
                    <Link href={`/contract/${idContract}/edit`}>
                      <Button className=" ms-1 text-white text-sm bg-gray-500 hover:bg-gray-500/90 outline-none border-none py-2 px-2 border rounded-md shadow">
                        Edit contract
                      </Button>
                    </Link>
                    <Button onClick={() => setShowChat(!showChat)} className=" ms-2 text-white text-sm bg-blue-500 hover:bg-blue-500/90 dark:text-white outline-none border-none py-2 px-2 border rounded-md shadow">
                      Discussion
                    </Button>
                    <Button
                      className="text-sm ms-2 bg-orange-500 hover:bg-orange-500/90 dark:text-white outline-none border-none py-2 px-2 pl-1 mr-1 border rounded-md shadow flex"
                    >
                      Action with Contract
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="mt-2">Participants</CardTitle>
                        <Button className="px-2" variant={"outline"}>
                          <Icons.userRoundPlus />
                        </Button>
                      </div>
                      <Separator className="mb-2" />
                    </CardHeader>
                    <ScrollArea className="max-h-[300px] h-72">
                      <CardContent className="grid gap-8">
                        {contractParticipants.map((participant, index) => (
                          <div className="flex items-center gap-4">
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">
                                {participant.name ? participant.name : "No Name"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {participant.email}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              <Badge variant={handleBadgeColor(participant.status) as any} className="me-2 mb-2" >{participant.status}</Badge>
                              <Button className="px-2" variant={"destructive"}>
                                <Icons.shieldPlus />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </ScrollArea>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="min-w-[650px] flex-1">
            <Card className="">
              <PreviewContract contractAttribute={contractAttribute} setContractAttribute={setContractAttribute} />
            </Card>
          </div>
          <div className="min-w-[300px] px-3 flex-1">
            <Card className="overflow-hidden w-[420px]">
              <CardHeader className="flex flex-row items-start">
                <div className="w-full">
                  <CardTitle className="flex items-center text-lg">
                    Contract Infomation
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                  <Separator className="mt-4" />
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Name of Contract: <span>{contractData?.contractTitle}</span></div>

                  <div className="font-semibold">Created By:  <span>{contractData?.createdBy?.name}</span></div>
                  <div>
                    <div className="font-semibold">Contract Progress </div>
                    <Progress value={75} className="my-2" />
                    <div className="flex">
                      <div className="text-center ms-1 font-semibold">
                        Participated
                      </div>
                      <div className="ms-8 text-center font-semibold">
                        Signed <br /> Contract
                      </div>
                      <div className="ms-8 text-center font-semibold">
                        Enforce <br /> Contract
                      </div>
                      <div className="ms-5 text-center font-semibold">
                        Completed
                      </div>
                    </div>
                  </div>
                  <Separator className="" />
                  <div className="flex justify-center text-center items-center">
                    <Link href={`/contract/${idContract}/edit`}>
                      <Button className=" ms-1 text-white text-sm bg-gray-500 hover:bg-gray-500/90 outline-none border-none py-2 px-2 border rounded-md shadow">
                        Edit contract
                      </Button>
                    </Link>
                    <Button onClick={() => setShowChat(!showChat)} className=" ms-2 text-white text-sm bg-blue-500 hover:bg-blue-500/90 dark:text-white outline-none border-none py-2 px-2 border rounded-md shadow">
                      Discussion
                    </Button>
                    <Button
                      className="text-sm ms-2 bg-orange-500 hover:bg-orange-500/90 dark:text-white outline-none border-none py-2 px-2 pl-1 mr-1 border rounded-md shadow flex"
                    >
                      Action with Contract
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="mt-2">Participants</CardTitle>
                        <Button className="px-2" variant={"outline"}>
                          <Icons.userRoundPlus />
                        </Button>
                      </div>
                      <Separator className="mb-2" />
                    </CardHeader>
                    <ScrollArea className="max-h-[300px] h-72">
                      <CardContent className="grid gap-8">
                        {contractParticipants.map((participant, index) => (
                          <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage src="/avatars/01.png" alt="Avatar" />
                              <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">
                                {participant.name ? participant.name : "No Name"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {participant.email}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              <Badge variant={handleBadgeColor(participant.status) as any} className="me-2 mb-2" >{participant.status}</Badge>
                              <Button className="px-2" variant={"destructive"}>
                                <Icons.shieldPlus />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </ScrollArea>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <ChatBox showChat={showChat} setShowChat={setShowChat}></ChatBox>
    </div>
  )
}
