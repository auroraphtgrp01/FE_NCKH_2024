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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import ChatBox from "@/components/ChatBox";
import { useParams } from "next/navigation";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import { fetchAPI } from "@/utils/fetchAPI";
import {
  EContractAttributeType,
  IContractParticipant,
} from "@/interface/contract.i";
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
} from "@/components/ui/alert-dialog";
import { ethers } from "ethers";
import Web3 from "web3";
import { useAppContext } from "@/components/ThemeProvider";
import { set } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  interface IStage {
    percent: number;
    deliveryAt: number;
    description?: string;
  }

  const [contractAttribute, setContractAttribute] = useState(
    initContractAttribute
  );
  const [contractParticipants, setContractParticipants] = useState<any[]>([]);
  const [contractUsers, setContractUsers] = useState<any[]>([]);
  const [contractData, setContractData] = useState<any>();
  const [individual, setIndividual] = useState<any>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isDeployContractAlert, setIsDeployContractAlert] = useState(false);
  const [isCompareContractAlert, setIsCompareContractAlert] = useState(false);
  const [isCancelContractAlert, setIsCancelContractAlert] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const { userInfo, setUserInfo }: any = useAppContext();
  const [addressContract, setAddressContract] = useState("");
  const { toast } = useToast();
  const [isDisableButton, setIsDisableButton] = useState({
    isDeployButton: true,
    isWithdrawButton: true,
    isConfirmButton: true,
    isButtonConfirmCustomer: true,
    isButtonConfirmSupplier: true,
  });
  const [isVisible, setIsVisible] = useState({
    confirmButton: 0,
  });
  const [stages, setStages] = useState([
    {
      percent: 40,
      deliveryAt: "2024-07-16T00:00:00Z",
      description: "This is the first stage of the contract",
    },
    {
      percent: 60,
      deliveryAt: "2024-07-16T00:00:00Z",
      description: "This is the second stage of the contract",
    },
  ]);
  const [showChat, setShowChat] = useState(false);
  const { idContract } = useParams();
  useEffect(() => {
    // xxxxx
    fetchAPI(`/contracts/get-contract-details/${idContract}`, "GET")
      .then((response) => {
        const addressParties = response.data.contractAttributes.filter(
          (item: any) =>
            item.type == "Contract Attribute Address Wallet Send" ||
            item.type == "Contract Attribute Address Wallet Receive"
        );

        const detailParties: any[] = [];
        addressParties.forEach(async (address: any) => {
          await fetchAPI(`/users/${address.value.toLowerCase()}`, "GET").then(
            (response) => {
              detailParties.push(response.data.user);
            }
          );
        });
        console.log(detailParties);

        setContractUsers(detailParties);
        console.log(contractUsers);

        setContractAttribute(response.data.contractAttributes);
        setContractData(response.data.contract);
        setAddressContract(response.data.contract.contractAddress);
        setContractParticipants(response.data.participants);

        const dataIndividual = response.data.contractAttributes.reduce(
          (acc: any, item: any) => {
            if (
              item.type ===
              EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND
            ) {
              return { ...acc, senderInd: item.value as string };
            }
            if (
              item.type ===
              EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE
            ) {
              return { ...acc, receiverInd: item.value as string };
            }
            if (
              item.type ===
              EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED
            ) {
              return { ...acc, joined: item.value };
            }
            if (item.type === EContractAttributeType.TOTAL_AMOUNT) {
              return { ...acc, totalAmount: item.value as number };
            }
            return acc;
          },
          {} as any
        );
        setIndividual(dataIndividual);
        if (
          userInfo?.data?.addressWallet.trim().toLowerCase() ==
          dataIndividual.senderInd.trim().toLowerCase()
        ) {
          setIsVisible({
            ...isVisible,
            confirmButton: 1,
          });
        } else {
          setIsVisible({
            ...isVisible,
            confirmButton: 2,
          });
        }

        if (
          dataIndividual.senderInd &&
          dataIndividual.receiverInd &&
          dataIndividual.joined &&
          dataIndividual.totalAmount
        ) {
          setIndividual(dataIndividual);
          if (response.data.contract.status == "PARTICIPATED") {
            setIsDisableButton({
              ...isDisableButton,
              isDeployButton: false,
            });
          }
          if (response.data.contract.status == "SIGNED") {
            if (userInfo?.data?.addressWallet == dataIndividual.senderInd) {
              setIsDisableButton({
                ...isDisableButton,
                isButtonConfirmCustomer: false,
              });
            }
            if (userInfo?.data?.addressWallet == dataIndividual.receiverInd) {
              setIsDisableButton({
                ...isDisableButton,
                isButtonConfirmSupplier: false,
              });
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idContract]);
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
  function transferToByteCode(str: string | object) {
    return ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(str)));
  }
  async function transferMoney() {
    try {
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, addressContract as string);

      const x = await contract.methods.sendToSmartContract().send({
        from: userInfo?.data?.addressWallet,
        value: "5000000000000000000",
        gas: "1000000",
      });
      console.log(x);
      // const balance = await contract.methods.getBalance().call();
      // console.log("Contract balance:", balance);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDateStringToUint(date: string): number {
    return new Date(date).getTime();
  }

  async function handleOnDeployContract() {
    if (stages.length === 0)
      toast({
        title: "Please add at least 1 stage",
        variant: "destructive",
      });
    if (!individual.totalAmount || individual.totalAmount === 0)
      toast({
        title: "Total amount of money must be greater than 0",
        variant: "destructive",
      });
    if (stages.reduce((acc, item) => acc + item.percent, 0) !== 100)
      toast({
        title: "The total percentage of all stages must be 100%",
        variant: "destructive",
      });
    if (privateKey == "") {
      alert("Please fill your private key");
      return;
    }

    try {
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const byteCode = privateCode.data.abi.bytecode;
      setIsDeployContractAlert(false);
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi);
      const _user = [individual.senderInd];
      const _keys = ["contract", "contractAttributes"];
      const _values = [
        transferToByteCode(contractData),
        transferToByteCode(contractAttribute),
      ];
      const _total = individual.totalAmount;
      const _privateKey = privateKey;
      const _supplier = individual.receiverInd;
      const _stages: IStage[] = await Promise.all(
        stages.map(async (stage) => {
          return {
            percent: stage.percent,
            deliveryAt: handleDateStringToUint(stage.deliveryAt),
            description: stage.description ? stage.description : "",
          };
        })
      );

      const deployTransaction = await contract
        .deploy({
          data: byteCode,
          arguments: [
            _user,
            _supplier,
            _keys,
            _values,
            _total,
            _stages,
            _privateKey,
          ],
        })
        .send({
          from: userInfo?.data?.addressWallet,
        });

      fetchAPI("/contracts", "PATCH", {
        id: idContract,
        contractAddress: deployTransaction?.options?.address as string,
      });
      setAddressContract(deployTransaction?.options?.address as string);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleConfirmStages() {
    try {
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, addressContract as string);
      const confirm = await contract.methods
        .confirmStage()
        .send({ from: userInfo?.data?.addressWallet });
      if (confirm.events?.confirmedStage?.returnValues.isDone === true) {
        await contract.methods
          .withDrawByPercent(
            individual.receiverInd,
            confirm.events?.confirmedStage?.returnValues.percent
          )
          .send({ from: individual.receiverInd, gas: "100000000" });
      }

      // const stages = await contract.methods.getStages().call();
      // console.log("Stages:", stages);

      // const balance = await contract.methods.getBalance().call();
      // console.log("Contract balance:", balance);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCancelContract() {
    try {
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, addressContract as string);
      const cancel = await contract.methods
        .setStatus(1)
        .send({ from: userInfo?.data?.addressWallet });

      setIsCancelContractAlert(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCompareContractInfomation() {
    try {
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, addressContract as string);
      const compare: string[] = await contract.methods
        .getContractInformation(privateKey)
        .call({ from: userInfo?.data?.addressWallet });
      const contractAtbBC = JSON.parse(compare[1]);

      if (JSON.stringify(contractAtbBC) === JSON.stringify(contractAttribute)) {
        toast({
          title: "Contract is same",
          variant: "success",
        });
      } else
        toast({
          title: "Contract is different",
          variant: "destructive",
        });
      setIsCompareContractAlert(false);
    } catch (error) {
      console.log(error);
    }
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
          <div className="min-w-[300px] px-3 flex-1">
            <Card className="overflow-hidden w-[430px]">
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
                      Funds locked in a smart contract:
                    </div>
                    <div className="translate-y-[-15px] ms-3">
                      <Input
                        readOnly
                        className="mt-2 w-[155px]"
                        value={"100 ETH"}
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
                        Signed <br /> Contract
                      </div>
                      <div className="ms-8 text-center font-semibold">
                        Enforce <br /> Contract
                      </div>
                      <div className="ms-10 text-center font-semibold">
                        Completed
                      </div>
                    </div>
                  </div>
                  <Separator className="" />
                  <div className="flex justify-center text-center items-center">
                    <Link href={`/contract/${idContract}/edit`}>
                      <Button className="" variant={"violet"}>
                        Edit contract
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setShowChat(!showChat)}
                      className=" ms-2 text-white text-sm bg-blue-500 hover:bg-blue-500/90 dark:text-white outline-none border-none py-2 px-2 border rounded-md shadow"
                    >
                      Discussion
                    </Button>
                    <Button
                      variant={"destructive"}
                      className="ms-2"
                      onClick={() => setIsCancelContractAlert(true)}
                    >
                      Cancel The Contract
                    </Button>
                  </div>
                  <Button onClick={() => setIsCompareContractAlert(true)}>
                    Fetch Blockchain to Compare Database
                  </Button>
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
                                {user.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
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
          <div className="min-w-[300px] px-3 flex-1">
            <Card className="overflow-hidden w-[420px]">
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
                        defaultValue={individual?.joined}
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
                  {contractData?.status !== "ENFORCE" && (
                    <Button
                      disabled={isDisableButton?.isDeployButton}
                      variant={"orange"}
                      className="w-full"
                      onClick={() => {
                        setIsDeployContractAlert(true);
                      }}
                    >
                      Deploy Contract
                    </Button>
                  )}
                  {contractData?.status == "ENFORCE" && (
                    <Button
                      variant={"blue"}
                      className="w-full"
                      onClick={() => {}}
                    >
                      Sign Contract
                    </Button>
                  )}
                  <Button
                    variant={"destructive"}
                    className="ms-2 w-full"
                    onClick={transferMoney}
                  >
                    Transfer
                  </Button>
                  <Button
                    disabled={isDisableButton.isWithdrawButton}
                    className="ms-2 w-full"
                  >
                    Withdraw
                  </Button>
                </div>
                <div className="flex">
                  {isVisible.confirmButton === 1 && (
                    <Button
                      disabled={isDisableButton.isButtonConfirmCustomer}
                      variant={"indigo"}
                      className="w-full mt-2"
                      onClick={() => handleConfirmStages()}
                    >
                      Confirmation completed of Customer
                    </Button>
                  )}
                  {isVisible.confirmButton === 2 && (
                    <Button
                      disabled={isDisableButton.isButtonConfirmCustomer}
                      variant={"indigo"}
                      className="w-full mt-2"
                      onClick={() => handleConfirmStages()}
                    >
                      Confirmation completed of Supplier
                    </Button>
                  )}
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
                    <ScrollArea className="max-h-[300px] h-56">
                      <CardContent className="grid gap-8">
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
                  className="ml-auto mr-auto w-full"
                  variant={"violet"}
                  onClick={() => {
                    handleOnDeployContract();
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
                  onClick={() => {
                    handleCompareContractInfomation();
                  }}
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
    </div>
  );
}
