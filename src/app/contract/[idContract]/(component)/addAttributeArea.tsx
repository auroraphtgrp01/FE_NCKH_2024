/* eslint-disable react-hooks/rules-of-hooks */

import ComboboxCustomize from '@/components/ComboBoxCustomize'
import SelectWithData from '@/components/SelectWithData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getKeyByValue } from '@/utils/getKeyEnumFromValue'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


export interface IAttributeAdd {
    property: string
    value: {
        id: string
        idArea: string
        valueAttribute: string
        type: ETypeAttribute
    }
    isCreated?: boolean
}
export enum ETypeAttribute {
    CONTRACT_TITLE = 'Title',
    CONTRACT_ATTRIBUTE = 'Attribute'
}
export interface IAddPropertyAreaProps {
    contractAttribute: any,
    setContractAttribute: (value: any) => void
}
export default function AddAttributeArea({ contractAttribute, setContractAttribute }: IAddPropertyAreaProps) {
    const idContract = '11111'
    const [selectType, setSelectType] = useState<ETypeAttribute>(ETypeAttribute.CONTRACT_TITLE);
    const [propertiesAdd, setPropertiesAdd] = useState<IAttributeAdd[]>([
        {
            property: '',
            value: {
                id: uuidv4(),
                idArea: idContract,
                type: ETypeAttribute.CONTRACT_TITLE,
                valueAttribute: ''
            },
            isCreated: false
        }
    ]);
    let isAddPropertyArr: boolean = false

    function handleChangeTextArea(index: number, value: string) {
        const updatedProperties = [...propertiesAdd];
        updatedProperties[index] = {
            ...updatedProperties[index],
            value: {
                ...updatedProperties[index].value,
                valueAttribute: value,
                type: ETypeAttribute.CONTRACT_ATTRIBUTE
            }
        };
        setPropertiesAdd(updatedProperties);
    }

    function addProperty() {
        setPropertiesAdd(prevProperties => [
            ...prevProperties.slice(0, prevProperties.length - 1),
            {
                ...prevProperties[prevProperties.length - 1],
                isCreated: true,
                value: {
                    ...prevProperties[prevProperties.length - 1].value,
                    type: (getKeyByValue(selectType, ETypeAttribute) ? ETypeAttribute.CONTRACT_ATTRIBUTE : ETypeAttribute.CONTRACT_TITLE)
                }
            },
            {
                property: '',
                value: {
                    id: uuidv4(),
                    idArea: idContract,
                    type: ETypeAttribute.CONTRACT_TITLE,
                    valueAttribute: ''
                },
                isCreated: false
            }
        ]);
        isAddPropertyArr = true
    }

    function handleAddContractAttribute() {
        const item = propertiesAdd[propertiesAdd.length - 1]
        isAddPropertyArr = false
        switch (selectType) {
            case getKeyByValue(ETypeAttribute.CONTRACT_ATTRIBUTE, ETypeAttribute): {
                const updatedContractAttribute = {
                    ...contractAttribute,
                    [item.property]: {
                        id: propertiesAdd[propertiesAdd.length - 1].value.id,
                        idArea: findParentId(propertiesAdd.length - 1),
                        valueAttribute: propertiesAdd[propertiesAdd.length - 1].value.valueAttribute,
                        type: ETypeAttribute.CONTRACT_ATTRIBUTE
                    }
                };
                setContractAttribute(updatedContractAttribute);
                break
            }
            case getKeyByValue(ETypeAttribute.CONTRACT_TITLE, ETypeAttribute): {
                const updatedContractAttribute = {
                    ...contractAttribute,
                    [item.property]: {
                        id: propertiesAdd[propertiesAdd.length - 1].value.id,
                        idArea: idContract,
                        valueAttribute: propertiesAdd[propertiesAdd.length - 1].value.valueAttribute,
                        type: ETypeAttribute.CONTRACT_TITLE
                    }
                };
                setContractAttribute(updatedContractAttribute);
                break
            }
            default: return
        }
    }

    function findParentId(index: number) {
        let parent;
        for (let i = index; i >= 0; i--) {

            if (propertiesAdd[i].value.type == ETypeAttribute.CONTRACT_TITLE) {
                console.log(propertiesAdd[i].value);
                parent = propertiesAdd[i]
                break
            }
        }
        if (!parent) {
            return idContract
        }
        return parent.value.id
    }

    function handleChangeInput(index: number, value: string) {
        const updatedProperties = [...propertiesAdd];
        updatedProperties[index] = {
            ...propertiesAdd[index],
            property: value,
            value: {
                ...propertiesAdd[index].value,
                valueAttribute: value
            },
        };
        setPropertiesAdd(updatedProperties);

    }

    useEffect(() => {
        handleAddContractAttribute()
    }, [propertiesAdd]);

    return (
        <div>
            {propertiesAdd.map((item, index) => (
                <div className='mt-5' key={index}>
                    <div className='flex items-center my-5'>
                        <Input placeholder='Nhập ..' className='mr-3' onChange={
                            (e) => {
                                handleChangeInput(index, e.target.value)
                            }
                        }></Input>
                        <SelectWithData setSelectData={setSelectType} />
                        {index === propertiesAdd.length - 1 && (
                            <span>
                                <Button variant={'destructive'} type='button' className='ml-3' onClick={addProperty}>
                                    Add New Agreement
                                </Button>
                            </span>
                        )}

                    </div>
                    <Textarea onChange={(e) => {
                        handleChangeTextArea(index, e.target.value)
                        // if (item.isCreated) {
                        //     handleInputChange(item.property, e.target.value)
                        // }
                    }}>
                    </Textarea>
                </div>
            ))}

        </div>
    )
}
