import { initResponseMessages } from '@/constants/initVariable.constants'
import {
  ContractData,
  DynamicType,
  EContractAttributeType,
  EContractStatus,
  EContractType,
  EFunctionCall,
  ERolesOfParticipant,
  EStageContractStatus,
  ICompareContractParams,
  IConfirmStageFunctionCallParams,
  IContractAttribute,
  IContractCreateParams,
  IContractDisputeParams,
  IContractParticipant,
  IDisableButton,
  IIndividual,
  IResponseFunction,
  IResponseFunctionFetchData,
  ISignContractFunctionCallParams,
  IStage,
  ITransferMoneyFunctionCallParams,
  IVisibleButton,
  IVotes,
  IWithdrawMoneyDisputeContractParams,
  IWithdrawMoneyFunctionCallParams,
  InvitationItem,
  RSAKey,
  UserInfoData
} from '@/interface/contract.i'
import { fetchAPI } from '@/utils/fetchAPI'
import { updateUserInfoFromLocalStorage } from '@/utils/updateUserInfo'
import { handleInstanceWeb3 } from '@/utils/web3Instance'
import NodeRSA from 'node-rsa'
import { Dispatch, SetStateAction } from 'react'

const updateStateButton = (
  status: EContractStatus,
  setIsVisibleButton: Dispatch<SetStateAction<IVisibleButton>>,
  setIsDisableButton: Dispatch<SetStateAction<IDisableButton>>,
  contractParticipants: IContractParticipant[],
  userInfo: UserInfoData,
  currentBalance: number,
  contractData: ContractData
) => {
  const participantIsLogin = getParticipantInfoLogin(userInfo, contractParticipants)
  const isDisputeContract = contractData?.type === EContractType.DISPUTE
  const isUserArbitrator = participantIsLogin?.permission.ROLES === ('ARBITRATION' as ERolesOfParticipant)
  const isArbitrator = participantIsLogin?.permission.ROLES === ('ARBITRATION' as ERolesOfParticipant)
  if (contractParticipants?.length > 0) {
    const participantsLogin = contractParticipants?.find((participant: any) => {
      return participant.userId === userInfo?.data.id
    })
    switch (status) {
      case 'PENDING':
        setIsVisibleButton((prev: any) => ({
          ...prev,
          deployButton: true
        }))
        setIsDisableButton((prev: any) => ({ ...prev }))
        break
      case 'PARTICIPATED':
        setIsVisibleButton((prev: any) => ({
          ...prev,
          deployButton: !isDisputeContract,
          openDisputedButton: !isDisputeContract,
          voteButton: isUserArbitrator,
          withdrawButton: isDisputeContract && !isUserArbitrator
        }))
        setIsDisableButton((prev: any) => ({
          ...prev,
          cancelButton: false,
          voteButton: false
        }))
        break
      case 'ENFORCE':
        setIsVisibleButton((prev: any) => ({
          ...prev,
          deployButton: false,
          signButton: true,
          openDisputedButton: false
        }))
        setIsDisableButton((prev: any) => ({
          ...prev,
          editContractButton: true,
          inviteButton: true,
          cancelButton: true
        }))
        if (participantsLogin?.status !== 'SIGNED') {
          setIsDisableButton((prev: any) => ({
            ...prev,
            signButton: false,
            fetchCompareButton: false
          }))
        }
        break
      case 'SIGNED':
        const isDisputeContract = contractData?.type === EContractType.DISPUTE

        const hasStageNotStarted = contractData?.stages
          ? contractData?.stages.filter(
              (item: any) =>
                item.status === EStageContractStatus.ENFORCE || item.status === EStageContractStatus.OUT_OF_DATE
            )
          : []
        const hasStagePending = contractData?.stages
          ? contractData?.stages.filter((item: any) => item.status === EStageContractStatus.PENDING)
          : []
        const hasStageApproved = contractData?.stages
          ? contractData?.stages.filter((item: any) => item.status === EStageContractStatus.APPROVED)
          : []

        setIsVisibleButton((prev: any) => ({
          ...prev,
          signButton: false,
          confirmButtonSender: participantIsLogin?.permission.ROLES === ('SENDER' as ERolesOfParticipant),
          confirmButtonReceiver: participantIsLogin?.permission.ROLES === ('RECEIVER' as ERolesOfParticipant),
          transferButton:
            currentBalance > 0 ? false : participantIsLogin?.permission.ROLES === ('SENDER' as ERolesOfParticipant),
          withdrawButton: participantIsLogin?.permission.ROLES === ('RECEIVER' as ERolesOfParticipant),
          openDisputedButton: !isDisputeContract && currentBalance > 0
        }))
        setIsDisableButton((prev: any) => ({
          ...prev,
          transferButton: currentBalance !== 0,
          cancelButton: true,
          fetchCompareButton: false,
          confirmButtonReceiver:
            participantIsLogin?.permission.ROLES === ('RECEIVER' as ERolesOfParticipant) &&
            hasStageNotStarted.length > 0
              ? false
              : true,
          confirmButtonSender:
            (participantIsLogin?.permission.ROLES === ('SENDER' as ERolesOfParticipant)) !== undefined &&
            hasStagePending.length > 0
              ? false
              : true,
          editContractButton: true,
          inviteButton: true,
          withdrawButton: !(hasStageApproved.length > 0)
        }))
        break
      case 'DISPUTED':
        setIsVisibleButton((prev: any) => ({
          ...prev,
          openDisputedButton: !(contractData.status === EContractStatus.DISPUTED),
          goToDisputeButton: contractData.status === EContractStatus.DISPUTED,
          editContractButton: true,
          transferButton: true
        }))
        setIsDisableButton((prev) => ({
          ...prev,
          cancelButton: true,
          fetchCompareButton: false,
          inviteButton: true,
          editContractButton: true,
          transferButton: true
        }))
        break
      case 'VOTED':
        const isWinner =
          contractData.winnerAddressWallet?.toLowerCase().trim() === userInfo?.data.addressWallet?.toLowerCase().trim()
        setIsVisibleButton((prev) => ({
          ...prev,
          voteButton: isArbitrator,
          openDisputedButton: false,
          withdrawButton: !isArbitrator
        }))
        setIsDisableButton((prev) => ({
          ...prev,
          voteButton: true,
          withdrawButton: !isWinner,
          fetchCompareButton: false
        }))
        break
      case 'COMPLETED':
        setIsVisibleButton((prev) => ({
          ...prev,
          voteButton: isArbitrator,
          openDisputedButton: false,
          withdrawButton: !isArbitrator
        }))
        setIsDisableButton((prev) => ({
          ...prev,
          voteButton: true,
          withdrawButton: true,
          fetchCompareButton: false
        }))
      default:
        break
    }
  }
}

