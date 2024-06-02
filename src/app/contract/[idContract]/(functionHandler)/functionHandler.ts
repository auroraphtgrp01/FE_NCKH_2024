import { initResponseMessages } from "@/constants/initVariable.constants";
import {
  ContractData,
  DynamicType,
  EContractAttributeType,
  EContractStatus,
  EFunctionCall,
  ERolesOfParticipant,
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
  ITransferMoneytFunctionCallParams,
  IVisibleButton,
  InvitationItem,
  RSAKey,
  UserInfoData,
} from "@/interface/contract.i";
import { fetchAPI } from "@/utils/fetchAPI";
import { handleInstanceWeb3 } from "@/utils/web3Instance";
import NodeRSA from "node-rsa";
import { Dispatch, SetStateAction } from "react";
import Web3 from "web3";

const updateStateButton = (
  status: EContractStatus,
  contractAttributes: IContractAttribute[],
  setIsVisibleButton: Dispatch<SetStateAction<IVisibleButton>>,
  setIsDisableButton: Dispatch<SetStateAction<IDisableButton>>,
  dataIndividual: IIndividual,
  contractParticipants: any,
  userInfo: UserInfoData,
  currentBalance: number
) => {
  const addressMatch = (type: any) =>
    (
      contractAttributes.find((item: any) => item.type === type)?.value || ""
    ).toLowerCase() === userInfo.data.addressWallet.toLowerCase();

  switch (status) {
    case "PENDING":
      setIsVisibleButton((prev: any) => ({ ...prev, deployButton: true }));
      setIsDisableButton((prev: any) => ({ ...prev }));
      break;
    case "PARTICIPATED":
      setIsVisibleButton((prev: any) => ({ ...prev, deployButton: true }));
      setIsDisableButton((prev: any) => ({
        ...prev,
        cancelButton: false,
      }));
      break;
    case "ENFORCE":
      setIsVisibleButton((prev: any) => ({
        ...prev,
        deployButton: false,
        signButton: true,
      }));
      const participantsLogin = contractParticipants?.find(
        (participant: any) => {
          return participant.userId === userInfo.data.id;
        }
      );
      if (participantsLogin?.status !== "SIGNED") {
        setIsDisableButton((prev: any) => ({
          ...prev,
          signButton: false,
          fetchCompareButton: false,
        }));
      }
      break;
    case "SIGNED":
      setIsVisibleButton((prev: any) => ({
        ...prev,
        signButton: false,
        confirmButtonSender: userInfo.data.role === "Customer",
        confirmButtonReceiver: userInfo.data.role === "Supplier",
        transferButton: userInfo.data.role === "Customer",
        withdrawButton: userInfo.data.role === "Supplier",
      }));
      setIsDisableButton((prev: any) => ({
        ...prev,
        transferButton: currentBalance !== 0,
        cancelButton: true,
        fetchCompareButton: false,
      }));
      break;
    default:
      break;
  }
};

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
    const res = await fetchAPI(
      `/contracts/get-contract-details/${idContract}`,
      "GET"
    );
    const response: IResponseFunctionFetchData = { contractData: res.data };
    const { contract, participants, contractAttributes } = res.data;
    if (contract.contractAddress !== null) {
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(
        abi,
        contract.contractAddress
      );
      const contractBallance: number = parseFloat(
        web3.utils.fromWei(
          await contractInstance.methods.getBalance().call(),
          "ether"
        )
      );
      setCurrentBalance(contractBallance);
      response.contractBallance = contractBallance;
    }

    const dataIndividual = res.data.contractAttributes.reduce(
      (acc: any, item: any) => {
        switch (item.type) {
          case EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND:
            return { ...acc, senderInd: item.value as string };
          case EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE:
            return { ...acc, receiverInd: item.value as string };
          case EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED:
            return { ...acc, joined: item.value };
          case EContractAttributeType.TOTAL_AMOUNT:
            return { ...acc, totalAmount: item.value as number };
          default:
            return acc;
        }
      },
      {} as any
    );
    setAddressContract(contract.contractAddress);
    setContractParticipants(participants);
    setIndividual(dataIndividual);
    setContractAttribute(contractAttributes);
    setContractData(contract);

    return response;
  } catch (error) {
    console.error(error);
  }
};

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
        messages,
      };
    }),
  };
  try {
    await fetchAPI("/participants/send-invitation", "POST", payload);
    const newParticipants = invitation.map((item) => {
      return {
        status: "PENDING",
        email: item.email,
      };
    });
    setContractParticipants((prevParticipants: any) => [
      ...prevParticipants,
      ...newParticipants,
    ]);
    return {
      message: "Invitation has been sent successfully!",
    };
  } catch (error) {
    throw error;
  }
};

