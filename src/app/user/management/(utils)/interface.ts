import { EGender, EUserStatus } from './enum'

export interface ILoadDataFunction {
  currentPage: number
  limit: number
}

export interface IUserData {
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

export interface ILoadDataFunctionResponse {
  users: IUserData[]
  totalItems: number
  totalPages: number
  currentPage: number
  limit: number
}
