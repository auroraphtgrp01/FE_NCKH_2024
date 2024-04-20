import { ContractProvider } from '@/context/ContractProvider'
import React from 'react'
import Contract from '../../(exampleCombobox)/page'

export default function page() {
    return (
        <div>
            <ContractProvider>
                <Contract></Contract>

            </ContractProvider>
        </div>
    )
}
