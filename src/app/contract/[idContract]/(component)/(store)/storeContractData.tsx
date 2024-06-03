'use client'

import {
  EContractAttributeType,
  IContractAttribute,
} from '@/interface/contract.i'
import { useState } from 'react'

export const ContractState = () => {
  const [contractAttribute, setContractAttribute] = useState(
    initContractAttribute
  )
  return {
    contractAttribute,
    setContractAttribute,
  }
}

export const initContractAttribute: any[] = [
  {
    id: 'd5299852-4371-4c7d-abfc-29ebfb58a1a9',
    value: '',
    type: 'Contract Header Date',
    createdBy: {
      id: 'be5d31d0-4c37-4814-953c-a34d4ed9bef5',
      name: 'Le Minh Tuan',
      email: 'sliverknight4869@gmail.com',
    },
    updatedBy: {
      id: 'be5d31d0-4c37-4814-953c-a34d4ed9bef5',
      name: 'Le Minh Tuan',
      email: 'sliverknight4869@gmail.com',
    },
  },
]
