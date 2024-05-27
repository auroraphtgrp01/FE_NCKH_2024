"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PreviewContract from "@/app/contract/[idContract]/(component)/PreviewContract";
import { initContractAttribute } from "@/app/contract/[idContract]/(component)/(store)/storeContractData";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import ChatBox from "@/components/ChatBox";
import { useParams } from "next/navigation";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import { fetchAPI } from "@/utils/fetchAPI";
import { ContractData, IContractAttribute, IContractParticipant, IDisableButton, IIndividual, IVisibleButton, RSAKey } from "@/interface/contract.i";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import Web3 from "web3";
import { useAppContext } from "@/components/ThemeProvider";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InvitationArea from "@/components/InvitationArea";
import { InvitationItem } from "@/app/contract/create/page";
import { fetchDataWhenEntryPage, getContentFromFile, handleConfirmStagesFunc, handleDateStringToUint, handleOnDeployContractFunc, handleSignContractFunc, inviteNewParticipant, isExportPrivateKey, transferMoneyFunc, updateStateButton, withdrawMoneyFunc } from "@/app/contract/[idContract]/(functionHandler)/functionHandler";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
  const [contractAttribute, setContractAttribute] = useState<IContractAttribute[]>(initContractAttribute);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [contractParticipants, setContractParticipants] = useState<IContractParticipant[]>([]);
  const [contractUsers, setContractUsers] = useState<any[]>([]);
  const [contractData, setContractData] = useState<ContractData>();
  const [individual, setIndividual] = useState<IIndividual>({ receiverInd: "", senderInd: "", totalAmount: "" });
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenEnterPrivateKey, setIsOpenEnterPrivateKey] = useState(false);
  const [messages, setMessages] = useState("");
  const [isDeployContractAlert, setIsDeployContractAlert] = useState(false);
  const [isCompareContractAlert, setIsCompareContractAlert] = useState(false);
  const [isCancelContractAlert, setIsCancelContractAlert] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [filePrivateKey, setFilePrivateKey] = useState<File>();
  const { userInfo, setUserInfo }: any = useAppContext();
  const [invitation, setInvitation] = useState<InvitationItem[]>([]);
  const [addressContract, setAddressContract] = useState<string>("");
  const [selectTypeKey, setSelectTypeKey] = useState(0);
  const [rsaKey, setRsaKey] = useState<RSAKey>();
  const { toast } = useToast();
  const [isDisableButton, setIsDisableButton] = useState<IDisableButton>({
    fetchCompareButton: true,
    cancelButton: true,
    withdrawButton: true,
    transferButton: true,
    deployButton: true,
    editContractButton: true,
    signButton: true,
    confirmButtonSender: true,
    confirmButtonReceiver: true
  });
  const [isVisibleButton, setIsVisibleButton] = useState<IVisibleButton>({
    deployButton: false,
    withdrawButton: false,
    confirmButton: false,
    transferButton: false,
    buttonDisputed: false,
    signButton: false,
    confirmButtonSender: false,
    confirmButtonReceiver: false
  });
  const [dialogInvite, setDialogInvite] = useState(false);
  const [isHideButton, setIsHideButton] = useState({
    deployButton: false,
    signButton: false,
  });
  const [stages, setStages] = useState<any[]>([
    {
      percent: 100,
      deliveryAt: "2024-07-16T00:00:00Z",
      description: "This is the stage of the contract",
    },
  ]);
  const [showChat, setShowChat] = useState(false);
  const { idContract } = useParams();
  // --------------------------------------------------------------------------------------------------------------------------------------------- //
  // fetchDataWhenEntryPage
  useEffect(() => {
    fetchDataWhenEntryPage(
      idContract,
      setContractAttribute,
      setContractData,
      setAddressContract,
      setContractParticipants,
      setIndividual
    ).then((response) => {
      updateStateButton(response?.data.contract.status, response?.data.contractAttributes, setIsVisibleButton, setIsDisableButton, individual, response?.data.participants, userInfo);
      response?.data.participants.map((participant: any) => {
        if (participant?.userId === userInfo?.data?.id) {
          if (participant?.status === "SIGNED") {
            setIsDisableButton({
              ...isDisableButton,
              signButton: true
            });
          }
        }
      })
    })
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------------------------- //
  // onInviteParticipant
  useEffect(() => {
    if (individual.receiverInd !== "" && individual.senderInd !== "" && individual.totalAmount) {
      setIsDisableButton({
        ...isDisableButton,
        deployButton: false
      })
    }
  }, [individual])
  // --------------------------------------------------------------------------------------------------------------------------------------------- //
  function handleBadgeColor(status: string) {
    switch (status) {
      case "JOINED":
        return `default`;
      case "PENDING":
        return `blue`;
      case "REFUSED":
        return `destructive`;
      default:
        return `blue`;
    }
  }

  function inviteParticipant() {
    inviteNewParticipant(idContract, invitation, messages, setContractParticipants).then((response) => {
      toast({
        title: response.message,
        variant: "success",
      });
    }).catch((error) => {
      toast({
        title: "Invitation failed to send",
        description: error,
        variant: "destructive",
      });
    })
    setDialogInvite(false);
  }

  async function withdrawMoney() {
    withdrawMoneyFunc(addressContract, userInfo, individual)
      .then(() => { })
      .catch((error) => {
        toast({
          title: "Error occurred while withdrawing money",
          description: error,
          variant: "destructive",
        })
      })
  }

  async function transferMoney() {
    transferMoneyFunc(addressContract, userInfo, individual)
      .then(() => {
        toast({
          title: "Transfer successfully",
          variant: "success",
        });
      })
      .catch((error) => {
        toast({
          title: "Error occurred while transferring money",
          description: error,
          variant: "destructive",
        })
      })
  }

  async function handleBeforeCallFunction() {
    if (privateKey === "" && filePrivateKey === undefined) {
      toast({
        title: "Please fill your private key or upload your signature",
        variant: "destructive",
      })
      return
    }
    return new Promise((resolve) => {
      getContentFromFile(filePrivateKey as File, setRsaKey).then((result) => {
        if (result) {
          resolve(true)
        }
      })
    })
  }

  function pickFilePrivateKey(e: any) {
    const files = e.target.files;
    if (files) {
      setFilePrivateKey(files[0]);
    } else {
      toast({
        title: "Please choose a file !",
        variant: "destructive",
      })
    }
  }

  async function handleOnDeployContract() {
    handleOnDeployContractFunc(individual, privateKey, stages, userInfo, setAddressContract, setIsVisibleButton, setIsDisableButton, idContract).then((result) => {
      toast({
        title: result?.messages,
        variant: result?.status as any,
        description: result?.description?.toString() || "",
      })
    })
    setIsDeployContractAlert(false);
  }

  async function handleConfirmStages() {
    handleConfirmStagesFunc(addressContract, userInfo, individual, setIsDisableButton, setIsVisibleButton)
      .then(() => {
        toast({
          title: "Confirm successfully !",
          description: "You have confirmed the stage",
          variant: "success",
        });
      })
      .catch((error) => {
        toast({
          title: "Error occurred while confirming stage",
          description: error,
          variant: "destructive",
        });
      })
  }

  async function handleCancelContract() {
    try {
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, addressContract as string);
      await contract.methods
        .setStatus(1)
        .send({ from: userInfo?.data?.addressWallet });
      setIsCancelContractAlert(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCompareContractInformation() {
  }

  async function handleSignContract() {
    handleSignContractFunc(addressContract, userInfo, individual, contractParticipants, idContract, setIsVisibleButton, setIsDisableButton).then(() => {
      toast({
        title: "Sign successfully !",
        description: "You have signed the contract",
        variant: "success",
      });
    })
      .catch((error) => {
        toast({
          title: "Error occurred while signing contract",
          description: error,
          variant: "destructive",
        });
      })
  }

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
        <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
          <div className="flex translate-x-[-15px]">
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <div className="flex justify-center">
        <main className="flex items-start py-4">
          <div className="min-w-[300px] px-3 flex-1 flex justify-end">
            <Card className="overflow-hidden w-[430px]">
              <CardHeader className="flex flex-row items-start">
                {/* <Button onClick={() => {
                  setIsOpenEnterPrivateKey(true)
                  setPrivateKey('');
                }}>CALL</Button> */}
                <div className="w-full">
                  <CardTitle className="flex items-center text-lg">
                    Contract Information
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                  <Separator className="mt-4" />
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">
                    Name of Contract: <span>{contractData?.contractTitle}</span>
                  </div>
                  <div className="font-semibold">
                    Created By: <span>{contractData?.createdBy?.name}</span>
                  </div>
                  <div className="font-semibold">
                    Address Contract:
                    <Input readOnly className="mt-2" value={addressContract} />
                  </div>
                  <div className="flex align-middle mt-1">
                    <div className="font-semibold">
                      Funds locked in a Contract:
                    </div>
                    <div className="translate-y-[-15px] ms-3">
                      <Input
                        readOnly
                        className="mt-2 w-[155px]"
                        value={currentBalance + " ETH"}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Contract Progress </div>
                    <Progress value={25} className="my-2" />
                    <div className="flex">
                      <div className="text-center ms-1 font-semibold">
                        Participated
                      </div>
                      <div className="ms-8 text-center font-semibold">
                        Deployed
                      </div>
                      <div className="ms-8 text-center font-semibold">
                        Signed <br /> Contract
                      </div>
                      <div className="ms-10 text-center font-semibold">
                        Completed
                      </div>
                    </div>
                  </div>
                  <Separator className="" />
                  <div className="flex justify-center text-center items-center">
                    <Link href={`/contract/${idContract}/edit`}>
                      <Button className="" variant={"violet"} >
                        Edit contract
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setShowChat(!showChat)}
                      className=" ms-2 text-white text-sm bg-blue-500 hover:bg-blue-500/90 dark:text-white outline-none border-none py-2 px-2 border rounded-md shadow w-full"
                    >
                      Chat
                    </Button>
                    <Button
                      disabled={isDisableButton.cancelButton}
                      variant={"destructive"}
                      className="ms-2"
                      onClick={() => setIsCancelContractAlert(true)}
                    >
                      Cancel The Contract
                    </Button>
                  </div>
                  <div className="flex">
                    <Button disabled={isDisableButton.fetchCompareButton} onClick={() => setIsCompareContractAlert(true)}>
                      Fetch Blockchain to Compare Database
                    </Button>
                    <Button
                      variant={"orange"}
                      className="ms-2 w-full"
                      onClick={() => {
                        setDialogInvite(true);
                      }}
                    >
                      Invite
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="">
                          Contract Signing Status
                        </CardTitle>
                      </div>
                      <Separator className="mb-2" />
                    </CardHeader>
                    <ScrollArea className="max-h-[300px] h-[120px]">
                      <CardContent className="grid gap-8">
                        {contractUsers.map((user: any, index) => (
                          <div className="flex items-center gap-4" key={index}>
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">
                                {user.property}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ************************{user.value.slice(-5)}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              <Badge variant={"default"} className="me-2 mb-2">
                                Signed
                              </Badge>
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
          <div className="min-w-[640px] flex-1">
            <Card className="">
              <PreviewContract
                contractAttribute={contractAttribute}
                setContractAttribute={setContractAttribute}
              />
            </Card>
          </div>
          <div className="min-w-[300px] px-3 flex-1 h-[642px]">
            <Card className="overflow-hidden w-[420px] h-[755px]">
              <CardHeader className="flex flex-row items-start">
                <div className="w-full">
                  <CardTitle className="flex items-center text-lg">
                    Dependent Information
                  </CardTitle>
                  <Separator className="mt-4" />
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid gap-3 mt-2">
                  <div className="flex align-middle">
                    <div className="font-semibold">Sender Representative:</div>
                    <div className="translate-y-[-7px] ms-2">
                      <Input
                        readOnly
                        className="w-[180px] ms-3"
                        placeholder="Empty"
                        defaultValue={individual?.senderInd}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 mt-2">
                  <div className="flex align-middle">
                    <div className="font-semibold">
                      Receiver Representative:
                    </div>
                    <div className="translate-y-[-7px] ms-2">
                      <Input
                        readOnly
                        className="w-[180px]"
                        placeholder="Empty"
                        defaultValue={individual?.receiverInd}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 mt-2">
                  <div className="flex align-middle">
                    <div className="font-semibold">Joined Party :</div>
                    <div className="translate-y-[-7px] translate-x-[67px] ms-4">
                      <Input
                        readOnly
                        className="w-[180px]"
                        placeholder="Empty"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 mt-2">
                  <div className="flex align-middle">
                    <div className="font-semibold">Total Amount of Money:</div>
                    <div className="translate-y-[-7px] translate-x-[15px]">
                      <Input
                        readOnly
                        className="w-[180px]"
                        placeholder="Total Amount of Money"
                        defaultValue={individual?.totalAmount}
                      />
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex">
                  {isVisibleButton.deployButton && (
                    <Button
                      disabled={isDisableButton.deployButton}
                      variant={"orange"}
                      className="w-full"
                      onClick={() => {
                        setIsDeployContractAlert(true);
                      }}
                    >
                      Deploy Contract
                    </Button>
                  )}
                  {isVisibleButton.signButton && (
                    <Button
                      disabled={isDisableButton.signButton}
                      variant={"blue"}
                      className="w-full"
                      onClick={handleSignContract}
                    >
                      Sign Contract
                    </Button>
                  )}
                  {isVisibleButton.transferButton && (
                    <Button
                      disabled={isDisableButton.transferButton}
                      variant={"destructive"}
                      className="w-full"
                      onClick={transferMoney}
                    >
                      Transfer
                    </Button>
                  )}
                  {isVisibleButton.withdrawButton && (
                    <Button
                      disabled={isDisableButton.withdrawButton}
                      className="w-full"
                      onClick={withdrawMoney}
                    >
                      Withdraw
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  {isVisibleButton.confirmButtonSender && (
                    <Button
                      disabled={isDisableButton.confirmButtonSender}
                      variant={"indigo"}
                      className="w-full mt-2"
                      onClick={handleConfirmStages}
                    >
                      Customer confirmation completed
                    </Button>
                  )}
                  {isVisibleButton.confirmButtonReceiver && (
                    <Button
                      disabled={isDisableButton.confirmButtonReceiver}
                      variant={"indigo"}
                      className="w-full mt-2"
                      onClick={handleConfirmStages}
                    >
                      Supplier confirmation completed
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {isVisibleButton.confirmButton && (
                        <Button
                          variant={"destructive"}
                          className="w-full mt-2"
                        >
                          Disputed
                        </Button>
                      )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure to create dispute contract?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="max-w-md mx-auto">
                            <div className="flex flex-col space-y-2">
                              <div className="flex">
                                <div className="w-40">Stage:</div>
                                <div className="flex-1">
                                  <b>...</b>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-40">Customer confirmed:</div>
                                <div className="flex-1">
                                  <b>...</b>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-40">Supplier confirmed:</div>
                                <div className="flex-1">
                                  <b>...</b>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-40">Total amount:</div>
                                <div className="flex-1">
                                  <b>...</b>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction>Dispute</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
                    <ScrollArea className="max-h-[300px] h-full">
                      <CardContent className="grid gap-8 p-5">
                        {contractParticipants.map((participant, index) => (
                          <div className="flex items-center" key={index}>
                            <div className="grid">
                              <p className="text-sm font-medium leading-none">
                                {participant?.User
                                  ? participant?.User?.name
                                  : "No Name"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {participant.email}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              <Badge
                                variant={
                                  handleBadgeColor(participant.status) as any
                                }
                                className="me-1 translate-y-[-5px]"
                              >
                                {participant.status}
                              </Badge>
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
          <AlertDialog onOpenChange={setIsOpenAlert} open={isOpenAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog
            open={isDeployContractAlert}
            onOpenChange={setIsDeployContractAlert}
          >
            <AlertDialogContent>
              <AlertDialogTitle className="text-center">
                Deploy Contract
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <b className="text-red-500">
                  If you forget the private key, you will not be able to recover
                  it and will lose access to the contract
                </b>
              </AlertDialogDescription>
              <Input
                placeholder="Fill your private key"
                className="w-full"
                onChange={(e) => {
                  setPrivateKey(e.target.value);
                }}
              />
              <div className="w-full flex">
                <Button
                  className="ml-auto me-2 w-full "
                  variant={"destructive"}
                  onClick={() => {
                    setIsDeployContractAlert(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  hidden={isHideButton.deployButton}
                  className="ml-auto mr-auto w-full"
                  variant={"violet"}
                  onClick={handleOnDeployContract}
                >
                  Deploy Contract
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          {/* CALL ALERT DIALOG */}
          <AlertDialog
            open={isOpenEnterPrivateKey}
            onOpenChange={setIsOpenEnterPrivateKey}
          >
            <AlertDialogContent>
              <AlertDialogTitle className="text-center">
                Enter your private key
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <b className="text-red-500">
                  You must enter your private key to continue <br />
                  If you forget the private key, you will not be able to recover
                </b>
              </AlertDialogDescription>

              <div className="flex">
                <Select onValueChange={(e) => {
                  setPrivateKey('')
                  setFilePrivateKey(undefined)
                  setSelectTypeKey(Number(e))
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type of Private Key" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type of Private Key</SelectLabel>
                      <SelectItem value="0">Enter Your Private Key</SelectItem>
                      <SelectItem value="1">Upload Signature</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {selectTypeKey === 0 && (
                  <Input
                    placeholder="Fill your private key"
                    className="w-full ms-2"
                    onChange={(e) => {
                      setPrivateKey(e.target.value);
                      console.log(privateKey);
                    }}
                  />
                )}
                {selectTypeKey === 1 && (
                  <Input id="picture" type="file" accept=".pem" className="ms-2" onChange={(e) => {
                    pickFilePrivateKey(e)
                  }} />
                )}
              </div>
              <div className="w-full flex">
                <Button
                  className="ml-auto me-2 w-full "
                  variant={"destructive"}
                  onClick={() => {
                    setIsDeployContractAlert(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  hidden={isHideButton.deployButton}
                  className="ml-auto mr-auto w-full"
                  variant={"violet"}
                  onClick={() => {
                    handleBeforeCallFunction().then(() => {
                      console.log('CALL FUNCTION');
                    })
                  }}
                >
                  Deploy Contract
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={isCompareContractAlert}
            onOpenChange={setIsCompareContractAlert}
          >
            <AlertDialogContent>
              <AlertDialogTitle className="text-center">
                Fetch Blockchain to Compare Database
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <b className="text-red-500">
                  If you forget the private key, you will not be able to recover
                  it and will lose access to the contract
                </b>
              </AlertDialogDescription>
              <Input
                placeholder="Fill your private key"
                className="w-full"
                onChange={(e) => {
                  setPrivateKey(e.target.value);
                }}
              />
              <div className="w-full flex">
                <Button
                  className="ml-auto me-2 w-full "
                  variant={"destructive"}
                  onClick={() => {
                    setIsCompareContractAlert(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="ml-auto mr-auto w-full"
                  variant={"violet"}
                  onClick={handleCompareContractInformation}
                >
                  Compare Contract
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog
            open={isCancelContractAlert}
            onOpenChange={setIsCancelContractAlert}
          >
            <AlertDialogContent>
              <AlertDialogTitle className="text-center">
                Cancel Contract
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <b className="text-red-500">
                  Once canceled, this action cannot be reversed.
                </b>
              </AlertDialogDescription>
              <div className="w-full flex">
                <Button
                  className="ml-auto me-2 w-full "
                  variant={"destructive"}
                  onClick={() => {
                    setIsCancelContractAlert(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="ml-auto mr-auto w-full"
                  variant={"violet"}
                  onClick={() => {
                    handleCancelContract();
                  }}
                >
                  Cancel Contract
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
      <ChatBox showChat={showChat} setShowChat={setShowChat}></ChatBox>
      <Dialog onOpenChange={setDialogInvite} open={dialogInvite}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invitation Participant</DialogTitle>
            <DialogDescription>
              Invite your partner to join the contract
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Card className="min-w-[450px]">
              <CardContent>
                <InvitationArea
                  invitation={invitation}
                  setInvitation={setInvitation}
                  messages={messages}
                  setMessages={setMessages}
                  participant={contractParticipants}
                />
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button onClick={inviteParticipant}>Invite Participant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
