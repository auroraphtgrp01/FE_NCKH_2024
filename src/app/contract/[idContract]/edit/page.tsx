'use client';
import React, { use, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams, useRouter } from 'next/navigation';
import PreviewContract from '../(component)/PreviewContract';
import {
  EContractAttributeType,
  EStatusAttribute,
  IContractAttribute,
  IDefinitionContractAttribute,
} from '@/interface/contract.i';
import { InputWithTooltip } from '@/components/InputWithTooltip';
import AddAttributeArea from '../../../../components/AddAttributeArea';
import { v4 as uuidv4 } from 'uuid';
import DialogInfoAttribute from '../../../../components/DialogInfoAttribute';
import { fetchAPI } from '@/utils/fetchAPI';
import { useToast } from '@/components/ui/use-toast';
import BreadCrumbHeader from '@/components/BreadCrumbHeader';
import { Button } from '@/components/ui/button';

export default function DialogEditContract() {
  const [contractAttribute, setContractAttribute] = useState<any[]>([]);
  const [contractAttributeRaw, setContractAttributeRaw] = useState<any[]>([]);
  const { idContract } = useParams();
  const [isDetailAttributeDialog, setIsDetailAttributeDialog] = useState(false);
  const [infoOfContractAttribute, setInfoOfContractAttribute] = useState();
  const [deleteArray, setDeleteArray] = useState<any[]>([]);
  const { toast } = useToast();
  const Router = useRouter();
  const getData = React.useCallback(
    async (idContract: string) => {
      return await fetchAPI(
        `/contracts/get-contract-details/${idContract}`,
        'GET'
      )
        .then((response) => {
          setContractAttribute(response.data.contractAttributes);
          setContractAttributeRaw(response.data.contractAttributes);
        })
        .catch((error) => {});
    },
    [setContractAttribute, setContractAttributeRaw]
  );

  React.useLayoutEffect(() => {
    if (idContract) {
      getData(idContract as string);
    }
  }, [idContract, getData]);
  useEffect(() => {
    console.log(contractAttribute);
  }, [contractAttribute]);

  const handleChangeAttributeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedAttributes = [...contractAttribute];
    const attributeToUpdate = updatedAttributes[index];

    if (
      attributeToUpdate.type === EContractAttributeType.CONTRACT_ATTRIBUTE ||
      attributeToUpdate.type ===
        EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
      attributeToUpdate.type ===
        EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
      attributeToUpdate.type ===
        EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
      attributeToUpdate.type === EContractAttributeType.TOTAL_AMOUNT
    ) {
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
  const handleValueOfTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedAttributes = [...contractAttribute];
    const attributeToUpdate = updatedAttributes[index];
    updatedAttributes[index] = {
      ...attributeToUpdate,
      value: e.target.value,
    };
    setContractAttribute(updatedAttributes);
  };
  function compareChangesOfContractAttribute() {
    const updatedAttributes = [...contractAttribute];

    let payload = updatedAttributes.map((item, index) => {
      const updatedItem = {
        ...item,
        index,
      };
      const rawItem = contractAttributeRaw[index];
      if (item.statusAttribute === EStatusAttribute.CREATE) {
        return updatedItem;
      }
      if (item.type === EContractAttributeType.CONTRACT_ATTRIBUTE) {
        if (
          item?.value !== rawItem?.value ||
          item.property !== rawItem.property
        ) {
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
      deleteArray,
    })
      .then((response) => {
        payload = [];
        setDeleteArray([]);
        Router.push(`/contract/${idContract}`);
        toast({
          title: 'Update Successfully',
          description: 'Your changes have been saved successfully',
          variant: 'default',
        });
      })
      .catch((error) => {
        toast({
          title: 'Update Failed',
          description: 'Your changes have not been saved successfully',
          variant: 'destructive',
        });
      });
  }
  const handleOnClickSaveChanges = () => {
    compareChangesOfContractAttribute();
  };
  return (
    <div className='h-[100%]'>
      <div className='flex h-[100%] w-full flex-col'>
        <header className='sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background'>
          <div className='relative mb-3 ml-auto flex flex-1 md:grow-0'>
            <div className='flex translate-x-[-40px]'>
              <BreadCrumbHeader />
              <Button
                variant={'default'}
                onClick={handleOnClickSaveChanges}
                className='ms-2'
              >
                Save Changes
              </Button>
            </div>
          </div>
        </header>
        <main className='mx-10 flex gap-2'>
          <div className='my-2 h-[760px] w-[50%] rounded-lg border px-1'>
            <ScrollArea className='h-[100%] w-[100%]'>
              <form className='w-[100%] max-w-[100%] p-10 text-sm'>
                <div id='main'>
                  <div id='application'>
                    <div>
                      {contractAttribute.map(
                        (item: IContractAttribute, index) => (
                          <div key={uuidv4()}>
                            {item.type ===
                              EContractAttributeType.CONTRACT_HEADER && (
                              <h5 className='flex pt-1 text-center font-bold'>
                                <InputWithTooltip
                                  deleteArray={deleteArray}
                                  setDeleteArray={setDeleteArray}
                                  setInfoOfContractAttribute={
                                    setInfoOfContractAttribute
                                  }
                                  setIsDetailOpen={setIsDetailAttributeDialog}
                                  setContractAttribute={setContractAttribute}
                                  contractAttribute={contractAttribute}
                                  index={index}
                                  onBlur={(e) => {
                                    handleChangeAttributeInput(e, index);
                                  }}
                                  description=''
                                  alignCenter={true}
                                  className='ml-auto mr-auto w-[50%] justify-center text-center'
                                  defaultValue={item.value}
                                />
                              </h5>
                            )}
                            {item.type ===
                              EContractAttributeType.CONTRACT_HEADER_DATE && (
                              <div className='mt-5 flex items-end justify-center font-semibold italic'>
                                <InputWithTooltip
                                  deleteArray={deleteArray}
                                  setDeleteArray={setDeleteArray}
                                  setInfoOfContractAttribute={
                                    setInfoOfContractAttribute
                                  }
                                  setIsDetailOpen={setIsDetailAttributeDialog}
                                  setContractAttribute={setContractAttribute}
                                  contractAttribute={contractAttribute}
                                  index={index}
                                  onBlur={(e) => {
                                    handleChangeAttributeInput(e, index);
                                  }}
                                  description=''
                                  alignCenter={true}
                                  className='ml-auto w-[50%] justify-end text-center'
                                  defaultValue={item.value}
                                />
                              </div>
                            )}
                            {item.type ===
                              EContractAttributeType.CONTRACT_TITLE && (
                              <div>
                                <h1 className='text-2lg mt-4 text-center font-bold uppercase'>
                                  <Input
                                    className='ml-auto mr-auto w-[50%] text-center'
                                    defaultValue={item.value}
                                    onBlur={(e) => {
                                      handleChangeAttributeInput(e, index);
                                    }}
                                  />
                                </h1>
                              </div>
                            )}
                            {item.type ===
                              EContractAttributeType.CONTRACT_NUMBER && (
                              <div>
                                <h2 className='mt-1 text-center font-bold'>
                                  <Input
                                    className='ml-auto mr-auto w-[50%] text-center'
                                    defaultValue={item.value}
                                    onBlur={(e) => {
                                      handleChangeAttributeInput(e, index);
                                    }}
                                  />
                                </h2>
                              </div>
                            )}
                            {item.type ===
                              EContractAttributeType.CONTRACT_TEXT && (
                              <div className='mt-6'>
                                <Textarea
                                  onBlur={(e) =>
                                    handleValueOfTextarea(e, index)
                                  }
                                  className='mr-auto'
                                  defaultValue={item.value}
                                />
                              </div>
                            )}
                            {item.type ===
                              EContractAttributeType.CONTRACT_HEADING_1 && (
                              <div>
                                <h1 className='mt-6 text-[18px] font-bold'>
                                  <InputWithTooltip
                                    deleteArray={deleteArray}
                                    setDeleteArray={setDeleteArray}
                                    setInfoOfContractAttribute={
                                      setInfoOfContractAttribute
                                    }
                                    setIsDetailOpen={setIsDetailAttributeDialog}
                                    setContractAttribute={setContractAttribute}
                                    contractAttribute={contractAttribute}
                                    index={index}
                                    defaultValue={item.value}
                                    description={''}
                                    onBlur={(e) => {
                                      handleChangeAttributeInput(e, index);
                                    }}
                                  />
                                </h1>
                              </div>
                            )}
                            {item.type ===
                              EContractAttributeType.CONTRACT_HEADING_2 && (
                              <div>
                                <h1 className='mt-1 text-[18px] font-bold'>
                                  <InputWithTooltip
                                    deleteArray={deleteArray}
                                    setDeleteArray={setDeleteArray}
                                    setInfoOfContractAttribute={
                                      setInfoOfContractAttribute
                                    }
                                    setIsDetailOpen={setIsDetailAttributeDialog}
                                    setContractAttribute={setContractAttribute}
                                    contractAttribute={contractAttribute}
                                    index={index}
                                    defaultValue={item.value}
                                    description={''}
                                    onBlur={(e) => {
                                      handleChangeAttributeInput(e, index);
                                    }}
                                  />
                                </h1>
                              </div>
                            )}
                            {(item.type ===
                              EContractAttributeType.CONTRACT_ATTRIBUTE ||
                              item.type ===
                                EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_JOINED ||
                              item.type ===
                                EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_RECEIVE ||
                              item.type ===
                                EContractAttributeType.CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET_SEND ||
                              item.type ===
                                EContractAttributeType.TOTAL_AMOUNT) && (
                              <div>
                                <h2 className='mt-2 flex w-full text-[14px]'>
                                  <b className=''>
                                    <InputWithTooltip
                                      deleteArray={deleteArray}
                                      setDeleteArray={setDeleteArray}
                                      setInfoOfContractAttribute={
                                        setInfoOfContractAttribute
                                      }
                                      setIsDetailOpen={
                                        setIsDetailAttributeDialog
                                      }
                                      setContractAttribute={
                                        setContractAttribute
                                      }
                                      contractAttribute={contractAttribute}
                                      index={index}
                                      defaultValue={item.property}
                                      description={''}
                                      onBlur={(e) => {
                                        handleChangeAttributeInput(e, index);
                                      }}
                                    />
                                  </b>
                                  <span className='ms-2 w-[80%] text-wrap'>
                                    <Textarea
                                      onBlur={(e) => {
                                        handleValueOfTextarea(e, index);
                                      }}
                                      className='mr-auto'
                                      defaultValue={item.value}
                                    />
                                  </span>
                                </h2>
                              </div>
                            )}
                            {item.statusAttribute ===
                              EStatusAttribute.PREPARE && (
                              <div>
                                <AddAttributeArea
                                  setContractAttribute={setContractAttribute}
                                  contractAttribute={contractAttribute}
                                  index={index}
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <AddAttributeArea
                      setContractAttribute={setContractAttribute}
                      contractAttribute={contractAttribute}
                    />
                  </div>
                </div>
              </form>
            </ScrollArea>
          </div>
          <div className='my-2 h-[760px] w-[50%] rounded-lg border px-1'>
            <PreviewContract
              contractAttribute={contractAttribute}
              setContractAttribute={setContractAttribute}
            />
          </div>
        </main>
      </div>
      <DialogInfoAttribute
        setIsDetailAttributeDialog={setIsDetailAttributeDialog}
        isDetailAttributeDialog={isDetailAttributeDialog}
        infoOfAttribute={infoOfContractAttribute}
      />
    </div>
  );
}
