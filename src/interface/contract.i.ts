import { Executor, User, UserPermission } from "@/interface/base.i";
import { Axios } from "axios";
import { Dispatch, SetStateAction } from "react";

export enum EContractAttributeType {
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED = "Contract Attribute Party Address Wallet Joined",
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE = "Contract Attribute Address Wallet Receive",
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND = "Contract Attribute Address Wallet Send",
  CONTRACT_PARTY_INFO = "Contract Party Info",
  TOTAL_AMOUNT = "Total Amount",
  CONTRACT_HEADER = "Contract Header",
  CONTRACT_HEADER_DATE = "Contract Header Date",
  CONTRACT_TITLE = "Contract Title",
  CONTRACT_NUMBER = "Contract Number",
  CONTRACT_TEXT = "Contract Text",
  CONTRACT_HEADING_1 = "Contract Heading 1",
  CONTRACT_HEADING_2 = "Contract Heading 2",
  CONTRACT_ATTRIBUTE = "Contract Attribute",
  CONTRACT_SIGNATURE = "Contract Signature",
}
export enum EContractAttributeTypeAdditional {
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED = "Contract Attribute Party Address Wallet Joined",
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE = "Contract Attribute Address Wallet Receive",
  CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND = "Contract Attribute Address Wallet Send",
  TOTAL_AMOUNT = "Total Amount",
  CONTRACT_NUMBER = "Contract Number",
  CONTRACT_TEXT = "Contract Text",
  CONTRACT_PARTY_INFO = "Contract Party Info",
  CONTRACT_HEADING_1 = "Contract Heading 1",
  CONTRACT_HEADING_2 = "Contract Heading 2",
  CONTRACT_ATTRIBUTE = "Contract Attribute",
  CONTRACT_SIGNATURE = "Contract Signature",
}
export enum EContractAttributeTypeAdditionalHeader {
  CONTRACT_HEADER = "Contract Header",
  CONTRACT_HEADER_DATE = "Contract Header Date",
  CONTRACT_TITLE = "Contract Title",
}
export interface IContractAttribute {
  id?: string;
  index?: number;
  type?: EContractAttributeType;
  value?: string;
  property?: string;
  isCreate?: boolean;
  statusAttribute?: EStatusAttribute;
  createdBy: Executor;
  updatedBy: Executor | null;
}
export enum EStatusAttribute {
  CREATE = "Create",
  UPDATE = "Update",
  PREPARE = "Prepare",
  NOT_CHANGE = "Not Change",
}
export interface IDefinitionContractAttribute
  extends Omit<IContractAttribute, "id" | "value" | "property"> {}
export interface IContractParticipant {
  id: string;
  userId: string;
  address: string;
  name: string;
  email: string;
  status: string;
  User: User;
}
export enum EContractStatus {
  PENDING = "PENDING",
  PARTICIPATED = "PARTICIPATED",
  ENFORCE = "ENFORCE",
  SIGNED = "SIGNED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export interface DynamicType {
  [key: string]: any;
}
export interface ContractData {
  id: string;
  userId: string;
  email: string;
  permission: UserPermission;
  contractId: string;
  contractTitle: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: {
    id: string;
    name: string;
    role: string;
    email: string;
  } | null;
  updatedBy: any;
  deletedAt: string | null;
  deletedBy: string | null;
  User: User;
}
export interface IIndividual {
  receiverInd: string;
  senderInd: string;
  totalAmount: string;
}
export interface IVisibleButton extends DynamicType {
  deployButton: boolean;
  withdrawButton: boolean;
  confirmButton: boolean;
  transferButton: boolean;
  buttonDisputed: boolean;
  signButton: boolean;
  confirmButtonSender: boolean;
  confirmButtonReceiver: boolean;
}
export interface IDisableButton extends DynamicType {
  fetchCompareButton: boolean;
  cancelButton: boolean;
  withdrawButton: boolean;
  transferButton: boolean;
  deployButton: boolean;
  editContractButton: boolean;
  signButton: boolean;
  confirmButtonSender: boolean;
  confirmButtonReceiver: boolean;
}
export interface IStage {
  percent: number;
  deliveryAt: number;
  description?: string;
}
export interface RSAKey {
  publicKey: string;
  privateKey: string;
  privateMessage?: string;
}
export interface UserInfoData {
  data: {
    access_token: string;
    refresh_token: string;
    id: string;
    name: string;
    addressWallet: string;
    email: string;
    role: string;
  };
  balance: string;
}
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
export interface IPermission {
  READ_CONTRACT: boolean;
  EDIT_CONTRACT: boolean;
  INVITE_PARTICIPANT: boolean;
  CHANGE_STATUS_CONTRACT: boolean;
  SET_OWNER_PARTY: boolean;
}
export interface IAddPropertyAreaProps {
  propertiesCBX: string[];
  setPropertiesCBX: (value: string[]) => void;
  newPropertiesArray: string[];
  setNewProperties: (value: string[]) => void;
  contractAttribute: any;
  setContractAttribute: (value: any) => void;
}
export enum EFunctionCall {
  FETCH_COMPARE_CONTRACT = "FETCH_COMPARE_CONTRACT",
  CANCEL_CONTRACT = "CANCEL_CONTRACT",
  WITHDRAW_CONTRACT = "WITHDRAW_CONTRACT",
  TRANSFER_CONTRACT = "TRANSFER_CONTRACT",
  SIGN_CONTRACT = "SIGN_CONTRACT",
  CONFIRM_CONTRACT_SENDER = "CONFIRM_CONTRACT_SENDER",
  CONFIRM_CONTRACT_RECEIVER = "CONFIRM_CONTRACT_RECEIVER",
}

export interface ISignContractFunctionCallParams {
  addressContract: string;
  userInfo: UserInfoData;
  setUserInfo: Dispatch<SetStateAction<UserInfoData>>;
  individual: IIndividual;
  contractParticipants: IContractParticipant[];
  setIsVisibleButton: Dispatch<SetStateAction<IVisibleButton>>;
  setIsDisableButton: Dispatch<SetStateAction<IDisableButton>>;
  privateKey?: string;
}

export interface ITransferMoneytFunctionCallParams {
  addressContract: string;
  setCurrentBalance: Dispatch<SetStateAction<number>>;
  individual: IIndividual;
  userInfo: UserInfoData;
  setIsVisibleButton: Dispatch<SetStateAction<IVisibleButton>>;
  setIsDisableButton: Dispatch<SetStateAction<IDisableButton>>;
  privateKey?: string;
}

export interface IResponseFunction {
  status: "success" | "destructive";
  message: string;
  description?: string;
}

export interface IResponseFunctionFetchData {
  contractData: any;
  contractBallance?: number;
}
