'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import PreviewContract from '@/app/contract/[idContract]/(component)/PreviewContract'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Icons } from '@/components/ui/icons'
import ChatBox from '@/components/ChatBox'
import { useParams, useRouter } from 'next/navigation'
import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import {
  ContractData,
  EContractType,
  EFunctionCall,
  ERolesOfParticipant,
  EStageContractStatus,
  IContractAttribute,
  IContractCreateParams,
  IContractDisputeParams,
  IContractParticipant,
  IDisableButton,
  IIndividual,
  IStage,
  IVisibleButton,
  IVoteRatio,
  InvitationItem
} from '@/interface/contract.i'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useAppContext } from '@/components/ThemeProvider'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import InvitationArea from '@/components/InvitationArea'
import {
  calculateVoteRatio,
  fetchDataWhenEntryPage,
  getIndividualFromParticipant,
  handleCallFunctionOfBlockchain,
  handleOnDeployContractFunc,
  inviteNewParticipant,
  updateStateButton,
  withdrawMoneyDispute
} from '@/app/contract/[idContract]/(functionHandler)/functionHandler'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { initDisableButton, initRatioParticipant, initVisibleButton } from '@/constants/initVariable.constants'
import Dispute from './(component)/Dispute'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { initContractAttribute } from './(component)/(store)/storeContractData'
import Voting from '@/app/contract/[idContract]/(component)/Voting'

