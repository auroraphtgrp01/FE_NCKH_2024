'use client'
import React, { useState } from "react"

export interface IContractAttribute {
    [key: string]: any
}

const initContractAttribute: IContractAttribute = {
    city: '',
    date: new Date(),
    titleContract: 'Tiêu đề hợp đồng',
    numberContract: '__',
    law: '',
    signingDate: new Date(),
    endDate: new Date(),
    content: '',
    supplierName: '',
    supplierCitizenID: '',
    supplierSurrogate: '',
    supplierAddress: '',
    supplierPhoneNumber: '',
    supplierFax: '',
    supplierAccountNumber: '',
    supplierTreasury: '',
    supplierSignature: 'ExampleA',
    customerName: '',
    customerCitizenID: '',
    customerSurrogate: '',
    customerAddress: '',
    customerPhoneNumber: '',
    customerAccountNumber: '',
    customerSignature: 'ExampleB',
}

interface AppContextProps {
    children: React.ReactNode
}

export const useContractContext = () => {
    const context = React.useContext(ContractContext)
    return context
}

export interface IContractContextValue {
    contractAttribute: IContractAttribute
    setContractAttribute: (str: IContractAttribute) => void
}

const ContractContext = React.createContext<IContractContextValue | undefined>(undefined)

export const ContractProvider: React.FC<AppContextProps> = ({
    children
}) => {
    const [contractAttribute, setContractAttribute] = useState(initContractAttribute);
    const value: IContractContextValue = {
        contractAttribute, setContractAttribute
    }
    return <ContractContext.Provider value={value}>
        {children}
    </ContractContext.Provider>
}
