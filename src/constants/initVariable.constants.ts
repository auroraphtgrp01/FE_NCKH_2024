import {
  ERolesOfParticipant,
  IDisableButton,
  IPermission,
  IResponseFunction,
  IVisibleButton,
} from "@/interface/contract.i";

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
  openDisputedButton: false,
};

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
};

export const initResponseMessages: IResponseFunction = {
  message: "",
  status: "destructive",
  description: "",
};

export const initPermission: IPermission = {
  READ_CONTRACT: false,
  EDIT_CONTRACT: false,
  INVITE_PARTICIPANT: false,
  CHANGE_STATUS_CONTRACT: false,
  SET_OWNER_PARTY: false,
  ROLES: ERolesOfParticipant.PARTICIPANT,
};

export const rolesTypeParticipant: { key: string; value: string }[] =
  Object.keys(ERolesOfParticipant).map((key) => ({
    key,
    value: ERolesOfParticipant[key as keyof typeof ERolesOfParticipant],
  }));
