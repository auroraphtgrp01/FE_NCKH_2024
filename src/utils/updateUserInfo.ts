import { UserInfoData } from '@/interface/contract.i'
import { Dispatch, SetStateAction } from 'react'

export const updateUserInfoFromLocalStorage = <T extends keyof UserInfoData>(
  fieldToUpdate: {
    key: T
    value: UserInfoData[T]
  },
  setUserInfo?: Dispatch<SetStateAction<UserInfoData>>
): UserInfoData => {
  if (setUserInfo) {
    setUserInfo((prev) => {
      const updatedUserInfo = {
        ...prev,
        [fieldToUpdate.key]: fieldToUpdate.value
      }

      localStorage.setItem('user-info', JSON.stringify(updatedUserInfo))

      return updatedUserInfo
    })
  }
  const userInfoData: UserInfoData =
    JSON.parse(localStorage.getItem('user-info') as string) ?? JSON.parse(localStorage.getItem('user-info') as string)
  console.log(fieldToUpdate)
  const updateUserInfoData = { ...userInfoData, [fieldToUpdate.key]: fieldToUpdate.value }
  localStorage.setItem('user-info', JSON.stringify(updateUserInfoData))

  return updateUserInfoData
}
