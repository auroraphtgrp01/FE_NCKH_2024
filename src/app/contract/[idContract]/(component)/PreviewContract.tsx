"use client";
import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { EContractAttributeType, IContractAttribute } from "@/interface/contract.i";
import { ContractState } from "@/app/contract/[idContract]/(component)/(store)/storeContractData";

export default function PreviewContract({ contractAttribute, setContractAttribute }: { contractAttribute: IContractAttribute[], setContractAttribute: (item: any) => void }) {
  return (
    <div className="flex-1">
      <ScrollArea className="min-h-[750px] h-[755px] rounded-xl border w-[100%] flex-1">
        <form className="max-w-[100%] min-h-[781px] h-[700px] border shadow-2xl p-10 text-sm w-[100%]">
          <div id="main">
            <div id="application">
              {contractAttribute?.map((item: IContractAttribute, index) => (
                <div key={index}>
                  {item.type === EContractAttributeType.CONTRACT_HEADER && (
                    <h5 className="text-center font-bold">
                      {item.value}
                    </h5>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_HEADER_DATE && (
                    <div className="flex justify-end items-end mt-5 font-semibold italic">
                      <span>{item.value}</span>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_TITLE && (
                    <div>
                      <h1 className="text-center font-bold text-2xl mt-5 uppercase">
                        {item.value}
                      </h1>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_NUMBER && (
                    <div>
                      <h2 className="text-center font-bold mt-1">
                        {item.value}
                      </h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_TEXT && (
                    <div>
                      <h2 className="mt-6">
                        {item.value}
                      </h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                    <div>
                      <h1 className="mt-6 font-bold text-[18px]">
                        {item.value}
                      </h1>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_HEADING_2 && (
                    <div>
                      <h2 className="mt-3 font-bold text-[16px]">
                        {item.value}
                      </h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_ATTRIBUTE && (
                    <div>
                      <h2 className="mt-3 text-[14px] ms-2">
                        -  <b className="ms-1">{item.property}</b>: {" "}
                        <span className="text-wrap ">
                          {item.value}
                        </span>
                      </h2>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
}
