"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

type initialState = { accounts: [] };

const init: initialState = { accounts: [] }

interface AppContextValue {
  wallet: initialState,
  setWallet: (str: initialState) => void
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

export const AppProvider: React.FC<AppContextProps> = ({
  children
}) => {
  const [wallet, setWallet] = React.useState(init)
  const value: AppContextValue = {
    wallet, setWallet
  }
  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}
