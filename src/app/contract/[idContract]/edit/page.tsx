"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import PreviewContract from '../(component)/PreviewContract';
import { EContractAttributeType, EStatusAttribute, IContractAttribute, IDefinitionContractAttribute } from "@/interface/contract.i";
import { InputWithTooltip } from "@/components/InputWithTooltip";
import AddAttributeArea from '../../../../components/AddAttributeArea';
import { initContractAttribute } from "@/app/contract/[idContract]/(component)/(store)/storeContractData";
import DialogInfoAttribute from '../../../../components/DialogInfoAttribute';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function DialogEditContract() {
    const [contractAttribute, setContractAttribute] = useState(initContractAttribute);
    const [contractAttributeRaw, setContractAttributeRaw] = useState<IContractAttribute[]>(initContractAttribute);
    const { idContract } = useParams();
    const [isDetailAttributeDialog, setIsDetailAttributeDialog] = useState(false)
    const [infoOfContractAttribute, setInfoOfContractAttribute] = useState()
    useEffect(() => {
        console.log(infoOfContractAttribute);
    }, [infoOfContractAttribute])
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

        updatedAttributes.forEach((item, index) => {
            const rawItem = contractAttributeRaw[index];
            if (item.type === EContractAttributeType.CONTRACT_ATTRIBUTE) {
                if (item.value !== rawItem.value || item.property !== rawItem.property) {
                    updatedAttributes[index] = {
                        ...item,
                        statusAttribute: EStatusAttribute.UPDATE
                    };
                }
            } else {
                if (item.value !== rawItem.value) {
                    updatedAttributes[index] = {
                        ...item,
                        statusAttribute: EStatusAttribute.UPDATE
                    };
                }
            }
        });
        // call api to update contract attribute
    }

    const handleOnClickSaveChanges = () => {
        compareChangesOfContractAttribute()
        console.log(contractAttribute);
    }
    return (
        <div>
            <div className="mt-2 border-b-2 border-solid border-[#cccccc4a] flex ">
                <div className="ms-1 mt-3">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    Components
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="ml-auto mr-auto w-[60%] mb-2">
                    <Alert variant={'destructive'} className="border-2">
                        <AlertTitle className="text-center">THONG BAO TAI DAY</AlertTitle>
                    </Alert>
                </div>

                <div className="ml-auto mb-2 mt-1">
                    <Button className="me-2" type='button' onClick={handleOnClickSaveChanges} >Save Changes</Button>
                    <Button className="" variant={'destructive'}>Back</Button>
                </div>
            </div>
            <div className="w-full h-[95%] max-w-[100%] mt-2">
                <div className="overflow-hidden">
                    <div className="flex justify-between h-[100%]">
                        <div className="px-1 w-[50%]">
                            <ScrollArea className="h-[772px] rounded-md border w-[100%]">
                                <form className="max-w-[100%] border shadow-2xl p-10 text-sm w-[100%]">
                                    <div id="main">
                                        <div id="application">
                                            <div>
                                                {contractAttribute.map((item: IContractAttribute, index) => (
                                                    <div key={index}>
                                                        {item.type === EContractAttributeType.CONTRACT_HEADER && (
                                                            <h5 className="text-center font-bold flex pt-1">
                                                                <InputWithTooltip setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} onChange={(e) => {
                                                                    handleChangeAttributeInput(e, index)
                                                                }} description="" alignCenter={true} className="text-center w-[50%] justify-center ml-auto mr-auto" defaultValue={item.value} />

                                                            </h5>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_HEADER_DATE && (
                                                            <div className="flex justify-end items-end mt-5 font-semibold italic">
                                                                <Input className="text-center w-[50%] justify-end ml-auto " defaultValue={item.value} onChange={(e) => {
                                                                    handleChangeAttributeInput(e, index)
                                                                }} />
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_TITLE && (
                                                            <div>
                                                                <h1 className="text-center font-bold text-2xl mt-4 uppercase">
                                                                    <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onChange={(e) => {
                                                                        handleChangeAttributeInput(e, index)
                                                                    }} />
                                                                </h1>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_NUMBER && (
                                                            <div>
                                                                <h2 className="text-center font-bold mt-1">
                                                                    <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onChange={(e) => {
                                                                        handleChangeAttributeInput(e, index)
                                                                    }} />
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_TEXT && (
                                                            <div>
                                                                <h2 className="mt-6">
                                                                    <Textarea onChange={(e) => {
                                                                        handleValueOfTextarea(e, index)
                                                                    }} className="mr-auto " defaultValue={item.value} />
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                                                            <div>
                                                                <h1 className="mt-6 font-bold text-[18px]">
                                                                    <InputWithTooltip setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onChange={(e) => {
                                                                        handleChangeAttributeInput(e, index)
                                                                    }} />
                                                                </h1>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_HEADING_2 && (
                                                            <div>
                                                                <h1 className="mt-1 font-bold text-[18px]">
                                                                    <InputWithTooltip setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onChange={(e) => {
                                                                        handleChangeAttributeInput(e, index)
                                                                    }} />
                                                                </h1>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_ATTRIBUTE && (
                                                            <div>
                                                                <h2 className="mt-2 text-[14px] flex w-full">
                                                                    <b className="">
                                                                        <InputWithTooltip setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.property} description={''} onChange={(e) => {
                                                                            handleChangeAttributeInput(e, index)
                                                                        }} />
                                                                    </b>
                                                                    <span className="text-wrap ms-2 w-[80%]">
                                                                        <Textarea onChange={(e) => {
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
                        <div className="px-1 w-[50%]">
                            <PreviewContract contractAttribute={contractAttribute} setContractAttribute={setContractAttribute} />
                        </div>
                    </div>
                </div>
            </div>
            <DialogInfoAttribute setIsDetailAttributeDialog={setIsDetailAttributeDialog} isDetailAttributeDialog={isDetailAttributeDialog} infoOfAttribute={infoOfContractAttribute} />
        </div>
    );
}
