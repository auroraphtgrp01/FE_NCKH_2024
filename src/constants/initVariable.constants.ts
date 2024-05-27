import { IDisableButton, IVisibleButton } from "@/interface/contract.i";

export const initDisableButton: IDisableButton = {
    fetchCompareButton: true,
    cancelButton: true,
    withdrawButton: true,
    transferButton: true,
    deployButton: true,
    editContractButton: true,
    signButton: true,
    confirmButtonSender: true,
    confirmButtonReceiver: true
  }

export const initVisibleButton: IVisibleButton = {
    deployButton: false,
    withdrawButton: false,
    confirmButton: false,
    transferButton: false,
    buttonDisputed: false,
    signButton: false,
    confirmButtonSender: false,
    confirmButtonReceiver: false
  }