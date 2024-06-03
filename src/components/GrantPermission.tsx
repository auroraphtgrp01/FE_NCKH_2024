import { use, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { DialogOverlay, DialogPortal } from '@radix-ui/react-dialog';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ERolesOfParticipant, IPermission } from '@/interface/contract.i';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  initPermission,
  rolesTypeParticipant,
} from '@/constants/initVariable.constants';
import { Separator } from '@/components/ui/separator';

export default function GrantPermission({
  isOpen,
  setOpen,
  permission,
  callback,
}: {
  isOpen: boolean;
  setOpen: any;
  permission: IPermission;
  callback: (permission: IPermission) => void;
}) {
  const [permissionClone, setPermissionClone] =
    useState<IPermission>(permission);
  const [rolesType, setRolesType] = useState<
    {
      key: string;
      value: string;
    }[]
  >(rolesTypeParticipant);
  const onCheckedChange = (e: boolean | string, property: any) => {
    setPermissionClone({ ...permissionClone, [property]: e });
  };
  const updatePer = () => {
    callback(permissionClone);
    setPermissionClone(initPermission);
    setOpen(false);
  };
  useEffect(() => {
    setPermissionClone(permission);
  }, [isOpen]);
  useEffect(() => {
    console.log(permissionClone);
  }, [permissionClone]);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent className='min-w-[600px]'>
              <DialogHeader>
                <DialogTitle>Grant Permission</DialogTitle>
                <DialogDescription>
                  Grant Permission to participant
                </DialogDescription>
              </DialogHeader>
              <Accordion type='single' defaultValue='item-1'>
                <AccordionItem value='item-1'>
                  <AccordionContent>
                    <table>
                      <tbody>
                        <tr>
                          <td className='px-1 pb-4 pt-2' colSpan={3}>
                            <Label className='mb-2 mt-2'>Set Roles</Label>
                            <Select
                              onValueChange={(e) => {
                                onCheckedChange(e, 'ROLES');
                              }}
                            >
                              <SelectTrigger className='mt-2 w-full'>
                                <SelectValue
                                  placeholder={ERolesOfParticipant.PARTICIPANT}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {rolesType.map((item, index) => (
                                    <SelectItem value={item?.key} key={index}>
                                      {item.value}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Separator className='my-4' />
                          </td>
                        </tr>
                        <tr className='mt-3'>
                          <td className='px-1'>
                            <div className='flex items-center space-x-2'>
                              <Switch
                                defaultChecked={permissionClone?.READ_CONTRACT}
                                onCheckedChange={(e) => {
                                  onCheckedChange(e, 'READ_CONTRACT');
                                }}
                              />
                              <Label htmlFor='readContractSwitch'>
                                Read Contract
                              </Label>
                            </div>
                          </td>
                          <td className='px-1'>
                            <div className='flex items-center space-x-2'>
                              <Switch
                                defaultChecked={permissionClone?.EDIT_CONTRACT}
                                onCheckedChange={(e) => {
                                  onCheckedChange(e, 'EDIT_CONTRACT');
                                }}
                              />
                              <Label htmlFor='editPartyInfoSwitch'>
                                Edit Contract
                              </Label>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className='px-1 pt-5'>
                            <div className='flex items-center space-x-2'>
                              <Switch
                                defaultChecked={
                                  permissionClone?.INVITE_PARTICIPANT
                                }
                                onCheckedChange={(e) => {
                                  onCheckedChange(e, 'INVITE_PARTICIPANT');
                                }}
                              />
                              <Label htmlFor='chatWithPartySwitch'>
                                Invite Participant
                              </Label>
                            </div>
                          </td>
                          <td className='px-1 pt-5'>
                            <div className='flex items-center space-x-2'>
                              <Switch
                                defaultChecked={
                                  permissionClone?.CHANGE_STATUS_CONTRACT
                                }
                                onCheckedChange={(e) => {
                                  onCheckedChange(e, 'CHANGE_STATUS_CONTRACT');
                                }}
                              />
                              <Label htmlFor='editTermsSwitch'>
                                Change Status Contract
                              </Label>
                            </div>
                          </td>
                          <td className='px-1 pt-5'>
                            <div className='flex items-center space-x-2'>
                              <Switch
                                defaultChecked={
                                  permissionClone?.SET_OWNER_PARTY
                                }
                                onCheckedChange={(e) => {
                                  onCheckedChange(e, 'SET_OWNER_PARTY');
                                }}
                              />
                              <Label htmlFor='editTermsSwitch'>
                                Set Owner Party
                              </Label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </AccordionContent>
                </AccordionItem>
                <div className='flex'>
                  <Button
                    className='ml-auto mt-4'
                    variant={'destructive'}
                    onClick={(e) => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className='ms-2 mt-4' onClick={updatePer}>
                    Save
                  </Button>
                </div>
              </Accordion>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
