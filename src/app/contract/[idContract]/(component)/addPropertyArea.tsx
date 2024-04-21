import ComboboxCustomize from '@/components/ComboBoxCustomize'
import { Input } from '@/components/ui/input'
import { useContractContext } from '@/context/ContractProvider';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';


export interface IAddPropertyAreaProps {
    propertiesCBX: string[]
    setPropertiesCBX: (value: string[]) => void
    newPropertiesArray: string[]
    setNewProperties: (value: string[]) => void,
    contractAttribute: any,
    setContractAttribute: (value: any) => void
}

export default function AddPropertyArea(
    { propertiesCBX, setPropertiesCBX, newPropertiesArray, setNewProperties, contractAttribute, setContractAttribute }: IAddPropertyAreaProps
) {
    const [properties, setProperty] = useState<string>('')
    const [inputValue, setInputValue] = useState('')
    const [propertiesAdd, setPropertiesAdd] = useState<any[]>([
        {
            property: '',
            value: '',
            isCreated: false
        }
    ]);
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
    };
    function addProperty() {
        setPropertiesAdd(prevProperties => [
            ...prevProperties.slice(0, prevProperties.length - 1),
            { ...prevProperties[prevProperties.length - 1], isCreated: true, property: properties, value: inputValue },
            { property: '', value: '', isCreated: false },
        ]);
        const updatedContractAttribute = { ...contractAttribute, [properties]: inputValue };
        setContractAttribute(updatedContractAttribute);
        setPropertiesCBX([...propertiesCBX, properties]);
        setInputValue('');
        setProperty('');
    }
    return (
        <div>
            {propertiesAdd.map((item, index) => (
                <div className='mt-5' key={index}>
                    <ComboboxCustomize onSelectedData={setProperty} propertiesFetch={propertiesCBX} setNewProperties={(value) => {
                        setNewProperties(value)
                    }} newPropertiesArray={newPropertiesArray}>
                    </ComboboxCustomize>
                    <Input onChange={(e) => {
                        handleChange(item.property, e.target.value)
                        if (item.isCreated) {
                            handleInputChange(item.property, e.target.value)
                        }
                    }} defaultValue={item.value}>
                    </Input>
                </div>
            ))}
            <Button variant={'destructive'} onClick={addProperty} type='button'>
                Add New Property
            </Button>
        </div>
    )
}
