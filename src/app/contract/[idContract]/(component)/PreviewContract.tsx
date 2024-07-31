'use client'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EContractAttributeType, IContractAttribute } from '@/interface/contract.i'

export default function PreviewContract({
  contractAttribute,
  setContractAttribute
}: {
  contractAttribute: IContractAttribute[]
  setContractAttribute: (item: any) => void
}) {
  return (
    <div className='h-[100%]'>
      <ScrollArea className='h-[755px] min-h-[750px] w-[100%] flex-1 rounded-xl'>
        <form className='w-[100%] max-w-[100%] p-10 text-sm'>
          <div id='main'>
            <div id='application'>
              {contractAttribute?.map((item: IContractAttribute, index) => (
                <div key={index}>
                  {item.type === EContractAttributeType.CONTRACT_HEADER && (
                    <h5 className='text-center font-bold'>{item.value}</h5>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_HEADER_DATE && (
                    <div className='mt-5 flex items-end justify-end font-semibold italic'>
                      <span>{item.value}</span>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_TITLE && (
                    <div>
                      <h1 className='mb-7 mt-5 text-center text-2xl font-bold uppercase'>{item.value}</h1>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_NUMBER && (
                    <div>
                      <h2 className='mt-1 text-center font-bold'>{item.value}</h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_TEXT && (
                    <div>
                      <h2 className='mt-2 whitespace-pre-line'>{item.value}</h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                    <div>
                      <h1 className='mt-3 text-[18px] font-bold'>{item.value}</h1>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_HEADING_2 && (
                    <div>
                      <h2 className='mt-3 text-[16px] font-bold'>{item.value}</h2>
                    </div>
                  )}
                  {(item.type === EContractAttributeType.CONTRACT_ATTRIBUTE ||
                    item.type === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
                    item.type === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
                    item.type === EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND) && (
                    <div>
                      <h2 className='mt-2 text-justify text-[14px]'>
                        - <b className='ms-1'>{item.property}</b>: <span className='text-wrap'>{item.value}</span>
                      </h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.CONTRACT_PAYMENT_STAGE && (
                    <div>
                      <h2 className='mt-2 text-justify text-[14px]'>
                        - <b className='ms-1'>{item.property}</b>: <span className='text-wrap'>{item.value}%</span>
                        <br />
                        <span>{item.descriptionOfStage}</span>
                      </h2>
                    </div>
                  )}
                  {item.type === EContractAttributeType.TOTAL_AMOUNT && (
                    <div>
                      <h2 className='mt-2 text-justify text-[14px]'>
                        - <b className='ms-1'>{item.property}</b>: <span className='text-wrap'>{item.value} ETH</span>
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
  )
}
