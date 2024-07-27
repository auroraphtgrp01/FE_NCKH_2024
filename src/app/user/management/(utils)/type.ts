import { EGender, EUserStatus } from './enum'

export type User = {
  name: string
  email: string
  phoneNumber: string
  identifyNumber: string
  addressWallet: string
  gender: EGender
  dateOfBirth: string
  PIN: string
  userStatus: string
  role: string
  id: EUserStatus
}
