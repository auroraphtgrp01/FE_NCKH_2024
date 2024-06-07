export interface User {
  id: string
  email: string
  name: string
  phoneNumber: string
  identifyNumber: string
  addressWallet: string
  gender: string
  dateOfBirth: string
  PIN: string
  address: string | null
  emailVerifyToken: string | null
  forgotPasswordToken: string | null
  refreshToken: string
  userStatus: string
  role: string
  createdAt: string
  updatedAt: string | null
  createdBy: any
  updatedBy: any
  deletedAt: string | null
  deletedBy: string | null
}
export interface UserPermission {
  EDIT_CONTRACT: boolean
  READ_CONTRACT: boolean
  SET_OWNER_PARTY: boolean
  INVITE_PARTICIPANT: boolean
  CHANGE_STATUS_CONTRACT: boolean
}
export interface Executor {
  id: string | null
  name: string | null
  role: string | null
  email: string | null
}
export interface DatePicker {
  selectedDate: Date | undefined
  onDateChange: (newDate: any) => void
}

export interface ISupplier {
  id: string
  name: string
  email: string
  User: User
  images: string[]
  phoneNumber: string
  address: string
  taxCode: string
  userId: string
  description: string | null
  createdAt: string
  updatedAt: string | null
  createdBy: any
  updatedBy: any
  deletedAt: string | null
  deletedBy: string | null
}