const withdrawMoneyFunc = async (
  addressContract: string,
  userInfo: UserInfoData,
  individual: IIndividual
) => {
  try {
    const {
      data: {
        abi: { abi },
      },
    } = await fetchAPI("/smart-contracts/abi", "GET");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, addressContract as string);
    const fromAddress = userInfo?.data?.addressWallet;
    const gasLimit = "1000000";
    const gasPrice = "1000000000";
    const transactionOptions = {
      from: fromAddress,
      gas: gasLimit,
      gasPrice: gasPrice,
    };
    await contract.methods
      .withDrawByPercent(individual.receiverInd, 100)
      .send(transactionOptions);
    // const balance = await contract.methods.getBalance().call();
  } catch (error) {
    throw error;
  }
};

const transferMoneyFunc = async (
  dataParams: ITransferMoneytFunctionCallParams
): Promise<IResponseFunction> => {
  try {
    const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
    const abi = privateCode.data.abi.abi;
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      dataParams.addressContract as string
    );
    await contract.methods.sendToSmartContract(dataParams.privateKey).send({
      from: dataParams.userInfo.data.addressWallet,
      value: web3.utils.toWei(dataParams.individual.totalAmount, "ether"),
      gas: "1000000",
    });

    const balance: string = await contract.methods.getBalance().call();
    dataParams.setCurrentBalance(
      parseFloat(web3.utils.fromWei(balance, "ether"))
    );
    dataParams.setIsVisibleButton((prevState: any) => ({
      ...prevState,
      transferButton: false,
    }));
    dataParams.setIsDisableButton((prev: any) => ({
      ...prev,
      confirmButtonSender: false,
    }));

    return {
      message: "Transfer money to contract Successfully !",
      description: "The contract was successfully received",
      status: "success",
    };
  } catch (error) {
    return {
      message: "Transfer monye to contract Failed !",
      description: error?.toString(),
      status: "destructive",
    };
  }
};

const handleDateStringToUint = (date: string): number => {
  return new Date(date).getTime();
};

const handleConfirmStagesFunc = async (
  dataParams: IConfirmStageFunctionCallParams
): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi },
      },
    } = await fetchAPI("/smart-contracts/abi", "GET");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      dataParams.addressContract as string
    );
    await contract.methods.confirmStage().send({
      from: dataParams.userInfo?.data?.addressWallet,
      gas: "1000000",
    });
    // if (userInfo?.data?.addressWallet === individual.senderInd) {
    //     setIsDisableButton({ ...isDisableButton });
    // } else {
    //     setIsDisableButton({ ...isDisableButton });
    // }
    return {
      message: "Confirm Successfully !",
      description: "Stage has been confirmed successfully",
      status: "success",
    };
  } catch (error) {
    return {
      message: "Confirm Failed !",
      description: error?.toString(),
      status: "destructive",
    };
  }
};