const fetchDataWhenEntryPage = async (
  idContract: string | string[],
  setContractAttribute: Dispatch<SetStateAction<IContractAttribute[]>>,
  setContractData: Dispatch<SetStateAction<ContractData | undefined>>,
  setAddressContract: Dispatch<SetStateAction<string>>,
  setContractParticipants: Dispatch<SetStateAction<IContractParticipant[]>>,
  setIndividual: Dispatch<SetStateAction<IIndividual>>,
  setCurrentBalance: Dispatch<SetStateAction<number>>,
  setStages: Dispatch<SetStateAction<IStage[] | undefined>>
): Promise<IResponseFunctionFetchData | undefined> => {
  try {
    const res = await fetchAPI(`/contracts/get-contract-details/${idContract}`, 'GET')
    const response: IResponseFunctionFetchData = { contractData: res.data }
    const { contract, participants, contractAttributes } = res.data
    if (contract.contractAddress !== null) {
      const privateCode = await fetchAPI(
        contract.type === EContractType.DISPUTE
          ? '/smart-contracts/abi?type=disputed'
          : '/smart-contracts/abi?type=supplyChain',
        'GET'
      )
      const abi = privateCode.data.abi.abi
      const { instance } = await handleInstanceWeb3()
      const contractInstance = new instance.eth.Contract(abi, contract.contractAddress)
      const contractBallance: number = parseFloat(
        instance.utils.fromWei(await contractInstance.methods.getBalance().call(), 'ether')
      )
      setCurrentBalance(contractBallance)
      response.contractBallance = contractBallance
    }

    const dataIndividual = res.data.contractAttributes.reduce((acc: any, item: any) => {
      switch (item.type) {
        case EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND:
          return { ...acc, senderInd: item.value as string }
        case EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE:
          return { ...acc, receiverInd: item.value as string }
        case EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED:
          return { ...acc, joined: item.value }
        case EContractAttributeType.TOTAL_AMOUNT:
          return { ...acc, totalAmount: item.value as number }
        default:
          return acc
      }
    }, {} as any)
    const contractAttributeStages = contractAttributes.filter(
      (item: any) => item.type === EContractAttributeType.CONTRACT_PAYMENT_STAGE
    )
    const today = new Date()
    const nextDate: Date = new Date()
    nextDate.setDate(today.getDate() + 3)

    const deliveryAt: string = nextDate.toISOString().split('T')[0] + ' ' + nextDate.toTimeString().split(' ')[0]
    const stages = contractAttributeStages.map((item: any) => {
      return {
        percent: item.value * 1,
        deliveryAt: deliveryAt,
        description: item.descriptionOfStage,
        status: EStageContractStatus.ENFORCE
      }
    })

    setAddressContract(contract.contractAddress)
    setContractParticipants(participants)
    setIndividual(dataIndividual)
    setContractAttribute(contractAttributes)
    setContractData(contract)
    setStages(stages)

    return response
  } catch (error) {
    console.error(error)
  }
}