export default function Dashboard() {
  const [contractAttribute, setContractAttribute] = useState<IContractAttribute[]>(initContractAttribute)
  const [currentBalance, setCurrentBalance] = useState<number>(0)
  const [contractParticipants, setContractParticipants] = useState<IContractParticipant[]>([])
  const [contractData, setContractData] = useState<ContractData>()
  const [individual, setIndividual] = useState<IIndividual>({
    receiverInd: '',
    senderInd: '',
    totalAmount: ''
  })
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [isOpenEnterPrivateKey, setIsOpenEnterPrivateKey] = useState(false)
  const [messages, setMessages] = useState('')
  const [isDeployContractAlert, setIsDeployContractAlert] = useState(false)
  const [isCompareContractAlert, setIsCompareContractAlert] = useState(false)
  const [isCancelContractAlert, setIsCancelContractAlert] = useState(false)
  const [privateKey, setPrivateKey] = useState('')
  const [filePrivateKey, setFilePrivateKey] = useState<File>()
  const { userInfo, setUserInfo }: any = useAppContext()
  const [invitation, setInvitation] = useState<InvitationItem[]>([])
  const [contractStatus, setContractStatus] = useState<string>('')
  const [addressContract, setAddressContract] = useState<string>('')
  const [selectTypeKey, setSelectTypeKey] = useState(0)
  const { toast } = useToast()
  const [isDisableButton, setIsDisableButton] = useState<IDisableButton>(initDisableButton)
  const [isVisibleButton, setIsVisibleButton] = useState<IVisibleButton>(initVisibleButton)
  const [dependentInfo, setDependentInfo] = useState<{
    receiver: IContractParticipant | undefined
    sender: IContractParticipant | undefined
  }>()
  const [voteRatio, setVoteRatio] = useState<IVoteRatio>(initRatioParticipant)
  const [arbitratorUser, setArbitratorUser] = useState<IContractParticipant[]>()
  const [dialogInvite, setDialogInvite] = useState(false)
  const [stages, setStages] = useState<IStage[]>()
  const [nameFunctionCall, setNameFunctionCall] = useState<EFunctionCall>()
  const [showChat, setShowChat] = useState(false)
  const { idContract } = useParams()
  const Router = useRouter()
  // --------------------------------------------------------------------------------------------------------------------------------------------- //
  // fetchDataWhenEntryPage
  useEffect(() => {
    fetchDataWhenEntryPage(
      idContract,
      setContractAttribute,
      setContractData,
      setAddressContract,
      setContractParticipants,
      setIndividual,
      setCurrentBalance,
      setStages
    ).then((response) => {
      updateStateButton(
        response?.contractData.contract.status,
        setIsVisibleButton,
        setIsDisableButton,
        response?.contractData.participants,
        userInfo,
        response?.contractBallance ? response?.contractBallance : 0,
        response?.contractData?.contract
      )
      const { arbitrators, votes } = getIndividualFromParticipant(response?.contractData.participants)

      setVoteRatio({
        ...calculateVoteRatio(votes),
        votes
      })
      setArbitratorUser(arbitrators)
      setContractStatus(response?.contractData.contract.status)
      setDependentInfo(getIndividualFromParticipant(response?.contractData.participants))
    })
  }, [])
  // --------------------------------------------------------------------------------------------------------------------------------------------- //
  // onInviteParticipant
  useEffect(() => {
    if (
      individual.receiverInd !== undefined &&
      individual.senderInd !== undefined &&
      individual.totalAmount !== undefined &&
      contractData !== undefined &&
      individual.receiverInd !== '' &&
      individual.senderInd !== '' &&
      Number(individual.totalAmount) > 0 &&
      contractData.status === 'PARTICIPATED'
    ) {
      setIsDisableButton({
        ...isDisableButton,
        deployButton: false
      })
    }
  }, [individual])
  // --------------------------------------------------------------------------------------------------------------------------------------------- //
  function handleBadgeColor(status: string) {
    switch (status) {
      case 'PENDING':
        return `blue`
      case 'ACCEPTED':
        return `default`
      case 'SIGNED':
        return `default`
      default:
        return `blue`
    }
  }

  function inviteParticipant() {
    inviteNewParticipant(idContract, invitation, messages, setContractParticipants)
      .then((response) => {
        toast({
          title: response.message,
          variant: 'success'
        })
      })
      .catch((error) => {
        toast({
          title: 'Invitation failed to send',
          description: error,
          variant: 'destructive'
        })
      })
    setDialogInvite(false)
  }

  async function onCallFunctionInBlockchain() {
    setIsOpenEnterPrivateKey(false)
    const responseMessage = await handleCallFunctionOfBlockchain(
      {
        typeAuthentication: selectTypeKey,
        privateKey: privateKey,
        filePrivateKey: filePrivateKey
      },
      {
        nameFunctionCall,
        signContractParams: {
          addressContract,
          userInfo,
          setUserInfo,
          individual,
          contractParticipants,
          setContractParticipants,
          setIsVisibleButton,
          setIsDisableButton
        },
        transferFunctionParams: {
          addressContract,
          setCurrentBalance,
          individual,
          setUserInfo,
          userInfo,
          setIsVisibleButton,
          setIsDisableButton
        },
        confirmFunctionParams: {
          addressContract,
          userInfo,
          setUserInfo,
          individual,
          setIsDisableButton,
          setIsVisibleButton,
          contractParticipants,
          contractData
        },
        withdrawMoneyFunctionParams: {
          addressContract,
          setCurrentBalance,
          individual,
          setUserInfo,
          userInfo,
          setIsVisibleButton,
          setIsDisableButton,
          contractData
        },
        openDisputeFunctionParams: getDataToOpenDisputeContract(contractParticipants, userInfo?.data.addressWallet),
        compareContractFunctionParams: {
          idContract: idContract as string
        }
      }
    )
    if (responseMessage.contractId) Router.push(`/contract/${responseMessage.contractId}`)
    toast({
      title: responseMessage.message,
      variant: responseMessage.status,
      description: responseMessage.description
    })
  }

  function pickFilePrivateKey(e: any) {
    const files = e.target.files
    if (files) {
      setFilePrivateKey(files[0])
    } else {
      toast({
        title: 'Please choose a file !',
        variant: 'destructive'
      })
    }
  }

  async function handleOnDeployContract() {
    handleOnDeployContractFunc(
      individual,
      privateKey,
      stages,
      userInfo,
      setUserInfo,
      setAddressContract,
      setIsVisibleButton,
      setIsDisableButton,
      idContract
    ).then((result) => {
      toast({
        title: result?.messages,
        variant: result?.status as any,
        description: result?.description?.toString() || ''
      })
    })
    setIsDeployContractAlert(false)
  }

  async function handleCompareContractInformation() {}

  const getDataToOpenDisputeContract = (
    participantContract: IContractParticipant[],
    addressWallet: string
  ): IContractDisputeParams => {
    const { receiver, sender } = getIndividualFromParticipant(participantContract)
    return {
      addressWallet: addressWallet,
      customer: sender?.User?.addressWallet,
      supplier: receiver?.User?.addressWallet,
      parentId: idContract as string,
      totalAmount: Number(individual.totalAmount),
      userInfo,
      addressContract
    }
  }

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background'>
        <div className='relative mb-3 ml-auto flex flex-1 md:grow-0'>
          <div className='flex translate-x-[-15px]'>
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <div className='flex justify-center'>
        <main className='flex items-start py-4'>
          <div className='flex min-w-[300px] flex-1 justify-end px-3'>
            <Card className='h-[755px] w-[430px] overflow-hidden'>
              <CardHeader className='flex flex-row items-start'>
                <div className='w-full'>
                  <CardTitle className='flex items-center text-lg'>Contract Information</CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                  <Separator className='mt-4' />
                </div>
              </CardHeader>
              <CardContent className='pl-[18px] text-sm'>
                <div className='grid gap-3'>
                  <div className='font-semibold'>
                    Name of Contract: <span>{contractData?.contractTitle}</span>
                  </div>
                  <div className='font-semibold'>
                    {contractData?.type === EContractType.CONTRACT ? (
                      <>
                        Created By: <span>{contractData?.createdBy?.name}</span>
                      </>
                    ) : (
                      <div>
                        From Contract:{' '}
                        <div className='mt-2 flex'>
                          <Input className='me-2' value={contractData?.parentId} />
                          <Link href={`/contract/${contractData?.parentId}`}>
                            <Button>Go To Contract</Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='font-semibold'>
                    Address Contract:
                    <Input readOnly className='mt-2' value={addressContract} placeholder='Address Contract Empty' />
                  </div>
                  {contractData?.type === EContractType.CONTRACT ? (
                    <div>
                      <div className='font-semibold'>Contract Progress </div>
                      {contractStatus === 'PENDING' && <Progress value={0} className='my-2' />}
                      {contractStatus === 'PARTICIPATED' && <Progress value={25} className='my-2' />}
                      {contractStatus === 'ENFORCE' && <Progress value={50} className='my-2' />}
                      {contractStatus === 'SIGNED' && <Progress value={75} className='my-2' />}
                      {contractStatus === 'DISPUTED' && (
                        <Progress value={75} className='my-2 bg-destructive/20' color='bg-destructive' />
                      )}
                      {contractStatus === 'COMPLETED' && <Progress value={100} className='my-2' />}
                      <div className='flex'>
                        <div className='ms-1 text-center font-semibold'>Participated</div>
                        <div className='ms-8 text-center font-semibold'>Deployed</div>
                        <div className='ms-8 text-center font-semibold'>
                          Signed <br /> Contract
                        </div>
                        <div className='ms-10 text-center font-semibold'>Completed</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className='font-semibold'>Contract Dispute Progress </div>
                      {contractStatus === 'PARTICIPATED' && isDisableButton.setIsVotedAll === false && (
                        <Progress value={25} className='my-2' />
                      )}
                      {(contractStatus === 'VOTED' || isDisableButton.setIsVotedAll === true) && (
                        <Progress value={55} className='my-2' />
                      )}
                      {contractStatus === 'COMPLETED' && <Progress value={100} className='my-2' />}
                      <div className='flex'>
                        <div className='ms-1 text-center font-semibold'>Participated</div>
                        <div className='ms-20 text-center font-semibold'>Voted</div>
                        <div className='ms-24 text-center font-semibold'>Completed</div>
                      </div>
                    </div>
                  )}
                  <Separator className='' />
                  <div className='flex items-center justify-center text-center'>
                    <Button className='' disabled={false} variant={'violet'}>
                      <Link href={`/contract/${idContract}/edit`}>Edit contract</Link>
                    </Button>
                    <Button
                      onClick={() => setShowChat(!showChat)}
                      className='ms-2 w-full rounded-md border border-none bg-blue-500 px-2 py-2 text-sm text-white shadow outline-none hover:bg-blue-500/90 dark:text-white'
                    >
                      Chat
                    </Button>
                    <Button
                      disabled={isDisableButton.cancelButton}
                      variant={'destructive'}
                      className='ms-2'
                      onClick={() => {
                        setIsOpenEnterPrivateKey(true)
                        setNameFunctionCall(EFunctionCall.CANCEL_CONTRACT)
                        setPrivateKey('')
                      }}
                    >
                      Cancel The Contract
                    </Button>
                  </div>
                  <div className='flex'>
                    <Button
                      disabled={isDisableButton.fetchCompareButton}
                      onClick={() => {
                        setIsOpenEnterPrivateKey(true)
                        setNameFunctionCall(EFunctionCall.FETCH_COMPARE_CONTRACT)
                        setPrivateKey('')
                      }}
                    >
                      Fetch Blockchain to Compare Database
                    </Button>
                    <Button
                      disabled={isDisableButton.inviteButton}
                      variant={'orange'}
                      className='ms-2 w-full'
                      onClick={() => {
                        setDialogInvite(true)
                      }}
                    >
                      Invite
                    </Button>
                  </div>
                  {isVisibleButton.openDisputedButton && (
                    <Dispute
                      isDisableButton={isDisableButton}
                      isVisibleButton={isVisibleButton}
                      payload={getDataToOpenDisputeContract(contractParticipants, userInfo?.data.addressWallet)}
                      setIsOpenEnterPrivateKey={setIsOpenEnterPrivateKey}
                      setNameFunctionCall={setNameFunctionCall}
                      setPrivateKey={setPrivateKey}
                    />
                  )}
                  {isVisibleButton.goToDisputeButton && (
                    <Link href={`/contract/${contractData?.disputedContractId}`}>
                      <Button variant={'violet'} className='w-full'>
                        Go To Dispute Contract
                      </Button>
                    </Link>
                  )}
                  <div>
                    <Card className='h-[215px]'>
                      <CardContent className='text-sm'>
                        <div className='mt-4 w-full'>
                          <CardTitle className='flex items-center text-lg'>Individual Dependent</CardTitle>
                          <Separator className='mt-2' />
                        </div>
                        <ScrollArea className='mt-2 h-[140px]'>
                          <div className='px-2'>
                            {dependentInfo?.sender?.User?.name && (
                              <div className='mt-3 flex items-center'>
                                <div className='grid'>
                                  <p className='text-sm font-medium leading-none'>{dependentInfo.sender.User?.name}</p>
                                  <p className='text-sm text-muted-foreground'>
                                    {'*'.repeat(dependentInfo.sender.User?.addressWallet.length - 30) +
                                      dependentInfo.sender?.User.addressWallet.slice(-5)}
                                  </p>
                                </div>
                                <div className='ml-auto font-medium'>
                                  <Badge variant={'destructive'} className='me-1 translate-y-[-5px]'>
                                    Customer
                                  </Badge>
                                </div>
                              </div>
                            )}
                            {dependentInfo?.receiver?.User?.name && (
                              <div className='mt-3 flex items-center'>
                                <div className='grid'>
                                  <p className='text-sm font-medium leading-none'>
                                    {dependentInfo.receiver.User?.name}
                                  </p>
                                  <p className='text-sm text-muted-foreground'>
                                    {'*'.repeat(dependentInfo.receiver.User?.addressWallet.length - 30) +
                                      dependentInfo.receiver.User?.addressWallet.slice(-5)}
                                  </p>
                                </div>
                                <div className='ml-auto font-medium'>
                                  <Badge variant={'blue'} className='me-1 translate-y-[-5px]'>
                                    Supplier
                                  </Badge>
                                </div>
                              </div>
                            )}
                            {arbitratorUser?.map((item, index) => (
                              <div className='mt-3 flex items-center' key={index}>
                                <div className='grid'>
                                  <p className='text-sm font-medium leading-none'>{item?.User?.name || 'No Name'}</p>
                                  <p className='text-sm text-muted-foreground'>
                                    {'*'.repeat(item?.User?.addressWallet.length - 30) +
                                      item?.User?.addressWallet.slice(-5)}
                                  </p>
                                </div>
                                <div className='ml-auto font-medium'>
                                  <Badge variant={'default'} className='me-1 translate-y-[-5px]'>
                                    Arbitrator
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='min-w-[640px] flex-1'>
            <Card className=''>
              <PreviewContract contractAttribute={contractAttribute} setContractAttribute={setContractAttribute} />
            </Card>
          </div>
          <div className='h-[642px] min-w-[300px] flex-1 px-3'>
            <Card className='h-[755px] w-[420px] overflow-hidden'>
              <CardHeader className='flex flex-row items-start'>
                <div className='w-full'>
                  <CardTitle className='flex items-center text-lg'>Dependent Information</CardTitle>
                  <Separator className='mt-4' />
                </div>
              </CardHeader>
              <CardContent className='text-sm'>
                {contractData?.type === EContractType.CONTRACT && (
                  <div>
                    <div className='mt-2 grid gap-3'>
                      <div className='flex align-middle'>
                        <div className='font-semibold'>Sender Representative:</div>
                        <div className='ms-2 translate-y-[-7px]'>
                          <Input
                            readOnly
                            className='ms-3 w-[180px]'
                            placeholder='Empty'
                            defaultValue={individual?.senderInd}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 grid gap-3'>
                      <div className='flex align-middle'>
                        <div className='font-semibold'>Receiver Representative:</div>
                        <div className='ms-2 translate-y-[-7px]'>
                          <Input
                            readOnly
                            className='w-[180px]'
                            placeholder='Empty'
                            defaultValue={individual?.receiverInd}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 grid gap-3'>
                      <div className='flex align-middle'>
                        <div className='font-semibold'>Total Value Of Contract: </div>
                        <div className='translate-x-[15px] translate-y-[-7px]'>
                          <Input
                            readOnly
                            className='w-[180px]'
                            placeholder='Total Amount of Money'
                            defaultValue={`${individual?.totalAmount ? individual?.totalAmount + ' ETH' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 grid gap-3'>
                      <div className='flex align-middle'>
                        <div className='font-semibold'>Funds locked in Contract:</div>
                        <div className='translate-x-[5px] translate-y-[-7px]'>
                          <Input readOnly className='w-[180px]' value={currentBalance + ' ETH'} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {contractData?.type === EContractType.DISPUTE && (
                  <div>
                    <div className='mb-4'>
                      <div className='mb-2'>
                        <div className='flex justify-between'>
                          <div className='mb-1 font-semibold'>Customer </div>
                          <div className='flex justify-between'>
                            <div className='mt-1 font-semibold'>{voteRatio?.sender} %</div>
                          </div>
                        </div>
                        <div className='flex'>
                          <Progress value={voteRatio?.sender}></Progress>{' '}
                        </div>
                      </div>
                      <div className='mt-2'>
                        <div className='flex justify-between'>
                          <div className='mb-1 font-semibold'>Supplier </div>
                          <div className='flex justify-between'>
                            <div className='mt-1 font-semibold'>{voteRatio?.receiver} %</div>
                          </div>
                        </div>
                        <div className='flex'>
                          <Progress
                            color='bg-destructive'
                            className='bg-destructive/20'
                            value={voteRatio?.receiver}
                          ></Progress>{' '}
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 grid gap-3'>
                      <div className='flex align-middle'>
                        <div className='font-semibold'>Funds locked in Contract:</div>
                        <div className='ms-4 translate-y-[-7px]'>
                          <Input readOnly className='w-[180px]' value={currentBalance + ' ETH'} />
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 grid gap-3'>
                      <div className='flex align-middle'>
                        <div className='font-semibold'>Winner: </div>
                        <div className='ms-4 w-full translate-y-[-7px]'>
                          <Input
                            readOnly
                            placeholder='Address Wallet'
                            defaultValue={
                              contractData.status !== 'VOTED' && contractData.status !== 'COMPLETED'
                                ? 'Waiting for the result'
                                : voteRatio.receiver > voteRatio.sender
                                  ? individual.receiverInd
                                  : individual.senderInd
                            }
                          />
                        </div>
                        <div className='w-[40%]'>
                          <Badge className='ms-2 h-[20px] text-center'>
                            {contractData.status !== 'VOTED' && contractData.status !== 'COMPLETED'
                              ? 'Unknown'
                              : voteRatio.receiver > voteRatio.sender
                                ? 'Supplier'
                                : 'Customer'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Separator className='my-4' />
                {isVisibleButton.deployButton && (
                  <Button
                    disabled={isDisableButton.deployButton}
                    variant={'orange'}
                    className='w-full'
                    onClick={() => {
                      setIsDeployContractAlert(true)
                    }}
                  >
                    Deploy Contract
                  </Button>
                )}
                <Voting
                  isDisableButton={isDisableButton}
                  isVisibleButton={isVisibleButton}
                  individual={individual}
                  votes={voteRatio}
                  setVotes={setVoteRatio}
                  setIsDisableButton={setIsDisableButton}
                  userInfo={userInfo}
                />
                {isVisibleButton.signButton && (
                  <Button
                    disabled={isDisableButton.signButton}
                    variant={'blue'}
                    className='w-full'
                    onClick={() => {
                      setIsOpenEnterPrivateKey(true)
                      setNameFunctionCall(EFunctionCall.SIGN_CONTRACT)
                      setPrivateKey('')
                    }}
                  >
                    Sign Contract
                  </Button>
                )}
                {isVisibleButton.transferButton && (
                  <Button
                    disabled={isDisableButton.transferButton}
                    variant={'destructive'}
                    className='w-full'
                    onClick={() => {
                      setIsOpenEnterPrivateKey(true)
                      setNameFunctionCall(EFunctionCall.TRANSFER_CONTRACT)
                      setPrivateKey('')
                    }}
                  >
                    Transfer
                  </Button>
                )}
                {isVisibleButton.withdrawButton && (
                  <Button
                    disabled={isDisableButton.withdrawButton}
                    className='w-full'
                    onClick={() => {
                      if (contractData?.type === EContractType.DISPUTE) {
                        withdrawMoneyDispute({
                          addressWallet: contractData?.winnerAddressWallet as string,
                          addressContract: contractData?.contractAddress as string,
                          contractData: contractData,
                          setCurrentBalance,
                          setIsDisableButton,
                          setUserInfo
                        }).then((response) => {
                          toast({
                            title: response.message,
                            variant: response.status,
                            description: response.description
                          })
                        })
                      } else {
                        setIsOpenEnterPrivateKey(true)
                        setNameFunctionCall(EFunctionCall.WITHDRAW_CONTRACT)
                        setPrivateKey('')
                      }
                    }}
                  >
                    Withdraw
                  </Button>
                )}
                <div className='flex gap-2'>
                  {isVisibleButton.confirmButtonSender && (
                    <Button
                      disabled={isDisableButton.confirmButtonSender}
                      variant={'indigo'}
                      className='mt-2 w-full'
                      onClick={() => {
                        setIsOpenEnterPrivateKey(true)
                        setNameFunctionCall(EFunctionCall.CONFIRM_CONTRACT_SENDER)
                        setPrivateKey('')
                      }}
                    >
                      Customer confirmation completed
                    </Button>
                  )}
                  {isVisibleButton.confirmButtonReceiver && (
                    <Button
                      disabled={isDisableButton.confirmButtonReceiver}
                      variant={'indigo'}
                      className='mt-2 w-full'
                      onClick={() => {
                        setIsOpenEnterPrivateKey(true)
                        setNameFunctionCall(EFunctionCall.CONFIRM_CONTRACT_RECEIVER)
                        setPrivateKey('')
                      }}
                    >
                      Supplier confirmation completed
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {isVisibleButton.confirmButton && (
                        <Button variant={'destructive'} className='mt-2 w-full'>
                          Disputed
                        </Button>
                      )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure to create dispute contract?</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className='mx-auto max-w-md'>
                            <div className='flex flex-col space-y-2'>
                              <div className='flex'>
                                <div className='w-40'>Stage:</div>
                                <div className='flex-1'>
                                  <b>...</b>
                                </div>
                              </div>
                              <div className='flex'>
                                <div className='w-40'>Customer confirmed:</div>
                                <div className='flex-1'>
                                  <b>...</b>
                                </div>
                              </div>
                              <div className='flex'>
                                <div className='w-40'>Supplier confirmed:</div>
                                <div className='flex-1'>
                                  <b>...</b>
                                </div>
                              </div>
                              <div className='flex'>
                                <div className='w-40'>Total amount:</div>
                                <div className='flex-1'>
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
                <Separator className='my-4' />
                <div>
                  <Card className='h-[350px]'>
                    <CardHeader>
                      <div className='flex justify-between'>
                        <CardTitle className='mt-2 text-lg'>Participants</CardTitle>
                        <Button className='pt-2' variant={'outline'}>
                          <Icons.userRoundPlus className='h-4 w-4' />
                        </Button>
                      </div>
                      <Separator />
                    </CardHeader>
                    <ScrollArea className='px h-[250px] px-1'>
                      <CardContent className='grid gap-8 px-5'>
                        {contractParticipants.map((participant, index) => (
                          <div className='flex items-center' key={index}>
                            <div className='grid'>
                              <p className='text-sm font-medium leading-none'>
                                {participant?.User ? participant?.User?.name : 'No Name'}
                              </p>
                              <div className='marquee'>
                                <p className='text-[0.7rem] text-muted-foreground'>
                                  {participant.email.length > 25
                                    ? participant.email.substring(0, 23) + '...'
                                    : participant.email}
                                </p>
                              </div>
                            </div>
                            <div className='ml-auto font-medium'>
                              <Badge
                                variant={handleBadgeColor(participant.status)}
                                className='me-1 h-8 translate-y-[-5px]'
                              >
                                {participant.status}
                              </Badge>
                              <Button className='h-8 px-2' variant={'destructive'}>
                                <Icons.shieldPlus className='h-5 w-5' />
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
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog open={isDeployContractAlert} onOpenChange={setIsDeployContractAlert}>
            <AlertDialogContent>
              <AlertDialogTitle className='text-center'>Deploy Contract</AlertDialogTitle>
              <AlertDialogDescription className='text-center'>
                <b className='text-red-500'>
                  If you forget the private key, you will not be able to recover it and will lose access to the contract
                </b>
              </AlertDialogDescription>
              <Input
                placeholder='Fill your private key'
                className='w-full'
                type='password'
                onChange={(e) => {
                  setPrivateKey(e.target.value)
                }}
              />
              <div className='flex w-full'>
                <Button
                  className='me-2 ml-auto w-full'
                  variant={'destructive'}
                  onClick={() => {
                    setIsDeployContractAlert(false)
                  }}
                >
                  Close
                </Button>
                <Button className='ml-auto mr-auto w-full' variant={'violet'} onClick={handleOnDeployContract}>
                  Deploy Contract
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          {/* CALL ALERT DIALOG */}
          <AlertDialog open={isOpenEnterPrivateKey} onOpenChange={setIsOpenEnterPrivateKey}>
            <AlertDialogContent>
              <AlertDialogTitle className='text-center'>Enter your private key</AlertDialogTitle>
              <AlertDialogDescription className='text-center'>
                <b className='text-red-500'>
                  You must enter your private key to continue <br />
                  If you forget the private key, you will not be able to recover
                </b>
              </AlertDialogDescription>
              <div className='flex'>
                <Select
                  onValueChange={(e) => {
                    setPrivateKey('')
                    setFilePrivateKey(undefined)
                    setSelectTypeKey(Number(e))
                  }}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Type of Private Key' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type of Private Key</SelectLabel>
                      <SelectItem value='0'>Enter Your Private Key</SelectItem>
                      <SelectItem value='1'>Upload Signature</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {selectTypeKey === 0 && (
                  <Input
                    placeholder='Fill your private key'
                    className='ms-2 w-full'
                    type='password'
                    onChange={(e) => {
                      setPrivateKey(e.target.value)
                    }}
                  />
                )}
                {selectTypeKey === 1 && (
                  <Input
                    id='picture'
                    type='file'
                    accept='.pem'
                    className='ms-2'
                    onChange={(e) => {
                      pickFilePrivateKey(e)
                    }}
                  />
                )}
              </div>
              <div className='flex w-full'>
                <Button
                  className='me-2 ml-auto w-full'
                  variant={'destructive'}
                  onClick={() => {
                    setIsOpenEnterPrivateKey(false)
                  }}
                >
                  Close
                </Button>
                <Button
                  className='ml-auto mr-auto w-full'
                  variant={'violet'}
                  onClick={() => {
                    onCallFunctionInBlockchain()
                  }}
                >
                  Execute Function
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={isCompareContractAlert} onOpenChange={setIsCompareContractAlert}>
            <AlertDialogContent>
              <AlertDialogTitle className='text-center'>Fetch Blockchain to Compare Database</AlertDialogTitle>
              <AlertDialogDescription className='text-center'>
                <b className='text-red-500'>
                  If you forget the private key, you will not be able to recover it and will lose access to the contract
                </b>
              </AlertDialogDescription>
              <Input
                placeholder='Fill your private key'
                className='w-full'
                onChange={(e) => {
                  setPrivateKey(e.target.value)
                }}
              />
              <div className='flex w-full'>
                <Button
                  className='me-2 ml-auto w-full'
                  variant={'destructive'}
                  onClick={() => {
                    setIsCompareContractAlert(false)
                  }}
                >
                  Close
                </Button>
                <Button
                  className='ml-auto mr-auto w-full'
                  variant={'violet'}
                  onClick={handleCompareContractInformation}
                >
                  Compare Contract
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog open={isCancelContractAlert} onOpenChange={setIsCancelContractAlert}>
            <AlertDialogContent>
              <AlertDialogTitle className='text-center'>Cancel Contract</AlertDialogTitle>
              <AlertDialogDescription className='text-center'>
                <b className='text-red-500'>Once canceled, this action cannot be reversed.</b>
              </AlertDialogDescription>
              <div className='flex w-full'>
                <Button
                  className='me-2 ml-auto w-full'
                  variant={'destructive'}
                  onClick={() => {
                    setIsCancelContractAlert(false)
                  }}
                >
                  Close
                </Button>
                <Button className='ml-auto mr-auto w-full' variant={'violet'}>
                  Cancel Contract
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
      <ChatBox showChat={showChat} setShowChat={setShowChat}></ChatBox>
      <Dialog onOpenChange={setDialogInvite} open={dialogInvite}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Invitation Participant</DialogTitle>
            <DialogDescription>Invite your partner to join the contract</DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <Card className='min-w-[450px]'>
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
          <DialogFooter className='sm:justify-end'>
            <Button onClick={inviteParticipant}>Invite Participant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