async function handleCompareContractInformationFunc(
  setIsCompareContractAlert: any
) {
  // try {
  //     const { data: { abi: { abi } } } = await fetchAPI("/smart-contracts/abi", "GET");
  //     const web3 = new Web3(window.ethereum);
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
const handleSignContractFunc = async (
  dataParams: ISignContractFunctionCallParams
): Promise<IResponseFunction> => {
  try {
    const {
      data: {
        abi: { abi },
      },
    } = await fetchAPI("/smart-contracts/abi", "GET");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, dataParams.addressContract);
    await contract.methods
      .sign(
        dataParams.userInfo?.data?.addressWallet.toString(),
        dataParams.privateKey
      )
      .send({ from: dataParams.userInfo?.data?.addressWallet, gas: "1000000" });
    const findParticipant = dataParams.contractParticipants.find(
      (item: any) => item.userId === dataParams.userInfo?.data?.id
    );
    const response = await fetchAPI("/participants", "PATCH", {
      id: findParticipant?.id,
      status: "SIGNED",
    });
    const indexChanged = dataParams.contractParticipants.findIndex(
      (item: any) => item === findParticipant
    );
    dataParams.contractParticipants[indexChanged] = {
      ...dataParams.contractParticipants[indexChanged],
      status: "SIGNED",
    };
    dataParams.setContractParticipants(dataParams.contractParticipants);
    const { balance } = await handleInstanceWeb3();
    dataParams.setUserInfo((prev: any) => ({ ...prev, balance }));
    if (response.data.contractStatus === "SIGNED") {
      const isCondition =
        (dataParams.userInfo?.data?.addressWallet?.trim().toLowerCase() ||
          "") === (dataParams.individual.senderInd?.trim().toLowerCase() || "");

      if (isCondition) {
        dataParams.setIsVisibleButton((prevState: any) => ({
          ...prevState,
          signButton: false,
          transferButton: true,
          confirmButtonSender: true,
        }));
        dataParams.setIsDisableButton((prevState: any) => ({
          ...prevState,
          transferButton: false,
        }));
      } else {
        dataParams.setIsVisibleButton((prevState: any) => ({
          ...prevState,
          signButton: false,
          withdrawButton: true,
          confirmButtonReceiver: true,
        }));
        dataParams.setIsDisableButton((prevState: any) => ({
          ...prevState,
          withdrawButton: true,
        }));
      }
    } else {
      dataParams.setIsDisableButton((prevState: any) => ({
        ...prevState,
        signButton: true,
      }));
    }
    return {
      message: "Sign Successfully !",
      description: "Contract has been signed successfully",
      status: "success",
    };
  } catch (error) {
    return {
      message: "Sign Failed !",
      description: error?.toString(),
      status: "destructive",
    };
  }
};

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
  if (!individual.totalAmount || individual.totalAmount === "0") {
    return {
      message: "Total amount of money must be greater than 0",
      status: "destructive",
    };
  }
  if (!privateKey) {
    return {
      message: "Private key is required to deploy contract",
      status: "destructive",
    };
  }
  try {
    const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
    const abi = privateCode.data.abi.abi;
    const byteCode = privateCode.data.abi.bytecode;
    const { instance } = await handleInstanceWeb3();
    const contract = new instance.eth.Contract(abi);
    const _user = [individual.senderInd];
    const _total = individual.totalAmount;
    const _supplier = individual.receiverInd;
    const { publicKey } = signMessage(privateKey);
    const _privateKey = await hashStringWithSHA512(privateKey);

    const _stages: IStage[] = await Promise.all(
      stages.map(async (stage: any) => ({
        percent: stage.percent,
        deliveryAt: handleDateStringToUint(stage.deliveryAt),
        description: stage.description || "",
      }))
    );
    const deployTransaction = await contract
      .deploy({
        data: byteCode,
        arguments: [_user, _supplier, _total, _stages, _privateKey],
      })
      .send({
        from: userInfo?.data?.addressWallet,
      });
    const { balance } = await handleInstanceWeb3();
    setUserInfo((prev: any) => ({ ...prev, balance }));
    setAddressContract(deployTransaction?.options?.address as string);
    setIsVisibleButton((prevState: any) => ({
      ...prevState,
      deployButton: false,
      signButton: true,
    }));
    setIsDisableButton((prevState: any) => ({
      ...prevState,
      transferButton: true,
      deployButton: true,
      signButton: false,
    }));
    await Promise.all([
      fetchAPI("/contracts", "PATCH", {
        id: idContract,
        contractAddress: deployTransaction?.options?.address as string,
        status: "ENFORCE",
        stages: stages,
      }),
      fetchAPI("/contracts/handle-deploy", "POST", {
        contractId: idContract,
      }),
    ]);
    isExportPrivateKey(idContract, _privateKey, publicKey);
    return {
      messages: "Deploy Successfully",
      description: `Contract address: ${deployTransaction.options.address}`,
      status: "success",
    };
  } catch (error) {
    console.log("error", error);

    return {
      message: "Deploy Failed",
      description: error,
      status: "destructive",
    };
  }
};

const isExportPrivateKey = (
  contractId: string | string[],
  signature: string,
  publicKey: string
) => {
  let data = new Blob(
    [
      `${publicKey}\n\n\n-----BEGIN PRIVATE KEY-----\n${signature}\n -----END PRIVATE KEY-----`,
    ],
    { type: "text/csv" }
  );
  let csvURL = window.URL.createObjectURL(data);
  const tempLink = document.createElement("a");
  tempLink.href = csvURL;
  tempLink.setAttribute("download", `PK_${contractId}.pem`);
  tempLink.click();
};

function signMessage(message: string) {
  const bitLength: number = 1024;
  const rsaKeyPair: NodeRSA = new NodeRSA({ b: bitLength });
  const publicKey: string = rsaKeyPair.exportKey("public");
  const signer = new NodeRSA(rsaKeyPair.exportKey("private"));
  return {
    signature: signer.sign(message, "base64"),
    publicKey,
  };
}

function verifySignature(
  message: string,
  signature: string,
  publicKey: string
): boolean {
  const verifier = new NodeRSA();
  verifier.importKey(publicKey, "public");
  return verifier.verify(
    Buffer.from(message),
    Buffer.from(signature, "base64")
  );
}

