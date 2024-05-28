/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { IPermission } from "@/components/GrantPermission";
import { useAppContext } from "@/components/ThemeProvider";
import { fetchAPI } from "@/utils/fetchAPI";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import PreviewContract from "@/app/contract/[idContract]/(component)/PreviewContract";
import InvitationArea from "@/components/InvitationArea";
import Image from "next/image";

export interface InvitationItem {
  email: string;
  permission: IPermission;
  messages?: string;
}

export interface ContractTemplate {
  id: string;
  name: string;
  path: string;
  contractAttributes: any[];
}

export default function page() {
  const [template, setTemplate] = useState<ContractTemplate[]>([
    {
      id: "",
      name: "Empty Contract",
      path: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
      contractAttributes: [],
    },
  ]);
  const { userInfo, setUserInfo }: any = useAppContext();
  const { dataCreateContract, setDataCreateContract }: any = useAppContext();

  const [invitation, setInvitation] = useState<InvitationItem[]>([]);
  const [nameOfContractInput, setNameOfContractInput] = useState("");
  const [templateSelect, setTemplateSelect] = useState<any>(undefined);
  const [messages, setMessages] = useState("");
  const [contractAttribute, setContractAttribute] = useState<any[]>([]);
  const Router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    fetchAPI("/template-contracts", "GET").then((res) => {
      if (res.status === 200 || res.status === 201) {
        setTemplate([...res.data]);
        if (res.data.length !== 0)
          fetchAPI(
            `/template-contracts/${res.data[0]?.id}/attributes`,
            "GET"
          ).then((res) => {
            if (res.status === 200) {
              setContractAttribute(res.data.contractAttributes);
            }
          });
        else setContractAttribute([]);
      }
    });
  }, []);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  useEffect(() => {
    if (current !== 0) {
      fetchAPI(
        `/template-contracts/${template[current]?.id}/attributes`,
        "GET"
      ).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setContractAttribute(res.data.contractAttributes);
        }
      });
    } else {
      setContractAttribute([]);
    }
  }, [current]);
  async function onClickCreateContractButton() {
    console.log(nameOfContractInput, templateSelect, invitation, messages);

    const payload = {
      addressWallet: userInfo?.data?.addressWallet,
      name: nameOfContractInput,
      templateId: templateSelect?.id || undefined,
      invitation: invitation,
      messagesForInvitation: messages,
    };
    await fetchAPI("/contracts", "POST", payload)
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: "Create contract success",
            description: "You have successfully created a contract",
            variant: "success",
            duration: 1000,
          });
          Router.push(`/contract/${res.data.contract.id}`);
        }
      })
      .catch((err) => {
        toast({
          title: "Create contract failed",
          description: "Please check your information again",
          variant: "destructive",
          duration: 2000,
        });
      });
  }
  return (
    <div>
      <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
        <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
          <div className="flex translate-x-[-35px]">
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <div className="w-full flex container">
        <div className="flex py-4">
          <Card className="min-w-[320px]">
            <CardHeader>
              <CardTitle>Create a new Contract</CardTitle>
              <CardDescription>Please fill to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2 mt-2">
                <Label>Address Wallet: </Label>
                <Input
                  disabled
                  readOnly
                  defaultValue={userInfo?.data?.addressWallet}
                />
              </div>
              <div className="flex flex-col space-y-2 mt-2">
                <Label>Name of Contract: </Label>
                <Input
                  defaultValue={nameOfContractInput}
                  onChange={(e) => setNameOfContractInput(e.target.value)}
                />
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
                  <CarouselContent className="-mt-1 h-[300px]">
                    {template.map((item, index) => (
                      // <CarouselItem key={index} className="pt-1 md:basis-1/2">
                      //   <div className="p-1">
                      //     <Card>
                      //       <CardContent className="flex justify-center p-6">
                      //         {
                      //           <div className="h-[150px] mt-auto">
                      //             <Image
                      //               alt={item.name}
                      //               src={item.path}
                      //               width={"220"}
                      //               height={"120"}
                      //             ></Image>
                      //             {item.name}
                      //           </div>
                      //         }
                      //       </CardContent>
                      //     </Card>
                      //   </div>
                      // </CarouselItem>
                      <CarouselItem key={index} className="pt-1 md:basis-1/2">
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex flex-col items-center p-6">
                              <div className="h-[150px] w-[220px] relative">
                                <Image
                                  alt={item.name}
                                  src={item.path}
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded"
                                />
                              </div>
                              <div className="text-center mt-2">
                                {item.name}
                              </div>
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
              <Button
                className="w-full me-2"
                variant={"destructive"}
                onClick={() => {
                  setTemplateSelect(template[current]);
                }}
              >
                Choose a Template
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex py-4 ms-4">
          <Card className="min-w-[450px]">
            <CardHeader>
              <CardTitle>Infomation of Contract</CardTitle>
              <CardDescription>Please fill in all to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <InvitationArea
                invitation={invitation}
                setInvitation={setInvitation}
                messages={messages}
                setMessages={setMessages}
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full me-2"
                onClick={onClickCreateContractButton}
              >
                Create Contract
              </Button>
              <Button className="w=full" variant={"destructive"}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex py-4 ms-4 ">
          <Card className="min-w-[600px]">
            <CardHeader>
              <CardTitle className="text-center font-semibold text-lg ">
                {template[current]?.name}
              </CardTitle>
              <CardDescription>
                Preview the contract here - Please choose a template
              </CardDescription>
            </CardHeader>
            <ScrollArea className="h-[600px] ">
              <CardContent>
                <PreviewContract
                  contractAttribute={contractAttribute}
                  setContractAttribute={setContractAttribute}
                />
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
