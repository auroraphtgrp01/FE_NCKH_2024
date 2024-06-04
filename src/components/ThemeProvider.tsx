'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { getUserInfo } from '@/constants/initVariable.constants'
import { UserInfoData } from '@/interface/contract.i'

const init = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info') as string) : null

interface AppContextValue {
  userInfo: any
  setUserInfo: (str: any) => void
  dataCreateContract: any
  setDataCreateContract: (data: any) => void
}

interface AppContextProps {
  children: React.ReactNode
}

const AppContext = React.createContext<AppContextValue | undefined>(undefined)

export const useAppContext = () => {
  const context = React.useContext(AppContext)
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [dataCreateContract, setDataCreateContract] = React.useState({})

  const [userInfo, setUserInfo] = React.useState<UserInfoData>(init)
  React.useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res)
    })
  }, [])
  const value: AppContextValue = {
    userInfo,
    setUserInfo,
    setDataCreateContract,
    dataCreateContract
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
