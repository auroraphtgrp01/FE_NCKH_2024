import ComboboxCustomize from '@/components/ComboBoxCustomize';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IAddPropertyAreaProps } from '@/interface/contract.i';

export default function AddPropertyArea({
   propertiesCBX,
   setPropertiesCBX,
   newPropertiesArray,
   setNewProperties,
   contractAttribute,
   setContractAttribute,
}: IAddPropertyAreaProps) {
   const [properties, setProperty] = useState<string>('');
   const [inputValue, setInputValue] = useState('');
   const [propertiesAdd, setPropertiesAdd] = useState<any[]>([]);
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
   function handleInputChange(key: any, event: any) {
      setContractAttribute({ ...contractAttribute, [key]: event });
   }
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
   return (
      <div>
         {propertiesAdd.map((item, index) => (
            <div className='mt-3' key={index}>
               <ComboboxCustomize
                  onSelectedData={setProperty}
                  propertiesCBX={propertiesCBX}
                  setPropertiesCBX={setPropertiesCBX}
                  setNewProperties={setNewProperties}
                  newPropertiesArray={newPropertiesArray}
               ></ComboboxCustomize>
               {/* <Input
            onChange={(e) => {
              handleChange(item.property, e.target.value);
              if (item.isCreated) {
                handleInputChange(item.property, e.target.value);
              }
            }}
            defaultValue={item.value}
          ></Input> */}
               <Textarea
                  className='my-3 h-[100px]'
                  placeholder='Nhập các điều khoản chính'
                  onChange={(e) => {
                     handleChange(item.property, e.target.value);
                     if (item.isCreated) {
                        handleInputChange(item.property, e.target.value);
                     }
                  }}
                  defaultValue={item.value}
               ></Textarea>
            </div>
         ))}
         <Button variant={'destructive'} onClick={addProperty} type='button'>
            Add New Property
         </Button>
      </div>
   );
}
