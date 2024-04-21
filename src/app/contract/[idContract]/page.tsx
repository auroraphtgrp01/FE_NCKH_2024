import { ContractProvider } from '@/context/ContractProvider'
import React from 'react'
import Contract from '../(exampleCombobox)/page'
import ViewContract from './(component)/ViewContract'
export default function page() {
    return (
        <div>
            <ContractProvider>
                <ViewContract />
            </ContractProvider>

        </div>
    )
}
