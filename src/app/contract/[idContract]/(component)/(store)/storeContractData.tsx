'use client'

import { useState } from "react";

export const ContractState = () => {
    interface IContractAttribute {
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
    const [contractAttribute, setContractAttribute] = useState(initContractAttribute);
    return {
        contractAttribute, setContractAttribute
    }
}