export const getContentFromFile = async (
  file: File | undefined
): Promise<{ publicKey: string; privateKey: string } | null> => {
  if (!file) return null;
  try {
    const reader = new FileReader();
    const result = await new Promise<string>((resolve, reject) => {
      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as string);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
    const { publicKey, privateKey } = extractKeys(result);
    return { publicKey, privateKey };
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

const extractKeys = (keyString: string) => {
  const publicKeyRegex =
    /-----BEGIN PUBLIC KEY-----(.|\n)*?-----END PUBLIC KEY-----/;
  const privateKeyRegex =
    /-----BEGIN PRIVATE KEY-----(.|\n)*?-----END PRIVATE KEY-----/;
  const publicKeyMatch = keyString.match(publicKeyRegex);
  const privateKeyMatch = keyString.match(privateKeyRegex);
  const publicKey = publicKeyMatch ? publicKeyMatch[0] : "";
  const privateKeyEx = privateKeyMatch ? privateKeyMatch[0] : "";
  const headerFooterRegex =
    /-----BEGIN PRIVATE KEY-----(.|\n)*?-----END PRIVATE KEY-----/;
  const match = privateKeyEx.match(headerFooterRegex);
  const privateKeyContent = match ? match[0] : "";
  const privateKey = privateKeyContent
    .split("\n")
    .filter((line) => !line.includes("BEGIN") && !line.includes("END"))
    .join("\n");
  return { publicKey, privateKey };
};

async function hashStringWithSHA512(
  input: string | undefined
): Promise<string> {
  if (!input) return "";
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

const handleCallFunctionOfBlockchain = async (
  dataAuthentication: {
    typeAuthentication: number;
    filePrivateKey?: File | undefined;
    privateKey?: string;
  },
  dataFunctionCall: {
    nameFunctionCall: EFunctionCall | undefined;
    signContractParams?: ISignContractFunctionCallParams;
    transferFunctionParams?: ITransferMoneytFunctionCallParams;
  }
): Promise<IResponseFunction> => {
  if (
    dataAuthentication.privateKey === "" &&
    dataAuthentication.filePrivateKey === undefined
  ) {
    return {
      description: "Please fill your private key or upload your signature",
      message: "Private key or signature is required",
      status: "destructive",
    };
  }
  let privateKey: string = "";
  switch (dataAuthentication.typeAuthentication) {
    case 0:
      const privateKeyGen = await hashStringWithSHA512(
        dataAuthentication.privateKey
      );
      privateKey = privateKeyGen;
      break;
    case 1:
      const privateMessage = await getContentFromFile(
        dataAuthentication.filePrivateKey
      );
      privateKey = privateMessage?.privateKey || "";
      break;
  }
  let responseMessages: IResponseFunction = initResponseMessages;
  switch (dataFunctionCall.nameFunctionCall) {
    case EFunctionCall.FETCH_COMPARE_CONTRACT:
      console.log("Fetch Compare Contract");
      break;
    case EFunctionCall.CANCEL_CONTRACT:
      console.log("Cancel Contract");
      break;
    case EFunctionCall.WITHDRAW_CONTRACT:
      console.log("Withdraw Contract");
      break;
    case EFunctionCall.TRANSFER_CONTRACT:
      console.log("Transfer Contract");
      responseMessages = await transferMoneyFunc({
        ...dataFunctionCall.transferFunctionParams,
        privateKey,
      } as ITransferMoneytFunctionCallParams);
      break;
    case EFunctionCall.SIGN_CONTRACT:
      responseMessages = await handleSignContractFunc({
        ...dataFunctionCall.signContractParams,
        privateKey,
      } as ISignContractFunctionCallParams);
      break;
    case EFunctionCall.CONFIRM_CONTRACT_SENDER:
      console.log("Confirm Contract Sender");
      break;
    case EFunctionCall.CONFIRM_CONTRACT_RECEIVER:
      console.log("Confirm Contract Receiver");
      break;
  }
  return responseMessages;
};

const onCreateANewContract = async (
  dataParams: IContractCreateParams
): Promise<IResponseFunction> => {
  try {
    const res = await fetchAPI("/contracts", "POST", dataParams);
    if (res.status === 201) {
      return {
        message: "Create contract successfully",
        status: "success",
        description: "Contract has been created successfully",
        contractId: res.data.contract.id,
      };
    } else {
      return {
        message: "Create contract failed",
        status: "destructive",
        description: "Error occurred while creating contract",
      };
    }
  } catch (err) {
    return {
      message: "Create contract failed",
      status: "destructive",
      description: err?.toString(),
    };
  }
};

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
        messages: "You have a invitation to join a dispute contract",
      };
  });
  return {
    addressWallet,
    name: "Disputed Contract - Supply Chain Management",
    type: "DISPUTE",
    templateId: "ac321ca5-1393-4474-9f09-f8d09ab15b1d",
    invitation: invitations as InvitationItem[],
  };
};
export {
  updateStateButton,
  fetchDataWhenEntryPage,
  inviteNewParticipant,
  withdrawMoneyFunc,
  transferMoneyFunc,
  handleDateStringToUint,
  handleConfirmStagesFunc,
  handleCompareContractInformationFunc,
  handleSignContractFunc,
  handleOnDeployContractFunc,
  isExportPrivateKey,
  signMessage,
  hashStringWithSHA512,
  handleCallFunctionOfBlockchain,
  onCreateANewContract
};
