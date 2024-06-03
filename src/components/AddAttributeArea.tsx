import { Button } from '@/components/ui/button';
import React, { use, useEffect, useState } from 'react';
import { InputWithTooltip } from '@/components/InputWithTooltip';
import { Textarea } from '@/components/ui/textarea';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';

import {
   EContractAttributeType,
   EContractAttributeTypeAdditional,
   EContractAttributeTypeAdditionalHeader,
   EStatusAttribute,
   IContractAttribute,
} from '@/interface/contract.i';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

export default function AddAttributeArea({
   contractAttribute,
   setContractAttribute,
   index,
}: {
   contractAttribute: any;
   setContractAttribute: any;
   index?: number;
}) {
   const contractAttributeTypeArr: { key: string; value: string }[] =
      Object.keys(EContractAttributeType).map((key) => ({
         key,
         value: EContractAttributeType[
            key as keyof typeof EContractAttributeType
         ],
      }));
   const [contractAttributeTypeArray, setContractAttributeType] = useState<
      any[]
   >(contractAttributeTypeArr);
   useEffect(() => {
      if (index && index < 5) {
         const contractAttributeTypeArray: { key: string; value: string }[] =
            Object.keys(EContractAttributeTypeAdditionalHeader).map((key) => ({
               key,
               value: EContractAttributeTypeAdditionalHeader[
                  key as keyof typeof EContractAttributeTypeAdditionalHeader
               ],
            }));
         setContractAttributeType(contractAttributeTypeArray);
      }
      if (contractAttribute.length > 4) {
         const contractAttributeTypeArray: { key: string; value: string }[] =
            Object.keys(EContractAttributeTypeAdditional).map((key) => ({
               key,
               value: EContractAttributeTypeAdditional[
                  key as keyof typeof EContractAttributeTypeAdditional
               ],
            }));
         setContractAttributeType(contractAttributeTypeArray);
      }
   }, [contractAttribute]);
   const { toast } = useToast();
   const [SelectType, setSelectType] = useState<EContractAttributeType>();
   const [inputValue, setInputValue] = useState<any>('');
   const [textArea, setTextArea] = useState<string>('');
   function handleAddAttribute() {
      if (
         (!SelectType &&
            SelectType !== EContractAttributeType.CONTRACT_PARTY_INFO) ||
         (!inputValue &&
            SelectType !== EContractAttributeType.CONTRACT_PARTY_INFO) ||
         (SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE && !textArea)
      ) {
         toast({
            title: 'Empty Field',
            description: 'Please fill all the fields',
            variant: 'destructive',
         });
         return;
      }
      const newContractAttribute: IContractAttribute = {
         value:
            SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
            SelectType === EContractAttributeType.TOTAL_AMOUNT
               ? textArea
               : inputValue,
         property:
            SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
            SelectType === EContractAttributeType.TOTAL_AMOUNT
               ? inputValue
               : undefined,
         type: SelectType as EContractAttributeType,
         statusAttribute: EStatusAttribute.CREATE,
      };
      console.log(newContractAttribute);

      const partyAttributeArr = [
         {
            value: 'BÊN A',
            property: undefined,
            type: EContractAttributeType.CONTRACT_HEADING_2,
            statusAttribute: EStatusAttribute.CREATE,
         },
         {
            value: '',
            property: 'Tên Công Ty / Tổ Chức',
            type: EContractAttributeType.CONTRACT_ATTRIBUTE,
            statusAttribute: EStatusAttribute.CREATE,
         },
         {
            value: '',
            property: 'Họ và Tên',
            type: EContractAttributeType.CONTRACT_ATTRIBUTE,
            statusAttribute: EStatusAttribute.CREATE,
         },
         {
            value: '',
            property: 'Địa chỉ',
            type: EContractAttributeType.CONTRACT_ATTRIBUTE,
            statusAttribute: EStatusAttribute.CREATE,
         },
         {
            value: '',
            property: 'Số điện thoại',
            type: EContractAttributeType.CONTRACT_ATTRIBUTE,
            statusAttribute: EStatusAttribute.CREATE,
         },
      ];
      if (!index) {
         if (SelectType === EContractAttributeType.CONTRACT_PARTY_INFO) {
            setContractAttribute([...contractAttribute, ...partyAttributeArr]);
            setInputValue('');
            setTextArea('');
         } else {
            setContractAttribute([...contractAttribute, newContractAttribute]);
            setInputValue('');
            setTextArea('');
         }
      } else {
         if (SelectType === EContractAttributeType.CONTRACT_PARTY_INFO) {
            const newContractAttributeArray = [...contractAttribute];
            newContractAttributeArray.splice(index, 0, ...partyAttributeArr);
            newContractAttributeArray.splice(index + 6, 1);
            setContractAttribute(newContractAttributeArray);
            setInputValue('');
            setTextArea('');
         } else {
            const newContractAttributeArray = [...contractAttribute];
            newContractAttributeArray.splice(index, 0, newContractAttribute);
            newContractAttributeArray.splice(index + 1, 1);
            setContractAttribute(newContractAttributeArray);
            setInputValue('');
            setTextArea('');
         }
      }
      setInputValue('');
      setTextArea('');
   }
   return (
      <div className='flex flex-col'>
         <div className='mt-2 flex w-full'>
            {SelectType !== EContractAttributeType.CONTRACT_PARTY_INFO && (
               <Input
                  className='w-[32%]'
                  onChange={(e) => {
                     setInputValue(e.target.value);
                  }}
                  value={inputValue}
               />
            )}
            <Select
               onValueChange={(e: EContractAttributeType) => {
                  setSelectType(e);
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
            <Button
               className='ms-2 w-[25%]'
               type='button'
               onClick={handleAddAttribute}
            >
               Add New Attribute
            </Button>
         </div>
         {(SelectType === EContractAttributeType.CONTRACT_ATTRIBUTE ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
            SelectType ===
               EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
            SelectType === EContractAttributeType.TOTAL_AMOUNT) && (
            <div>
               <Textarea
                  onChange={(e) => {
                     setTextArea(e.target.value);
                  }}
                  className='mt-2 w-[100%]'
                  value={textArea}
               />
            </div>
         )}
      </div>
   );
}
