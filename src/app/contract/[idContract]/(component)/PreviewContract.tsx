"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EContractAttributeType, IContractAttribute } from "@/interface/contract.i";

export default function PreviewContract({ contractAttribute, setContractAttribute }: { contractAttribute: IContractAttribute[], setContractAttribute: (item: any) => void }) {
  return (
    <div className="h-[100%]">
      <ScrollArea className="min-h-[750px] h-[755px] rounded-xl  w-[100%] flex-1">
        <form className="max-w-[100%]  p-10 text-sm w-[100%]">
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
                      <h2 className="mt-6 whitespace-pre-line">
                        {item.value}
                      </h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                    <div>
                      <h1 className="mt-3 font-bold text-[18px]">
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
                  {(item.type === EContractAttributeType.CONTRACT_ATTRIBUTE
                    || item.type === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED
                    || item.type === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE
                    || item.type === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND
                    || item.type === EContractAttributeType.TOTAL_AMOUNT
                  ) && (
                      <div>
                        <h2 className="mt-2 text-[14px] text-justify">
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
