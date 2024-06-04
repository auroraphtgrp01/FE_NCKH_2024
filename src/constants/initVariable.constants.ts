import {
  ERolesOfParticipant,
  IDisableButton,
  IPermission,
  IResponseFunction,
  IVisibleButton
} from '@/interface/contract.i'
import { updateUserInfoFromLocalStorage } from '@/utils/updateUserInfo'
import { handleInstanceWeb3 } from '@/utils/web3Instance'

export const initDisableButton: IDisableButton = {
  fetchCompareButton: true,
  cancelButton: false,
  withdrawButton: true,
  transferButton: true,
  deployButton: true,
  editContractButton: false,
  signButton: true,
  confirmButtonSender: true,
  confirmButtonReceiver: true,
  openDisputedButton: false,
  inviteButton: false,
  voteButton: true
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
  openDisputedButton: true,
  inviteButton: false,
  voteButton: false
}

export const initResponseMessages: IResponseFunction = {
  message: '',
  status: 'destructive',
  description: ''
}

export const initPermission: IPermission = {
  READ_CONTRACT: false,
  EDIT_CONTRACT: false,
  INVITE_PARTICIPANT: false,
  CHANGE_STATUS_CONTRACT: false,
  SET_OWNER_PARTY: false,
  ROLES: 'PARTICIPANT' as ERolesOfParticipant
}

export const rolesTypeParticipant: { key: string; value: string }[] = Object.keys(ERolesOfParticipant).map((key) => ({
  key,
  value: ERolesOfParticipant[key as keyof typeof ERolesOfParticipant]
}))

export const getUserInfo = async () => {
  const { balance } = await handleInstanceWeb3()
  return updateUserInfoFromLocalStorage({ key: 'balance', value: balance })
}
