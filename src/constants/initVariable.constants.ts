import { IDisableButton, IResponseFunction, IVisibleButton } from "@/interface/contract.i";

export const initDisableButton: IDisableButton = {
  fetchCompareButton: true,
  cancelButton: true,
  withdrawButton: true,
  transferButton: true,
  deployButton: true,
  editContractButton: true,
  signButton: true,
  confirmButtonSender: true,
  confirmButtonReceiver: true,
  openDisputedButton: false
}

export const initVisibleButton: IVisibleButton = {
  deployButton: false,
  withdrawButton: false,
  confirmButton: false,
  transferButton: false,
  buttonDisputed: false,
  signButton: false,
  confirmButtonSender: false,
  confirmButtonReceiver: false,
  openDisputedButton: true
}

export const initResponseMessages: IResponseFunction = {
  message: '',
  status: 'destructive',
  description: ''
}
