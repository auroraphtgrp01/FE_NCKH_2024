'use client';
import { useContractContext } from '@/context/ContractProvider';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import ComboboxCustomize from '@/components/ComboBoxCustomize';
import { Input } from '@/components/ui/input';

export default function Contract() {
   const { contractAttribute, setContractAttribute }: any =
      useContractContext();
   const [propertiesAdd, setPropertiesAdd] = useState<any[]>([
      {
         property: '',
         value: '',
         isCreated: false,
      },
   ]);
   const [newPropertiesArray, setNewProperties] = useState<string[]>([]);
   const [propertiesCBX, setPropertiesCBX] = useState<string[]>([
      'city',
      'date',
      'titleContract',
      'numberContract',
   ]);
   const [properties, setProperty] = useState<string>('');
   function handleChange(property: string, value: string) {
      setInputValue(value);
      const updatedProperties = propertiesAdd.map((item) => {
         if (item.property === property) {
            return { ...item, value: value };
         }
         return item;
      });
      setPropertiesAdd(updatedProperties);
   }
   useEffect(() => {
      console.log(properties);
   }, [properties]);
   function addProperty() {
      setPropertiesAdd((prevProperties) => [
         ...prevProperties.slice(0, prevProperties.length - 1),
         {
            ...prevProperties[prevProperties.length - 1],
            isCreated: true,
            property: properties,
            value: inputValue,
         },
         { property: '', value: '', isCreated: false },
      ]);
      const updatedContractAttribute = {
         ...contractAttribute,
         [properties]: inputValue,
      };
      setContractAttribute(updatedContractAttribute);
      setInputValue('');
      setProperty('');
   }
   function handleInputChange(data: any, index: any) {
      setContractAttribute({
         ...contractAttribute,
         [propertiesAdd[index].property]: data,
      });
   }
   const [inputValue, setInputValue] = useState('');
   return (
      <div>
         {propertiesAdd.map((item, index) => (
            <div className='mt-5' key={index}>
               <ComboboxCustomize
                  onSelectedData={setProperty}
                  propertiesFetch={propertiesCBX}
                  setNewProperties={(value) => {
                     setNewProperties(value);
                  }}
               ></ComboboxCustomize>
               <Input
                  onChange={(e) => {
                     handleChange(item.property, e.target.value);
                     if (item.isCreated) {
                        handleInputChange(e.target.value, index);
                     }
                  }}
                  defaultValue={item.value}
               ></Input>
            </div>
         ))}
         <Button variant={'destructive'} onClick={addProperty}>
            ADD
         </Button>
      </div>
   );
}
