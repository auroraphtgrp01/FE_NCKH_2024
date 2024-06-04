import { initResponseMessages } from '@/constants/initVariable.constants'
import {
  ContractData,
  DynamicType,
  EContractAttributeType,
  EContractStatus,
  EFunctionCall,
  ERolesOfParticipant,
  EStageContractStatus,
  IConfirmStageFunctionCallParams,
  IContractAttribute,
  IContractCreateParams,
  IContractParticipant,
  IDisableButton,
  IIndividual,
  IResponseFunction,
  IResponseFunctionFetchData,
  ISignContractFunctionCallParams,
  IStage,
  ITransferMoneyFunctionCallParams,
  IVisibleButton,
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
import Web3 from 'web3'

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
  if (contractParticipants.length > 0) {
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
          deployButton: true
        }))
        setIsDisableButton((prev: any) => ({
          ...prev,
          cancelButton: false
        }))
        break
      case 'ENFORCE':
        setIsVisibleButton((prev: any) => ({
          ...prev,
          deployButton: false,
          signButton: true
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
        console.log(hasStageApproved.length > 0)

        setIsVisibleButton((prev: any) => ({
          ...prev,
          signButton: false,
          confirmButtonSender: participantIsLogin?.permission.ROLES === ('SENDER' as ERolesOfParticipant),
          confirmButtonReceiver: participantIsLogin?.permission.ROLES === ('RECEIVER' as ERolesOfParticipant),
          transferButton:
            currentBalance > 0 ? false : participantIsLogin?.permission.ROLES === ('SENDER' as ERolesOfParticipant),
          withdrawButton: participantIsLogin?.permission.ROLES === ('RECEIVER' as ERolesOfParticipant)
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
  setCurrentBalance: Dispatch<SetStateAction<number>>
): Promise<IResponseFunctionFetchData | undefined> => {
  try {
    const res = await fetchAPI(`/contracts/get-contract-details/${idContract}`, 'GET')
    const response: IResponseFunctionFetchData = { contractData: res.data }
    const { contract, participants, contractAttributes } = res.data
    if (contract.contractAddress !== null) {
      const privateCode = await fetchAPI('/smart-contracts/abi', 'GET')
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
    setAddressContract(contract.contractAddress)
    setContractParticipants(participants)
    setIndividual(dataIndividual)
    setContractAttribute(contractAttributes)
    setContractData(contract)

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
    const hasStageApproved = dataParams.contractData?.stages.filter(
      (item: any) => item.status === EStageContractStatus.APPROVED
    )
    const stageWithdraw = hasStageApproved && hasStageApproved.length > 0 ? hasStageApproved[0] : undefined
    if (stageWithdraw !== undefined)
      hasStageApproved?.map((item: any) => {
        if (item.id === stageWithdraw.id) hasStageApproved.splice(item, 1)
      })
    const {
      data: {
        abi: { abi }
      }
    } = await fetchAPI('/smart-contracts/abi', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract as string)
    await contract.methods
      .withDrawByPercent(dataParams.individual.receiverInd, stageWithdraw?.percent, dataParams.privateKey)
      .send({ from: dataParams.userInfo?.data?.addressWallet, gas: '1000000' })

    const balanceContract: number = parseFloat(
      instance.utils.fromWei(await contract.methods.getBalance().call(), 'ether')
    )

    if (stageWithdraw === undefined)
      return {
        message: 'Withdraw money from contract Failed !',
        description: 'No stage has been completed',
        status: 'destructive'
      }

    await fetchAPI('/contracts', 'PATCH', {
      id: dataParams.contractData?.id,
      stage: { ...stageWithdraw, status: EStageContractStatus.WITHDRAWN }
    })
    dataParams.setCurrentBalance(balanceContract)
    dataParams.setIsDisableButton((prev: any) => ({
      ...prev,
      withdrawButton: hasStageApproved && hasStageApproved.length > 0 ? false : true
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
      message: 'Withdraw money from contract Successfully !',
      description: 'The contract was successfully received',
      status: 'success'
    }
  } catch (error) {
    console.log(error?.toString())

    return {
      message: 'Withdraw money from contract Failed !',
      description: error?.toString(),
      status: 'destructive'
    }
  }
}

const transferMoneyFunc = async (dataParams: ITransferMoneyFunctionCallParams): Promise<IResponseFunction> => {
  try {
    const privateCode = await fetchAPI('/smart-contracts/abi', 'GET')
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
      confirmButtonSender: true
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
    } = await fetchAPI('/smart-contracts/abi', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract as string)

    await contract.methods.confirmStage(dataParams.privateKey).send({
      from: dataParams.userInfo?.data?.addressWallet,
      gas: '1000000'
    })

    const participantsLogin = dataParams.contractParticipants?.find((participant: any) => {
      return participant.userId === dataParams?.userInfo.data.id
    })
    const stageEnforce = dataParams.contractData?.stages.filter(
      (item: any) => item.status === EStageContractStatus.ENFORCE || item.status === EStageContractStatus.OUT_OF_DATE
    )
    const stageChange = stageEnforce && stageEnforce.length > 0 ? stageEnforce[0] : undefined
    if (stageChange !== undefined) {
      stageEnforce?.map((item: any) => {
        if (item === stageChange) stageEnforce.splice(item, 1)
      })
      await fetchAPI('/contracts', 'PATCH', {
        id: dataParams?.contractData?.id,
        stage: { ...stageChange, status: EStageContractStatus.PENDING }
      })
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
    } = await fetchAPI('/smart-contracts/abi', 'GET')
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi, dataParams.addressContract as string)

    await contract.methods.confirmStage(dataParams.privateKey).send({
      from: dataParams.userInfo?.data?.addressWallet,
      gas: '1000000'
    })

    const hasStagePending = dataParams.contractData?.stages.filter(
      (item: any) => (item.status = EStageContractStatus.PENDING)
    )

    const stageChange = hasStagePending && hasStagePending.length > 0 ? hasStagePending[0] : undefined
    if (stageChange !== undefined) {
      hasStagePending?.map((item: any) => {
        if (item === stageChange) hasStagePending.splice(item, 1)
      })
      await fetchAPI('/contracts', 'PATCH', {
        id: dataParams?.contractData?.id,
        stage: { ...stageChange, status: EStageContractStatus.APPROVED }
      })
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

async function handleCompareContractInformationFunc(setIsCompareContractAlert: any) {
  // try {
  //     const { data: { abi: { abi } } } = await fetchAPI("/smart-contracts/abi", "GET");
  //     const { instance } = await handleInstanceWeb3();
  //     const contract = new web3.eth.Contract(abi, addressContract as string);
  //     const compare: string[] = await contract.methods.getContractInformation(privateKey)
  //         .call({ from: userInfo?.data?.addressWallet });
  //     const contractAttributesFromBlockchain = JSON.parse(compare[1]);
  //     if (JSON.stringify(contractAttributesFromBlockchain) === JSON.stringify(contractAttribute)) {
  //         toast({
  //             title: "Contract is same",
  //             variant: "success",
  //         });
  //     } else {
  //         toast({
  //             title: "Contract is different",
  //             variant: "destructive",
  //         });
  //     }
  //     setIsCompareContractAlert(false);
  // } catch (error) {
  //     console.error("Error occurred while comparing contract information:", error);
  // }
}
const handleSignContractFunc = async (dataParams: ISignContractFunctionCallParams): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi }
      }
    } = await fetchAPI('/smart-contracts/abi', 'GET')
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
          confirmButtonSender: true
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
    const privateCode = await fetchAPI('/smart-contracts/abi', 'GET')
    const abi = privateCode.data.abi.abi
    const byteCode = privateCode.data.abi.bytecode
    const { instance } = await handleInstanceWeb3()
    const contract = new instance.eth.Contract(abi)
    const _user = [individual.senderInd.trim().toLowerCase()]
    const _total = individual.totalAmount
    const _supplier = individual.receiverInd.trim().toLowerCase()
    const { publicKey } = signMessage(privateKey)
    const _privateKey = await hashStringWithSHA512(privateKey)

    const _stages: IStage[] = await Promise.all(
      stages.map(async (stage: any) => {
        stage.status = 'ENFORCE'
        return {
          percent: stage.percent,
          deliveryAt: handleDateStringToUint(stage.deliveryAt),
          description: stage.description || '',
          status: 'ENFORCE'
        }
      })
    )

    const deployTransaction = await contract
      .deploy({
        data: byteCode,
        arguments: [_user, _supplier, _total, _stages, _privateKey]
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
        stages: stages
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
    console.log('error', error)

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
      console.log('Fetch Compare Contract')
      break
    case EFunctionCall.CANCEL_CONTRACT:
      console.log('Cancel Contract')
      break
    case EFunctionCall.WITHDRAW_CONTRACT:
      console.log('Withdraw Contract')
      responseMessages = await withdrawMoneyFunc({
        ...dataFunctionCall.withdrawMoneyFunctionParams,
        privateKey
      } as IWithdrawMoneyFunctionCallParams)
      break
    case EFunctionCall.TRANSFER_CONTRACT:
      console.log('Transfer Contract')
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
      console.log('Confirm Contract Sender')
      responseMessages = await handleConfirmStagesFuncOfCustomer({
        ...dataFunctionCall.confirmFunctionParams,
        privateKey
      } as IConfirmStageFunctionCallParams)
      break
    case EFunctionCall.CONFIRM_CONTRACT_RECEIVER:
      console.log('Confirm Contract Receiver')
      responseMessages = await handleConfirmStagesFuncOfSupplier({
        ...dataFunctionCall.confirmFunctionParams,
        privateKey
      } as IConfirmStageFunctionCallParams)
      break
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

const getIndividualFromParticipant = (participant: IContractParticipant[]) => {
  const receiver = participant.find((item) => item.permission?.ROLES == ('RECEIVER' as ERolesOfParticipant))
  const sender = participant.find((item) => item.permission?.ROLES == ('SENDER' as ERolesOfParticipant))
  return {
    receiver,
    sender
  }
}

const getParticipantInfoLogin = (userInfo: UserInfoData, participant: IContractParticipant[]) => {
  console.log('>>', userInfo, participant)
  const isMatch = getIndividualFromParticipant(participant)
  return isMatch.receiver?.userId === userInfo?.data?.id ? isMatch.receiver : isMatch.sender
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
  getParticipantInfoLogin
}