const inviteNewParticipant = async (
  idContract: string | string[],
  invitation: InvitationItem[],
  messages: string,
  setContractParticipants: Dispatch<SetStateAction<IContractParticipant[]>>
) => {
  const payload = {
    contractId: idContract,
    invitation: invitation.map((item) => {
      return {
        ...item,
        messages
      }
    })
  }
  try {
    await fetchAPI('/participants/send-invitation', 'POST', payload)
    const newParticipants = invitation.map((item) => {
      return {
        status: 'PENDING',
        email: item.email
      }
    })
    setContractParticipants((prevParticipants: any) => [...prevParticipants, ...newParticipants])
    return {
      message: 'Invitation has been sent successfully!'
    }
  } catch (error) {
    throw error
  }
}

const withdrawMoneyFunc = async (dataParams: IWithdrawMoneyFunctionCallParams): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi }
      }
    } = await fetchAPI('/smart-contracts/abi?type=supplyChain', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract as string)
    const hasStageApproved = dataParams.contractData?.stages.filter(
      (item: any) => item.status === EStageContractStatus.APPROVED
    )
    const hasStageEnforce = dataParams.contractData?.stages.filter(
      (item: any) => item.status === EStageContractStatus.ENFORCE
    )
    if (hasStageApproved && hasStageApproved.length > 0) {
      hasStageApproved[0] = { ...hasStageApproved[0], status: EStageContractStatus.WITHDRAWN }
      await contract.methods
        .withDrawByPercent(dataParams.individual.receiverInd, hasStageApproved[0].percent, dataParams.privateKey)
        .send({ from: dataParams.userInfo?.data?.addressWallet, gas: '1000000' })

      const balanceContract: number = parseFloat(
        instance.utils.fromWei(await contract.methods.getBalance().call(), 'ether')
      )
      await fetchAPI('/contracts', 'PATCH', {
        id: dataParams.contractData?.id,
        stages: hasStageApproved
      })
      hasStageApproved.shift()
      dataParams.setCurrentBalance(balanceContract)
      dataParams.setIsDisableButton((prev: any) => ({
        ...prev,
        withdrawButton: hasStageApproved.length > 0 ? false : true,
        confirmButtonReceiver: hasStageEnforce && hasStageEnforce.length > 0 ? false : true
      }))
      const { balance } = await handleInstanceWeb3()
      updateUserInfoFromLocalStorage(
        {
          key: 'balance',
          value: balance
        },
        dataParams.setUserInfo
      )
      hasStageApproved.shift()
      if (hasStageApproved.length === 0)
        dataParams.setIsVisibleButton((prevState: any) => ({
          ...prevState,
          withdrawButton: true
        }))
      return {
        message: 'Withdraw money from contract Successfully !',
        description: 'The contract was successfully received',
        status: 'success'
      }
    } else {
      return {
        message: 'Withdraw money from contract Failed !',
        description: 'No stage has been completed',
        status: 'destructive'
      }
    }
  } catch (error) {
    return {
      message: 'Withdraw money from contract Failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}

const transferMoneyFunc = async (dataParams: ITransferMoneyFunctionCallParams): Promise<IResponseFunction> => {
  try {
    const privateCode = await fetchAPI('/smart-contracts/abi?type=supplyChain', 'GET')
    const abi = privateCode.data.abi.abi
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract as string)
    await contract.methods.sendToSmartContract(dataParams.privateKey).send({
      from: dataParams.userInfo.data.addressWallet,
      value: instance.utils.toWei(dataParams.individual.totalAmount, 'ether'),
      gas: '1000000'
    })

    const balanceContract: string = await contract.methods.getBalance().call()
    dataParams.setCurrentBalance(parseFloat(instance.utils.fromWei(balanceContract, 'ether')))
    dataParams.setIsVisibleButton((prevState: any) => ({
      ...prevState,
      transferButton: false,
      confirmButtonSender: true,
      openDisputedButton: true
    }))
    const { balance } = await handleInstanceWeb3()
    updateUserInfoFromLocalStorage(
      {
        key: 'balance',
        value: balance
      },
      dataParams.setUserInfo
    )
    return {
      message: 'Transfer money to contract Successfully !',
      description: 'The contract was successfully received',
      status: 'success'
    }
  } catch (error) {
    return {
      message: 'Transfer money to contract failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}

const handleDateStringToUint = (date: string): number => {
  return new Date(date).getTime()
}

const handleConfirmStagesFuncOfSupplier = async (
  dataParams: IConfirmStageFunctionCallParams
): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi }
      }
    } = await fetchAPI('/smart-contracts/abi?type=supplyChain', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract as string)
    await contract.methods.confirmStage(dataParams.privateKey).send({
      from: dataParams.userInfo?.data?.addressWallet,
      gas: '1000000'
    })

    const stageEnforce = dataParams.contractData?.stages.filter(
      (item: any) => item.status === EStageContractStatus.ENFORCE || item.status === EStageContractStatus.OUT_OF_DATE
    )
    if (stageEnforce && stageEnforce.length > 0) {
      const stageUpdates = stageEnforce

      stageUpdates[0] = { ...stageEnforce[0], status: EStageContractStatus.PENDING }

      await fetchAPI('/contracts', 'PATCH', {
        id: dataParams?.contractData?.id,
        stages: stageUpdates
      })
      stageEnforce.shift()
    } else
      return {
        message: 'Confirm Failed !',
        description: 'All stages have been completed',
        status: 'destructive'
      }

    dataParams.setIsDisableButton((prev: any) => ({
      ...prev,
      confirmButtonReceiver: stageEnforce?.length === 0 ? true : false
    }))
    return {
      message: 'Confirm Successfully !',
      description: 'Stage has been confirmed successfully',
      status: 'success'
    }
  } catch (error) {
    return {
      message: 'Confirm Failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}

const handleConfirmStagesFuncOfCustomer = async (
  dataParams: IConfirmStageFunctionCallParams
): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi }
      }
    } = await fetchAPI('/smart-contracts/abi?type=supplyChain', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract as string)

    await contract.methods.confirmStage(dataParams.privateKey).send({
      from: dataParams.userInfo?.data?.addressWallet,
      gas: '1000000'
    })

    const hasStagePending = dataParams.contractData?.stages.filter(
      (item: any) => (item.status = EStageContractStatus.PENDING)
    )
    if (hasStagePending && hasStagePending.length > 0) {
      const stageUpdates = hasStagePending

      stageUpdates[0] = { ...hasStagePending[0], status: EStageContractStatus.APPROVED }

      await fetchAPI('/contracts', 'PATCH', {
        id: dataParams?.contractData?.id,
        stages: stageUpdates
      })
      hasStagePending.shift()
    } else
      return {
        message: 'Confirm Failed !',
        description: 'All stages have been completed',
        status: 'destructive'
      }

    dataParams.setIsDisableButton((prev: any) => ({
      ...prev,
      confirmButtonSender: hasStagePending?.length === 0 ? true : false
    }))
    return {
      message: 'Confirm Successfully !',
      description: 'Stage has been confirmed successfully',
      status: 'success'
    }
  } catch (error) {
    return {
      message: 'Confirm Failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}

async function handleCompareContractInformationFunc(dataParams: ICompareContractParams): Promise<IResponseFunction> {
  try {
    const res = await fetchAPI(`/contracts/compare-attribute/${dataParams.idContract}`, 'GET')
    if (res.data.result) {
      return {
        message: 'Compare data contract success !',
        description: 'Match contract data',
        status: 'success'
      }
    } else {
      return {
        message: 'Compare data contract Failed !',
        description: 'Contract data does not match',
        status: 'destructive'
      }
    }
    // const { data: { abi: { abi } } } = await fetchAPI("/smart-contracts/abi", "GET");
    // const { instance } = await handleInstanceWeb3();
    // const contract = new instance.eth.Contract(abi, addressContract as string);
    // const compare: string[] = await contract.methods.getContractInformation(privateKey)
    //     .call({ from: userInfo?.data?.addressWallet });
    // const contractAttributesFromBlockchain = JSON.parse(compare[1]);
    // if (JSON.stringify(contractAttributesFromBlockchain) === JSON.stringify(contractAttribute)) {
    //     toast({
    //         title: "Contract is same",
    //         variant: "success",
    //     });
    // } else {
    //     toast({
    //         title: "Contract is different",
    //         variant: "destructive",
    //     });
    // }
    // setIsCompareContractAlert(false);
  } catch (error) {
    return {
      message: 'Compare data contract Failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}
const handleSignContractFunc = async (dataParams: ISignContractFunctionCallParams): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi }
      }
    } = await fetchAPI('/smart-contracts/abi?type=supplyChain', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract)
    await contract.methods.sign(dataParams.userInfo?.data?.addressWallet.toString(), dataParams.privateKey).send({
      from: dataParams.userInfo?.data?.addressWallet,
      gas: '1000000'
    })
    const findParticipant = dataParams.contractParticipants.find(
      (item: any) => item.userId === dataParams.userInfo?.data?.id
    )
    const response = await fetchAPI('/participants', 'PATCH', {
      id: findParticipant?.id,
      status: 'SIGNED'
    })
    const indexChanged = dataParams.contractParticipants.findIndex((item: any) => item === findParticipant)
    dataParams.contractParticipants[indexChanged] = {
      ...dataParams.contractParticipants[indexChanged],
      status: 'SIGNED'
    }
    dataParams.setContractParticipants(dataParams.contractParticipants)
    const { balance } = await handleInstanceWeb3()
    updateUserInfoFromLocalStorage(
      {
        key: 'balance',
        value: balance
      },
      dataParams.setUserInfo
    )
    if (response.data.contractStatus === 'SIGNED') {
      const isCondition =
        (dataParams.userInfo?.data?.addressWallet?.trim().toLowerCase() || '') ===
        (dataParams.individual.senderInd?.trim().toLowerCase() || '')

      if (isCondition) {
        dataParams.setIsVisibleButton((prevState: any) => ({
          ...prevState,
          signButton: false,
          transferButton: true,
          confirmButtonSender: true,
          openDisputedButton: true
        }))
        dataParams.setIsDisableButton((prevState: any) => ({
          ...prevState,
          transferButton: false,
          confirmButtonSender: true
        }))
      } else {
        dataParams.setIsVisibleButton((prevState: any) => ({
          ...prevState,
          signButton: false,
          withdrawButton: true,
          confirmButtonReceiver: true
        }))
        dataParams.setIsDisableButton((prevState: any) => ({
          ...prevState,
          withdrawButton: true
        }))
      }
    } else {
      dataParams.setIsDisableButton((prevState: any) => ({
        ...prevState,
        signButton: true
      }))
    }
    return {
      message: 'Sign Successfully !',
      description: 'Contract has been signed successfully',
      status: 'success'
    }
  } catch (error) {
    return {
      message: 'Sign Failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}

const handleOnDeployContractFunc = async (
  individual: IIndividual,
  privateKey: string,
  stages: any,
  userInfo: UserInfoData,
  setUserInfo: Dispatch<SetStateAction<UserInfoData>>,
  setAddressContract: Dispatch<SetStateAction<string>>,
  setIsVisibleButton: Dispatch<SetStateAction<IVisibleButton>>,
  setIsDisableButton: Dispatch<SetStateAction<IDisableButton>>,
  idContract: string | string[]
) => {
  if (!individual.totalAmount || individual.totalAmount === '0') {
    return {
      message: 'Total amount of money must be greater than 0',
      status: 'destructive'
    }
  }
  if (!privateKey) {
    return {
      message: 'Private key is required to deploy contract',
      status: 'destructive'
    }
  }
  try {
    const privateCode = await fetchAPI('/smart-contracts/abi?type=supplyChain', 'GET')
    const abi = privateCode.data.abi.abi
    const byteCode = privateCode.data.abi.bytecode
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi)
    const _user = [individual.senderInd.trim().toLowerCase()]
    const _total = individual.totalAmount
    const _supplier = individual.receiverInd.trim().toLowerCase()
    const { publicKey } = signMessage(privateKey)
    const _privateKey = await hashStringWithSHA512(privateKey)
    let _stages: IStage[]
    const today = new Date()
    const nextDate: Date = new Date()
    nextDate.setDate(today.getDate() + 3)
    const deliveryAt: string = nextDate.toISOString().split('T')[0] + ' ' + nextDate.toTimeString().split(' ')[0]
    if (stages && stages.length !== 0) {
      _stages = await Promise.all(
        stages.map(async (stage: any) => {
          stage.status = 'ENFORCE'
          return {
            percent: stage.percent,
            deliveryAt: handleDateStringToUint(stage.deliveryAt),
            description: stage.description || '',
            status: stage.status
          }
        })
      )
    } else {
      _stages = [
        {
          percent: 100,
          deliveryAt: handleDateStringToUint(deliveryAt),
          description: 'The contract has been enforced',
          status: EStageContractStatus.ENFORCE
        }
      ]
    }

    const deployTransaction = await contract
      .deploy({
        data: byteCode,
        arguments: [_user, _supplier, instance.utils.toWei(_total, 'ether'), _stages, _privateKey]
      })
      .send({
        from: userInfo?.data?.addressWallet
      })
    const { balance } = await handleInstanceWeb3()
    updateUserInfoFromLocalStorage(
      {
        key: 'balance',
        value: balance
      },
      setUserInfo
    )
    setAddressContract(deployTransaction?.options?.address as string)
    setIsVisibleButton((prevState: any) => ({
      ...prevState,
      deployButton: false,
      signButton: true
    }))
    setIsDisableButton((prevState: any) => ({
      ...prevState,
      transferButton: true,
      deployButton: true,
      signButton: false,
      inviteButton: true,
      cancelButton: true,
      editContractButton: true
    }))
    await Promise.all([
      fetchAPI('/contracts', 'PATCH', {
        id: idContract,
        contractAddress: deployTransaction?.options?.address as string,
        status: 'ENFORCE',
        stages:
          stages.length > 0
            ? stages
            : [
                {
                  percent: 100,
                  deliveryAt: deliveryAt,
                  description: 'The contract has been enforced',
                  status: EStageContractStatus.ENFORCE
                }
              ]
      }),
      fetchAPI('/contracts/handle-deploy', 'POST', {
        contractId: idContract
      })
    ])
    isExportPrivateKey(idContract, _privateKey, publicKey)
    return {
      messages: 'Deploy Successfully',
      description: `Contract address: ${deployTransaction.options.address}`,
      status: 'success'
    }
  } catch (error) {
    console.log('Error occurred while deploying contract:', error)

    return {
      message: 'Deploy Failed',
      description: error,
      status: 'destructive'
    }
  }
}

const isExportPrivateKey = (contractId: string | string[], signature: string, publicKey: string) => {
  let data = new Blob([`${publicKey}\n\n\n-----BEGIN PRIVATE KEY-----\n${signature}\n -----END PRIVATE KEY-----`], {
    type: 'text/csv'
  })
  let csvURL = window.URL.createObjectURL(data)
  const tempLink = document.createElement('a')
  tempLink.href = csvURL
  tempLink.setAttribute('download', `PK_${contractId}.pem`)
  tempLink.click()
}

function signMessage(message: string) {
  const bitLength: number = 1024
  const rsaKeyPair: NodeRSA = new NodeRSA({ b: bitLength })
  const publicKey: string = rsaKeyPair.exportKey('public')
  const signer = new NodeRSA(rsaKeyPair.exportKey('private'))
  return {
    signature: signer.sign(message, 'base64'),
    publicKey
  }
}

function verifySignature(message: string, signature: string, publicKey: string): boolean {
  const verifier = new NodeRSA()
  verifier.importKey(publicKey, 'public')
  return verifier.verify(Buffer.from(message), Buffer.from(signature, 'base64'))
}

export const getContentFromFile = async (
  file: File | undefined
): Promise<{ publicKey: string; privateKey: string } | null> => {
  if (!file) return null
  try {
    const reader = new FileReader()
    const result = await new Promise<string>((resolve, reject) => {
      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as string)
        }
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsText(file)
    })
    const { publicKey, privateKey } = extractKeys(result)
    return { publicKey, privateKey }
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
}

const extractKeys = (keyString: string) => {
  const publicKeyRegex = /-----BEGIN PUBLIC KEY-----(.|\n)*?-----END PUBLIC KEY-----/
  const privateKeyRegex = /-----BEGIN PRIVATE KEY-----(.|\n)*?-----END PRIVATE KEY-----/
  const publicKeyMatch = keyString.match(publicKeyRegex)
  const privateKeyMatch = keyString.match(privateKeyRegex)
  const publicKey = publicKeyMatch ? publicKeyMatch[0] : ''
  const privateKeyEx = privateKeyMatch ? privateKeyMatch[0] : ''
  const headerFooterRegex = /-----BEGIN PRIVATE KEY-----(.|\n)*?-----END PRIVATE KEY-----/
  const match = privateKeyEx.match(headerFooterRegex)
  const privateKeyContent = match ? match[0] : ''
  const privateKey = privateKeyContent
    .split('\n')
    .filter((line) => !line.includes('BEGIN') && !line.includes('END'))
    .join('\n')
  return { publicKey, privateKey }
}

async function hashStringWithSHA512(input: string | undefined): Promise<string> {
  if (!input) return ''
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-512', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return hashHex
}

const handleCallFunctionOfBlockchain = async (
  dataAuthentication: {
    typeAuthentication: number
    filePrivateKey?: File | undefined
    privateKey?: string
  },
  dataFunctionCall: {
    nameFunctionCall: EFunctionCall | undefined
    signContractParams?: ISignContractFunctionCallParams
    transferFunctionParams?: ITransferMoneyFunctionCallParams
    confirmFunctionParams?: IConfirmStageFunctionCallParams
    withdrawMoneyFunctionParams?: IWithdrawMoneyFunctionCallParams
    openDisputeFunctionParams?: IContractDisputeParams
    compareContractFunctionParams?: ICompareContractParams
  }
): Promise<IResponseFunction> => {
  if (dataAuthentication.privateKey === '' && dataAuthentication.filePrivateKey === undefined) {
    return {
      description: 'Please fill your private key or upload your signature',
      message: 'Private key or signature is required',
      status: 'destructive'
    }
  }
  let privateKey: string = ''
  switch (dataAuthentication.typeAuthentication) {
    case 0:
      const privateKeyGen = await hashStringWithSHA512(dataAuthentication.privateKey)
      privateKey = privateKeyGen
      break
    case 1:
      const privateMessage = await getContentFromFile(dataAuthentication.filePrivateKey)
      privateKey = privateMessage?.privateKey || ''
      break
  }
  let responseMessages: IResponseFunction = initResponseMessages
  switch (dataFunctionCall.nameFunctionCall) {
    case EFunctionCall.FETCH_COMPARE_CONTRACT:
      responseMessages = await handleCompareContractInformationFunc({
        ...dataFunctionCall.compareContractFunctionParams
      } as ICompareContractParams)
      break
    case EFunctionCall.CANCEL_CONTRACT:
      break
    case EFunctionCall.WITHDRAW_CONTRACT:
      responseMessages = await withdrawMoneyFunc({
        ...dataFunctionCall.withdrawMoneyFunctionParams,
        privateKey
      } as IWithdrawMoneyFunctionCallParams)
      break
    case EFunctionCall.TRANSFER_CONTRACT:
      responseMessages = await transferMoneyFunc({
        ...dataFunctionCall.transferFunctionParams,
        privateKey
      } as ITransferMoneyFunctionCallParams)
      break
    case EFunctionCall.SIGN_CONTRACT:
      responseMessages = await handleSignContractFunc({
        ...dataFunctionCall.signContractParams,
        privateKey
      } as ISignContractFunctionCallParams)
      break
    case EFunctionCall.CONFIRM_CONTRACT_SENDER:
      responseMessages = await handleConfirmStagesFuncOfCustomer({
        ...dataFunctionCall.confirmFunctionParams,
        privateKey
      } as IConfirmStageFunctionCallParams)
      break
    case EFunctionCall.CONFIRM_CONTRACT_RECEIVER:
      responseMessages = await handleConfirmStagesFuncOfSupplier({
        ...dataFunctionCall.confirmFunctionParams,
        privateKey
      } as IConfirmStageFunctionCallParams)
      break
    case EFunctionCall.ON_OPEN_DISPUTE_CONTRACT:
      responseMessages = await onOpenDisputeContract({
        ...dataFunctionCall.openDisputeFunctionParams,
        privateKey
      } as IContractDisputeParams)
  }
  return responseMessages
}

const onCreateANewContract = async (dataParams: IContractCreateParams): Promise<IResponseFunction> => {
  try {
    const res = await fetchAPI(
      '/contracts',
      'POST',
      dataParams.templateId === ''
        ? (({ templateId, ...rest }) => rest)(dataParams)
        : { ...dataParams, isCreateAttributeValue: true }
    )
    if (res.status === 201) {
      return {
        message: 'Create contract successfully',
        status: 'success',
        description: 'Contract has been created successfully',
        contractId: res.data.contract.id
      }
    } else {
      return {
        message: 'Create contract failed',
        status: 'destructive',
        description: 'Error occurred while creating contract'
      }
    }
  } catch (err) {
    return {
      message: 'Create contract failed',
      status: 'destructive',
      description: err?.toString()
    }
  }
}

const onOpenDisputeContract = async (dataParams: IContractDisputeParams): Promise<IResponseFunction> => {
  try {
    const privateCodeDispute = await fetchAPI('/smart-contracts/abi?type=disputed', 'GET')
    const privateCode = await fetchAPI('/smart-contracts/abi?type=supplyChain', 'GET')
    const abiDispute = privateCodeDispute.data.abi.abi
    const abi = privateCode.data.abi.abi
    const byteCodeDispute = privateCodeDispute.data.abi.bytecode

    const { instance } = await handleInstanceWeb3()
    const contractDispute = new instance.eth.Contract(abiDispute)
    const contract = new instance.eth.Contract(abi, dataParams?.addressContract as string)
    const _user = dataParams.customer
    const _supplier = dataParams.supplier
    const deployTransaction = await contractDispute
      .deploy({
        data: byteCodeDispute,
        arguments: [_supplier, _user]
      })
      .send({
        from: dataParams.userInfo?.data?.addressWallet,
        gas: '1000000'
      })
    await contract.methods
      .transferTokenToDisputeContract(
        deployTransaction?.options?.address as string,
        instance.utils.toWei(dataParams?.totalAmount, 'ether'),
        dataParams.privateKey
      )
      .send({ from: dataParams.userInfo?.data?.addressWallet, gas: '1000000' })

    const res = await fetchAPI('/contracts/dispute-contract', 'POST', {
      ...dataParams,
      contractAddress: deployTransaction?.options?.address
    })
    await fetchAPI('/contracts', 'PATCH', {
      id: dataParams.parentId,
      disputedContractId: res.data.id,
      status: 'DISPUTED'
    })
    if (res.status === 201) {
      return {
        message: 'Create contract successfully',
        status: 'success',
        description: 'Contract has been created successfully',
        contractId: res.data.id
      }
    } else {
      return {
        message: 'Create contract failed',
        status: 'destructive',
        description: 'Error occurred while creating contract'
      }
    }
  } catch (err) {
    return {
      message: 'Create contract failed',
      status: 'destructive',
      description: err?.toString()
    }
  }
}

const getDataToOpenDisputeContract = (
  participantContract: IContractParticipant[],
  addressWallet: string
): IContractCreateParams => {
  const invitations = participantContract.map((item) => {
    if (
      item.permission?.ROLES === ERolesOfParticipant.SENDER ||
      item.permission?.ROLES === ERolesOfParticipant.RECEIVER
    )
      return {
        email: item.email,
        permission: item.permission,
        messages: 'You have a invitation to join a dispute contract'
      }
  })
  return {
    addressWallet,
    name: 'Disputed Contract - Supply Chain Management',
    type: 'DISPUTE',
    templateId: 'ac321ca5-1393-4474-9f09-f8d09ab15b1d',
    invitation: invitations as InvitationItem[]
  }
}

const getIndividualFromParticipant = (
  participant: IContractParticipant[]
): {
  receiver: IContractParticipant | undefined
  sender: IContractParticipant | undefined
  arbitrators: IContractParticipant[]
  votes: IVotes[]
} => {
  const receiver = participant?.find((item) => item.permission?.ROLES == ('RECEIVER' as ERolesOfParticipant))
  const sender = participant?.find((item) => item.permission?.ROLES == ('SENDER' as ERolesOfParticipant))
  const arbitrators = participant?.filter((item) => item.permission?.ROLES == ('ARBITRATION' as ERolesOfParticipant))
  const votes = arbitrators?.map((item) => {
    return {
      vote: item.vote,
      participantId: item.id,
      userId: item.userId
    }
  })
  return {
    receiver,
    sender,
    arbitrators,
    votes
  }
}

const getParticipantInfoLogin = (userInfo: UserInfoData, participant: IContractParticipant[]) => {
  const isMatch = getIndividualFromParticipant(participant)
  return isMatch.receiver?.userId === userInfo?.data?.id
    ? isMatch.receiver
    : isMatch.sender?.userId === userInfo?.data?.id
      ? isMatch.sender
      : isMatch.arbitrators?.find((item) => item.userId === userInfo?.data?.id)
}

const calculateVoteRatio = (
  votes: IVotes[]
): {
  sender: number
  receiver: number
} => {
  let countA = votes?.filter((item) => item.vote === 'A').length
  let countB = votes?.filter((item) => item.vote === 'B').length
  let countUnd = votes?.filter((item) => item.vote === null).length
  let total = countA + countB + countUnd
  let ratioA = (countA / total) * 100
  let ratioB = (countB / total) * 100
  return {
    sender: !isNaN(ratioA) ? parseFloat(ratioA.toFixed(2)) : 0,
    receiver: !isNaN(ratioB) ? parseFloat(ratioB.toFixed(2)) : 0
  }
}

const withdrawMoneyDispute = async (dataParams: IWithdrawMoneyDisputeContractParams): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi }
      }
    } = await fetchAPI('/smart-contracts/abi?type=disputed', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract)
    await contract.methods.withdraw(dataParams.addressWallet).send({ from: dataParams.addressWallet, gas: '1000000' })

    const balanceContract: number = parseFloat(
      instance.utils.fromWei(await contract.methods.getBalance().call(), 'ether')
    )
    dataParams.setCurrentBalance(balanceContract)

    const { balance } = await handleInstanceWeb3()
    updateUserInfoFromLocalStorage(
      {
        key: 'balance',
        value: balance
      },
      dataParams.setUserInfo
    )
    dataParams.setIsDisableButton((prev) => ({
      ...prev,
      withdrawButton: true
    }))
    await fetchAPI('/contracts', 'PATCH', {
      id: dataParams.contractData?.id,
      status: 'COMPLETED'
    })
    return {
      message: 'Withdraw Money From Contract Successfully !',
      description: 'The contract was successfully received',
      status: 'success'
    }
  } catch (error) {
    return {
      message: 'Withdraw Money From Contract Failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export {
  updateStateButton,
  fetchDataWhenEntryPage,
  inviteNewParticipant,
  withdrawMoneyFunc,
  transferMoneyFunc,
  handleDateStringToUint,
  handleConfirmStagesFuncOfCustomer,
  handleConfirmStagesFuncOfSupplier,
  handleCompareContractInformationFunc,
  handleSignContractFunc,
  handleOnDeployContractFunc,
  isExportPrivateKey,
  signMessage,
  hashStringWithSHA512,
  handleCallFunctionOfBlockchain,
  onCreateANewContract,
  getIndividualFromParticipant,
  getParticipantInfoLogin,
  calculateVoteRatio,
  onOpenDisputeContract,
  withdrawMoneyDispute
}
