import { ContractData, DynamicType, EContractAttributeType, EContractStatus, IContractAttribute, IContractParticipant, IDisableButton, IIndividual, IStage, IVisibleButton, RSAKey } from "@/interface/contract.i";
import { fetchAPI } from "@/utils/fetchAPI";
import { log } from "console";
import { generateKeyPairSync } from "crypto";
import { Log } from "ethers";
import NodeRSA from "node-rsa";
import { Dispatch, SetStateAction } from "react";
import Web3 from "web3";

const updateStateButton = (
    status: EContractStatus,
    contractAttributes: IContractAttribute[],
    userAddressWallet: string,
    setIsVisibleButton: Dispatch<SetStateAction<IVisibleButton>>,
    setIsDisableButton: Dispatch<SetStateAction<IDisableButton>>,
    dataIndividual: IIndividual
) => {
    const addressMatch = (type: any) =>
        (contractAttributes.find((item: any) => item.type === type)?.value || '').toLowerCase() === userAddressWallet.toLowerCase();
    switch (status) {
        case "PENDING":
            setIsVisibleButton((prev: any) => ({ ...prev, deployButton: true }));
            setIsDisableButton((prev: any) => ({ ...prev }));
            break;
        case "PARTICIPATED":
            setIsVisibleButton((prev: any) => ({ ...prev, deployButton: true }));
            setIsDisableButton((prev: any) => ({ ...prev, cancelButton: false }));
            break;
        case "ENFORCE":
            setIsVisibleButton((prev: any) => ({ ...prev, deployButton: false, signButton: true }));
            break;
        case "SIGNED":
            setIsVisibleButton((prev: any) => ({
                ...prev,
                signButton: false,
                withdrawButton: addressMatch(EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE),
                transferButton: addressMatch(EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND)
            }));
            setIsDisableButton((prev: any) => ({
                ...prev,
                withdrawButton: addressMatch(EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE),
                transferButton: addressMatch(EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND)
            }));
            break;
        default:
            break;
    }
    if (userAddressWallet == dataIndividual?.receiverInd?.toLowerCase()) {
        setIsVisibleButton((prev: any) => ({ ...prev, withdrawButton: true }))
    }
};

const fetchDataWhenEntryPage = async (
    idContract: string | string[],
    setContractAttribute: Dispatch<SetStateAction<IContractAttribute[]>>,
    setContractData: Dispatch<SetStateAction<ContractData | undefined>>,
    setAddressContract: Dispatch<SetStateAction<string>>,
    setContractParticipants: Dispatch<SetStateAction<IContractParticipant[]>>,
    setIndividual: Dispatch<SetStateAction<IIndividual>>
) => {
    try {
        const response = await fetchAPI(`/contracts/get-contract-details/${idContract}`, "GET");
        const { contract, participants, contractAttributes } = response.data;
        // if (contract.contractAddress !== "") {
        //     const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
        //     const abi = privateCode.data.abi.abi;
        //     const web3 = new Web3(window.ethereum);
        //     const contractInstance = new web3.eth.Contract(abi, contract.contractAddress);
        //     const balance: string = await contractInstance.methods.getBalance().call();
        //     setCurrentBalance(parseFloat(fromWei(balance, "ether")));
        // }
        const dataIndividual = response?.data.contractAttributes.reduce((acc: any, item: any) => {
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
        }, {} as any);
        setAddressContract(contract.contractAddress);
        setContractParticipants(participants);
        setIndividual(dataIndividual);
        setContractAttribute(contractAttributes);
        setContractData(contract);
        return response
    } catch (error) {
        console.error(error);
    }
};

const inviteNewParticipant = async (
    idContract: string | string[],
    invitation: any,
    messages: string,
    setContractParticipants: Dispatch<SetStateAction<IContractParticipant[]>>
) => {
    const payload = {
        contractId: idContract,
        invitation: invitation.map((item: any) => {
            return {
                ...item,
                messages,
            };
        }),
    };
    try {
        await fetchAPI("/participants/send-invitation", "POST", payload)
        const newParticipants = invitation.map((item: any) => {
            return {
                status: "PENDING",
                email: item.email,
            };
        });
        setContractParticipants((prevParticipants: any) => [...prevParticipants, ...newParticipants]);
        return {
            message: 'Invitation has been sent successfully!'
        }
    } catch (error) {
        throw error
    }
}

const withdrawMoneyFunc = async (addressContract: string, userInfo: any, individual: IIndividual) => {
    try {
        const { data: { abi: { abi } } } = await fetchAPI("/smart-contracts/abi", "GET");
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
        throw error
    }
}

const transferMoneyFunc = async (addressContract: string, individual: IIndividual, userInfo: any) => {
    try {
        const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
        const abi = privateCode.data.abi.abi;
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, addressContract as string);
        await contract.methods.sendToSmartContract().send({
            from: userInfo?.data?.addressWallet,
            value: web3.utils.toWei(individual?.totalAmount, "ether"),
            gas: "1000000",
        });
        //   const balance: string = await contract.methods.getBalance().call();
        //   setCurrentBalance(parseFloat(fromWei(balance, "ether")));
    } catch (error) {
        throw error
    }
}

const handleDateStringToUint = (date: string): number => {
    return new Date(date).getTime();
}

