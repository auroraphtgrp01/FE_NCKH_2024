"use client";
import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useRouter } from "next/navigation";
import PreviewContract from '../(component)/PreviewContract';
import { EContractAttributeType, EStatusAttribute, IContractAttribute, IDefinitionContractAttribute } from "@/interface/contract.i";
import { InputWithTooltip } from "@/components/InputWithTooltip";
import AddAttributeArea from '../../../../components/AddAttributeArea';
import { v4 as uuidv4 } from 'uuid';
import DialogInfoAttribute from '../../../../components/DialogInfoAttribute';
import { fetchAPI } from "@/utils/fetchAPI";
import { useToast } from "@/components/ui/use-toast";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import { Button } from "@/components/ui/button";

export default function DialogEditContract() {
    const [contractAttribute, setContractAttribute] = useState<any[]>([]);
    const [contractAttributeRaw, setContractAttributeRaw] = useState<any[]>([]);
    const { idContract } = useParams();
    const [isDetailAttributeDialog, setIsDetailAttributeDialog] = useState(false)
    const [infoOfContractAttribute, setInfoOfContractAttribute] = useState()
    const [deleteArray, setDeleteArray] = useState<any[]>([])
    const { toast } = useToast()
    const Router = useRouter();
    const getData = React.useCallback(async (idContract: string) => {
        return await fetchAPI(`/contracts/get-contract-details/${idContract}`, "GET")
            .then((response) => {
                setContractAttribute(response.data.contractAttributes);
                setContractAttributeRaw(response.data.contractAttributes);
            })
            .catch((error) => {
            });
    }, [setContractAttribute, setContractAttributeRaw]);

    React.useLayoutEffect(() => {
        if (idContract) {
            getData(idContract as string);
        }
    }, [idContract, getData]);
    useEffect(() => {
        console.log(contractAttribute);
    }, [contractAttribute])

    const handleChangeAttributeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedAttributes = [...contractAttribute];
        const attributeToUpdate = updatedAttributes[index];

        if (attributeToUpdate.type === EContractAttributeType.CONTRACT_ATTRIBUTE) {
            updatedAttributes[index] = {
                ...attributeToUpdate,
                property: e.target.value,
            };
        } else {
            updatedAttributes[index] = {
                ...attributeToUpdate,
                value: e.target.value,
            };
        }
        setContractAttribute(updatedAttributes);
    };
    const handleValueOfTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const updatedAttributes = [...contractAttribute];
        const attributeToUpdate = updatedAttributes[index];
        updatedAttributes[index] = {
            ...attributeToUpdate,
            value: e.target.value,
        };
        setContractAttribute(updatedAttributes);
    }
    function compareChangesOfContractAttribute() {
        const updatedAttributes = [...contractAttribute];

        let payload = updatedAttributes.map((item, index) => {
            const updatedItem = {
                ...item,
                index
            };
            const rawItem = contractAttributeRaw[index];
            if (item.statusAttribute === EStatusAttribute.CREATE) {
                return updatedItem;
            }
            if (item.type === EContractAttributeType.CONTRACT_ATTRIBUTE) {
                if (item?.value !== rawItem?.value || item.property !== rawItem.property) {
                    updatedItem.statusAttribute = EStatusAttribute.UPDATE;
                }
            } else {
                if (item?.value !== rawItem?.value) {
                    updatedItem.statusAttribute = EStatusAttribute.UPDATE;
                }
            }
            return updatedItem;
        });
        fetchAPI('/contracts/attribute', 'PATCH', {
            id: idContract,
            updatedAttributes: payload,
            deleteArray
        }).then((response) => {
            payload = []
            setDeleteArray([])
            Router.push(`/contract/${idContract}`)
            toast({
                title: "Update Successfully",
                description: "Your changes have been saved successfully",
                variant: "default",
            })
        })
            .catch((error) => {
                toast({
                    title: "Update Failed",
                    description: "Your changes have not been saved successfully",
                    variant: "destructive",
                })
            }
            )
    }

    const handleOnClickSaveChanges = () => {
        compareChangesOfContractAttribute()
    }
    return (
        <div className="h-[100%]">
            <div className="flex h-[100%] w-full flex-col ">
                <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
                    <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
                        <div className='flex translate-x-[-40px]'>
                            <BreadCrumbHeader />
                            <Button variant={'default'} onClick={handleOnClickSaveChanges} className="ms-2">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </header>
                <main className="flex mx-10 gap-2">
                    <div className="px-1 w-[50%] h-[74%] border rounded-lg my-2">
                        <ScrollArea className=" w-[100%]  h-[100%] ">
                            <form className="max-w-[100%] p-10 text-sm w-[100%]">
                                <div id="main">
                                    <div id="application">
                                        <div>
                                            {contractAttribute.map((item: IContractAttribute, index) => (
                                                <div key={uuidv4()}>
                                                    {item.type === EContractAttributeType.CONTRACT_HEADER && (
                                                        <h5 className="text-center font-bold flex pt-1">
                                                            <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} onBlur={(e) => {
                                                                handleChangeAttributeInput(e, index)
                                                            }} description="" alignCenter={true} className="text-center w-[50%] justify-center ml-auto mr-auto" defaultValue={item.value} />
                                                        </h5>
                                                    )}
                                                    {item.type === EContractAttributeType.CONTRACT_HEADER_DATE && (
                                                        <div className="flex justify-center items-end mt-5 font-semibold italic">
                                                            <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} onBlur={(e) => {
                                                                handleChangeAttributeInput(e, index)
                                                            }} description="" alignCenter={true} className="text-center w-[50%] justify-end ml-auto" defaultValue={item.value} />
                                                        </div>
                                                    )}
                                                    {item.type === EContractAttributeType.CONTRACT_TITLE && (
                                                        <div>
                                                            <h1 className="text-center font-bold text-2lg mt-4 uppercase">
                                                                <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onBlur={(e) => {
                                                                    handleChangeAttributeInput(e, index)
                                                                }} />
                                                            </h1>
                                                        </div>
                                                    )}
                                                    {item.type === EContractAttributeType.CONTRACT_NUMBER && (
                                                        <div>
                                                            <h2 className="text-center font-bold mt-1">
                                                                <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onBlur={(e) => {
                                                                    handleChangeAttributeInput(e, index)
                                                                }} />
                                                            </h2>
                                                        </div>
                                                    )}
                                                    {item.type === EContractAttributeType.CONTRACT_TEXT && (
                                                        <div className="mt-6">
                                                            <Textarea
                                                                onBlur={(e) => handleValueOfTextarea(e, index)}
                                                                className="mr-auto"
                                                                defaultValue={item.value}
                                                            />
                                                        </div>
                                                    )}
                                                    {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                                                        <div>
                                                            <h1 className="mt-6 font-bold text-[18px]">
                                                                <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onBlur={(e) => {
                                                                    handleChangeAttributeInput(e, index)
                                                                }} />
                                                            </h1>
                                                        </div>
                                                    )}
                                                    {item.type === EContractAttributeType.CONTRACT_HEADING_2 && (
                                                        <div>
                                                            <h1 className="mt-1 font-bold text-[18px]">
                                                                <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onBlur={(e) => {
                                                                    handleChangeAttributeInput(e, index)
                                                                }} />
                                                            </h1>
                                                        </div>
                                                    )}
                                                    {item.type === EContractAttributeType.CONTRACT_ATTRIBUTE && (
                                                        <div>
                                                            <h2 className="mt-2 text-[14px] flex w-full">
                                                                <b className="">
                                                                    <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.property} description={''} onBlur={(e) => {
                                                                        handleChangeAttributeInput(e, index)
                                                                    }} />
                                                                </b>
                                                                <span className="text-wrap ms-2 w-[80%]">
                                                                    <Textarea onBlur={(e) => {
                                                                        handleValueOfTextarea(e, index)
                                                                    }} className="mr-auto " defaultValue={item.value} />
                                                                </span>
                                                            </h2>
                                                        </div>
                                                    )}
                                                    {item.statusAttribute === EStatusAttribute.PREPARE && (
                                                        <div>
                                                            <AddAttributeArea setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <AddAttributeArea setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} />
                                    </div>
                                </div>
                            </form>
                        </ScrollArea>
                    </div>
                    <div className="px-1 w-[50%] h-[74%] border rounded-lg my-2">
                        <PreviewContract contractAttribute={contractAttribute} setContractAttribute={setContractAttribute} />
                    </div>
                </main>
            </div>
            <DialogInfoAttribute setIsDetailAttributeDialog={setIsDetailAttributeDialog} isDetailAttributeDialog={isDetailAttributeDialog} infoOfAttribute={infoOfContractAttribute} />
        </div>
    );
}
