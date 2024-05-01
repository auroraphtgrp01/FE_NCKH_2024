'use client'

import { EContractAttributeType, IContractAttribute } from "@/interface/contract.i";
import { useState } from "react";

export const ContractState = () => {

    const [contractAttribute, setContractAttribute] = useState(initContractAttribute);
    return {
        contractAttribute, setContractAttribute
    }
}


export const initContractAttribute: any[] = [
    {
        id: "d5299852-4371-4c7d-abfc-29ebfb58a1a9",
        value: "4356653433333",
        type: "Contract Header Date",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "64c74378-d172-4686-9a18-2b53cf5db98c",
        value: "4444464563",
        type: "Contract Title",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "2bffa419-2f5f-49b2-9085-9db30c4ddee5",
        value: "55554566455",
        type: "Contract Number",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "39b5e7c0-a45c-4b22-a190-e16c30212e36",
        value: "ádasdassdasdasda5656643",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "e8c6fa91-9a73-41b2-8de8-618adb2aeb30",
        property: "0000scsc5645666",
        value: "jnm56656456",
        type: "Contract Attribute",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "e9083bbf-0a52-473e-9aa4-52b2ff0adfdd",
        value: "133333333356565",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "457a5c7d-4aef-4a1b-9323-015745783b89",
        value: "343",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "6044c78d-8dfc-48c0-8628-952bb3dbf5da",
        value: "5",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        }
    },
    {
        id: "eaebac70-9eca-40f6-9053-c4fb5ddadcc7",
        value: "1",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: null
    },
    {
        id: "8436a449-43fb-4ae5-ab7e-a9196328d514",
        value: "2",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: null
    },
    {
        id: "f1c5bfca-631c-4896-9146-e87c16d31023",
        value: "3",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: null
    },
    {
        id: "1e9d566f-3655-43d3-9258-1a6c1a35f08b",
        value: "4",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: null
    },
    {
        id: "587c0467-464b-4307-9aea-06d2e2dcdf19",
        value: "5",
        type: "Contract Heading 1",
        createdBy: {
            id: "be5d31d0-4c37-4814-953c-a34d4ed9bef5",
            name: "Le Minh Tuan",
            email: "sliverknight4869@gmail.com"
        },
        updatedBy: null
    }
]