const handleConfirmStagesFunc = async (
    addressContract: string,
    userInfo: any,
    individual: IIndividual,
    setIsDisableButton: any,
    isDisableButton: any
) => {
    try {
        const { data: { abi: { abi } } } = await fetchAPI("/smart-contracts/abi", "GET");
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, addressContract as string);
        await contract.methods.confirmStage().send({
            from: userInfo?.data?.addressWallet,
            gas: "1000000",
        });
        if (userInfo?.data?.addressWallet === individual.senderInd) {
            setIsDisableButton({ ...isDisableButton });
        } else {
            setIsDisableButton({ ...isDisableButton });
        }
    } catch (error) {
        throw new Error(`Error occurred while handling confirmation stages: ${error}`)
    }
}

async function handleCompareContractInformationFunc(setIsCompareContractAlert: any) {
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
    addressContract: string,
    userInfo: any,
    individual: IIndividual,
    contractParticipants: IContractParticipant[],
    idContract: string | string[]
) => {
    try {
        const { data: { abi: { abi } } } = await fetchAPI("/smart-contracts/abi", "GET");
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, addressContract);
        await contract.methods.sign(userInfo?.data?.addressWallet.toString())
            .send({ from: userInfo?.data?.addressWallet, gas: "1000000" });
        await Promise.all([
            contract.methods.getSignature(individual.senderInd).call(),
            contract.methods.getSignature(individual.receiverInd).call()
        ]);
        await fetchAPI("/participants", "PATCH", {
                id: contractParticipants.find(item => item.userId === userInfo?.data?.id)?.id,
                status: "SIGNED"
            })
    } catch (error) {
        throw Error(`Error occurred while signing the contract: ${error}`);
    }
}

const handleOnDeployContractFunc = async (individual: IIndividual, privateKey: string, stages: any, userInfo: any, setAddressContract: any, setIsVisibleButton: any, setIsDisableButton: any, idContract: string | string[]) => {
    if (!individual.totalAmount || individual.totalAmount === '0') {
      return {
        message: "Total amount of money must be greater than 0",
        status: 'destructive'
      };
    }
    if (!privateKey) {
        return {
            message: "Private key is required to deploy contract",
            status: 'destructive'
          };
    }
    try {
      const {signature, publicKey} = signMessage(privateKey);
      const privateCode = await fetchAPI("/smart-contracts/abi", "GET");
      const abi = privateCode.data.abi.abi;
      const byteCode = privateCode.data.abi.bytecode;
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi);
      const _user = [individual.senderInd];
      const _total = individual.totalAmount;
      const _privateKey = privateKey;
      const _supplier = individual.receiverInd;
      
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
          arguments: [_user, _supplier, "", _total, _stages, _privateKey],
        })
        .send({
          from: userInfo?.data?.addressWallet,
        });
     
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
      }));
      
      await fetchAPI("/contracts", "PATCH", {
        id: idContract,
        contractAddress: deployTransaction?.options?.address as string,
        status: "ENFORCE",
        stages: stages,
      });
      isExportPrivateKey(idContract, signature, publicKey)
      return { 
        messages: "Deploy Successfully",
        description: `Contract address: ${deployTransaction.options.address}`,
        status: "success",
      }
    } catch (error) {
        return { 
            message: "Deploy Failed",
            description: error,
            status: "destructive",
        }
    }
  }

  const isExportPrivateKey = (contractId: string | string [], signature: string, publicKey: string) => {
    let data = new Blob([`${publicKey}\n\n\n-----BEGIN PRIVATE KEY-----\n${signature}\n -----END PRIVATE KEY-----`], {type: 'text/csv'});
    let csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `PK_${contractId}.pem`);
    tempLink.click();
  }

  function signMessage(message: string) {
      const bitLength: number = 1024;
      const rsaKeyPair: NodeRSA = new NodeRSA({ b: bitLength });
      const publicKey: string = rsaKeyPair.exportKey('public');
    const signer = new NodeRSA(rsaKeyPair.exportKey('private'));
    return {
        signature: signer.sign(message, 'base64'),
        publicKey
    }
}

function verifySignature(message: string, signature: string, publicKey: string): boolean {
    const verifier = new NodeRSA();
    verifier.importKey(publicKey, 'public');
    return verifier.verify(Buffer.from(message), Buffer.from(signature, 'base64'));
}

export const getContentFromFile = async (file: File, setRsaKey: Dispatch<SetStateAction<RSAKey | undefined>>) => {
    if (!file) return null;
    try {
        const result = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    resolve(event.target.result);
                }
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsText(file);
        });
    const { publicKey, privateKey } = extractKeys(result as string);
    setRsaKey({ publicKey, privateKey });
    return true
    } catch (error) {
      return error
    }
};

const extractKeys = (keyString: string) => {
    const publicKeyRegex = /-----BEGIN PUBLIC KEY-----(.|\n)*?-----END PUBLIC KEY-----/;
    const privateKeyRegex = /-----BEGIN PRIVATE KEY-----(.|\n)*?-----END PRIVATE KEY-----/;
    const publicKeyMatch = keyString.match(publicKeyRegex);
    const privateKeyMatch = keyString.match(privateKeyRegex);
    const publicKey = publicKeyMatch ? publicKeyMatch[0] : '';
    const privateKeyEx = privateKeyMatch ? privateKeyMatch[0] : ''
    const headerFooterRegex = /-----BEGIN PRIVATE KEY-----(.|\n)*?-----END PRIVATE KEY-----/;
    const match = privateKeyEx.match(headerFooterRegex);
    const privateKeyContent = match ? match[0] : '';
    const privateKey = privateKeyContent.split('\n').filter(line => !line.includes('BEGIN') && !line.includes('END')).join('\n');
    return { publicKey, privateKey };
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
    isExportPrivateKey
}