"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import PreviewContract from '../(component)/PreviewContract';
import { EContractAttributeType, IContractAttribute, IDefinitionContractAttribute } from "@/interface/contract.i";
import { InputWithTooltip } from "@/components/InputWithTooltip";
import AddAttributeArea from '../../../../components/AddAttributeArea';
import { initContractAttribute } from "@/app/contract/[idContract]/(component)/(store)/storeContractData";

export default function DialogEditContract() {
    const [contractAttribute, setContractAttribute] = useState(initContractAttribute);
    const { idContract } = useParams();
    useEffect(() => {
        console.log(contractAttribute);
    }, [contractAttribute])
    const transformDataToHtml = (data: IDefinitionContractAttribute) => {
        return `
            <div>
                <b>Type</b>: ${data.type} <br />
                ${data.createdBy ? `<b>Created By</b>: ${data.createdBy} <br />` : ''}
                ${data.updatedBy ? `<b>Updated By</b>: ${data.updatedBy} <br />` : ''}
            </div>
        `;
    };
    const handleChangeAttributeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedAttributes = [...contractAttribute];
        const attributeToUpdate = updatedAttributes[index];

        if (attributeToUpdate.type === EContractAttributeType.CONTRACT_ATTRIBUTE) {
            updatedAttributes[index] = {
                ...attributeToUpdate,
                property: e.target.value
            };
        } else {
            updatedAttributes[index] = {
                ...attributeToUpdate,
                value: e.target.value
            };
        }

        setContractAttribute(updatedAttributes);
    };
    return (
        <div>
            <div className="w-full h-[95%] max-w-[100%] mt-5">
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
                                                                <InputWithTooltip onChange={(e) => {
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
                                                                    <Textarea className="mr-auto " defaultValue={item.value} />
                                                                </h2>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                                                            <div>
                                                                <h1 className="mt-6 font-bold text-[18px]">
                                                                    <InputWithTooltip defaultValue={item.value} description={''} onChange={(e) => {
                                                                        handleChangeAttributeInput(e, index)
                                                                    }} />
                                                                </h1>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_HEADING_2 && (
                                                            <div>
                                                                <h1 className="mt-1 font-bold text-[18px]">
                                                                    <InputWithTooltip defaultValue={item.value} description={''} onChange={(e) => {
                                                                        handleChangeAttributeInput(e, index)
                                                                    }} />
                                                                </h1>
                                                            </div>
                                                        )}
                                                        {item.type === EContractAttributeType.CONTRACT_ATTRIBUTE && (
                                                            <div>
                                                                <h2 className="mt-2 text-[14px] flex w-full">
                                                                    <b className="">
                                                                        <InputWithTooltip defaultValue={item.property} description={''} onChange={(e) => {
                                                                            handleChangeAttributeInput(e, index)
                                                                        }} />
                                                                    </b>
                                                                    <span className="text-wrap ms-2 w-[80%]">
                                                                        <Textarea className="mr-auto " defaultValue={item.value} />
                                                                    </span>
                                                                </h2>
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
        </div>
    );
}
