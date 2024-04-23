import ComboboxCustomize from '@/components/ComboBoxCustomize'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { toast, useToast } from "@/components/ui/use-toast"
export interface IAddPropertyAreaProps {
    propertiesCBX: string[]
    setPropertiesCBX: (value: string[]) => void
    newPropertiesArray: string[]
    setNewProperties: (value: string[]) => void,
    contractAttribute: any,
    setContractAttribute: (value: any) => void
}

export default function AddPropertySingle(
    { propertiesCBX, setPropertiesCBX, newPropertiesArray, setNewProperties, contractAttribute, setContractAttribute }: IAddPropertyAreaProps
) {
    const [properties, setProperty] = useState<string>('')
    const { toast } = useToast()
    const [inputValue, setInputValue] = useState('')
    const [propertyValue, setPropertyValue] = useState('')
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
        setContractAttribute({
            ...contractAttribute, [key]: {
                type: 'DKHD',
                value: event
            }
        });
    };
    function handleChangepropertyValue(property: string, value: string, index: any) {
        setPropertyValue(value);
        const updatedProperties = propertiesAdd.map((item) => {
            if (item.property === property) {
                return { ...item, value: value };
            }
            return item;
        });
        setPropertiesAdd(updatedProperties);

        console.log('index :' + index);

    }
    function handleInputChangepropertyValue(key: any, event: any) {
        setContractAttribute({
            ...contractAttribute, [key]: {
                type: 'DKHD',
                value: event
            }
        });
    };
    function removeDuplicates(array: any) {
        return array.filter((item: any, index: any) => array.indexOf(item) === index);
    }
    function addProperty(index: any) {
        if (inputValue == '' || propertyValue == '') {
            toast({
                title: "Update your PIN",
                description: "Please update your PIN to continue with this action.",
                variant: "destructive",
            })
            setInputValue('');
            setProperty('');
            return
        }
        setPropertiesAdd(prevProperties => [
            ...prevProperties.slice(0, prevProperties.length - 1),
            { ...prevProperties[prevProperties.length - 1], isCreated: true, property: properties, value: inputValue },
            { property: '', value: '', isCreated: false },
        ]);
        const updatedContractAttribute = properties === 'propertyValue' ? {
            ...contractAttribute,
            [propertyValue]: {
                value: '',
                id: index,
                idArea: 1,
                type: properties,
            }
        } : {
            ...contractAttribute,
            [propertyValue]: {
                value: inputValue,
                id: index,
                idArea: propertyValue,
                type: properties,
            }
        };
        setContractAttribute(updatedContractAttribute);
        setInputValue('');
        setProperty('');
    }

    useEffect(() => {
        console.log(propertiesAdd);

    }, [propertiesAdd])

    return (
        <div>
            {propertiesAdd.map((item, index) => (
                <div className='mt-5' key={index}>
                    <div className='flex items-center my-5'>
                        <Input placeholder='Nhập ..' className='mr-3' onBlur={(e) => {
                            handleChangepropertyValue(item.property, e.target.value, index)
                            if (item.isCreated) {
                                handleInputChangepropertyValue(item.property, e.target.value)
                            }
                        }} defaultValue={item.value}></Input>
                        <ComboboxCustomize onSelectedData={setProperty} propertiesCBX={propertiesCBX} setPropertiesCBX={setPropertiesCBX} setNewProperties={setNewProperties} newPropertiesArray={newPropertiesArray}>
                        </ComboboxCustomize>
                        {index === propertiesAdd.length - 1 && (
                            <span>
                                <Button variant={'destructive'} onClick={() => { addProperty(index) }} type='button' className='ml-3'>
                                    Add New Agreement
                                </Button>
                            </span>
                        )}

                    </div>
                    <Textarea onBlur={(e) => {
                        handleChange(item.property, e.target.value)
                        if (item.isCreated) {
                            handleInputChange(item.property, e.target.value)
                        }
                    }} >
                    </Textarea>
                </div>
            ))}

        </div>
    )
}