import { Button } from '@/components/ui/button'
import React, { use, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  EContractAttributeType,
  EContractAttributeTypeAdditional,
  EContractAttributeTypeAdditionalHeader,
  EStatusAttribute,
  IContractAttribute,
  IInputValue
} from '@/interface/contract.i'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { IContractParticipant } from '../interface/contract.i'
import { getIndividualFromParticipant } from '@/app/contract/[idContract]/(functionHandler)/functionHandler'
import { set } from 'react-hook-form'

export default function AddAttributeArea({
  contractAttribute,
  setContractAttribute,
  index,
  participant
}: {
  contractAttribute: any
  setContractAttribute: any
  index?: number
  participant: IContractParticipant[]
}) {
  const contractAttributeTypeArr: { key: string; value: string }[] = Object.keys(EContractAttributeType).map((key) => ({
    key,
    value: EContractAttributeType[key as keyof typeof EContractAttributeType]
  }))
  const [contractAttributeTypeArray, setContractAttributeType] = useState<any[]>(contractAttributeTypeArr)
  const [individual, setIndividual] = useState<{
    receiver: IContractParticipant | undefined
    sender: IContractParticipant | undefined
  }>()
  useEffect(() => {
    setIndividual(getIndividualFromParticipant(participant))
  }, [participant])
  useEffect(() => {
    if (index && index < 5) {
      const contractAttributeTypeArray: { key: string; value: string }[] = Object.keys(
        EContractAttributeTypeAdditionalHeader
      ).map((key) => ({
        key,
        value: EContractAttributeTypeAdditionalHeader[key as keyof typeof EContractAttributeTypeAdditionalHeader]
      }))
      setContractAttributeType(contractAttributeTypeArray)
    }
    if (contractAttribute.length > 4) {
      const contractAttributeTypeArray: { key: string; value: string }[] = Object.keys(
        EContractAttributeTypeAdditional
      ).map((key) => ({
        key,
        value: EContractAttributeTypeAdditional[key as keyof typeof EContractAttributeTypeAdditional]
      }))
      setContractAttributeType(contractAttributeTypeArray)
    }
  }, [contractAttribute])

  const { toast } = useToast()
  const [SelectType, setSelectType] = useState<EContractAttributeType>()
  const [inputValue, setInputValue] = useState<IInputValue>({ property: '' })
  const [textArea, setTextArea] = useState<string>('')
  function handleAddAttribute() {
    if (
      (!SelectType && SelectType !== EContractAttributeType.CONTRACT_PARTY_INFO) ||
      (!inputValue && SelectType !== EContractAttributeType.CONTRACT_PARTY_INFO) ||
      (SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE && !textArea)
    ) {
      toast({
        title: 'Empty Field',
        description: 'Please fill all the fields',
        variant: 'destructive'
      })
      return
    }
    const newContractAttribute: IContractAttribute = {
      value:
        SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE ||
        SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        SelectType === EContractAttributeType.TOTAL_AMOUNT
          ? textArea
          : SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND
            ? individual?.sender?.User.addressWallet
            : SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE
              ? individual?.receiver?.User.addressWallet
              : SelectType === EContractAttributeType.CONTRACT_PAYMENT_STAGE
                ? inputValue.value
                : inputValue.property,
      property:
        SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE ||
        SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        SelectType === EContractAttributeType.TOTAL_AMOUNT ||
        SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
        SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
        SelectType === EContractAttributeType.CONTRACT_PAYMENT_STAGE
          ? inputValue.property
          : undefined,
      descriptionOfStage: SelectType === EContractAttributeType.CONTRACT_PAYMENT_STAGE ? textArea : undefined,
      type: SelectType as EContractAttributeType,
      statusAttribute: EStatusAttribute.CREATE
    }

    const partyAttributeArr = [
      {
        value: 'BÊN A',
        property: undefined,
        type: EContractAttributeType.CONTRACT_HEADING_2,
        statusAttribute: EStatusAttribute.CREATE
      },
      {
        value: '',
        property: 'Tên Công Ty / Tổ Chức',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        statusAttribute: EStatusAttribute.CREATE
      },
      {
        value: '',
        property: 'Họ và Tên',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        statusAttribute: EStatusAttribute.CREATE
      },
      {
        value: '',
        property: 'Địa chỉ',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        statusAttribute: EStatusAttribute.CREATE
      },
      {
        value: '',
        property: 'Số điện thoại',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        statusAttribute: EStatusAttribute.CREATE
      }
    ]
    if (!index) {
      if (SelectType === EContractAttributeType.CONTRACT_PARTY_INFO) {
        setContractAttribute([...contractAttribute, ...partyAttributeArr])
        setInputValue({ property: '' })
        setTextArea('')
      } else {
        setContractAttribute([...contractAttribute, newContractAttribute])
        setInputValue({ property: '' })
        setTextArea('')
      }
    } else {
      if (SelectType === EContractAttributeType.CONTRACT_PARTY_INFO) {
        const newContractAttributeArray = [...contractAttribute]
        newContractAttributeArray.splice(index, 0, ...partyAttributeArr)
        newContractAttributeArray.splice(index + 6, 1)
        setContractAttribute(newContractAttributeArray)
        setInputValue({ property: '' })
        setTextArea('')
      } else {
        const newContractAttributeArray = [...contractAttribute]
        newContractAttributeArray.splice(index, 0, newContractAttribute)
        newContractAttributeArray.splice(index + 1, 1)
        setContractAttribute(newContractAttributeArray)
        setInputValue({ property: '' })
        setTextArea('')
      }
    }
    setSelectType(undefined)
    setInputValue({ property: '', value: '' })
    setTextArea('')
  }
  return (
    <div className='flex flex-col'>
      <div className='mt-2 flex w-full'>
        {SelectType !== EContractAttributeType.CONTRACT_PARTY_INFO && (
          <Input
            className='w-[32%]'
            onChange={(e) => {
              setInputValue({ property: e.target.value })
            }}
            placeholder='Property'
            value={inputValue.property}
          />
        )}
        <Select
          onValueChange={(e: EContractAttributeType) => {
            setSelectType(e)
          }}
        >
          <SelectTrigger className='ms-2 w-[45%]'>
            <SelectValue placeholder='Select Attribute Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Attribute Type</SelectLabel>
              {contractAttributeTypeArray.map((item, index) => (
                <SelectItem value={item.value} key={index}>
                  {item.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className='ms-2 w-[25%]' type='button' onClick={handleAddAttribute}>
          Add New Attribute
        </Button>
      </div>
      {(SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE ||
        SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
        SelectType === EContractAttributeType.TOTAL_AMOUNT) && (
        <div>
          <Textarea
            onChange={(e) => {
              setTextArea(e.target.value)
            }}
            className='mt-2 w-[100%]'
            value={textArea}
          />
        </div>
      )}
      {SelectType === EContractAttributeType.CONTRACT_PAYMENT_STAGE && (
        <div className='flex flex-col'>
          <div className='mt-2 flex w-full'>
            <Input
              onChange={(e) => {
                setInputValue({ ...inputValue, value: e.target.value })
              }}
              className='mr-2 w-[15%]'
              type='number'
              placeholder='(%)'
              value={inputValue.value}
            />
            <Textarea
              onChange={(e) => {
                setTextArea(e.target.value)
              }}
              placeholder='Description of Stage'
              className='w-[85%]'
              value={textArea}
            />
          </div>
        </div>
      )}
      {SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND && (
        <div>
          <Input
            onChange={(e) => {
              setTextArea(e.target.value)
            }}
            className='mt-2 w-[100%]'
            value={individual?.sender?.User.addressWallet as string}
            disabled
          />
        </div>
      )}
      {SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE && (
        <div>
          <Input
            onChange={(e) => {
              setTextArea(e.target.value)
            }}
            className='mt-2 w-[100%]'
            value={individual?.receiver?.User.addressWallet as string}
            disabled
          />
        </div>
      )}
    </div>
  )
}
