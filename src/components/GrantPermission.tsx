import { use, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { DialogOverlay, DialogPortal } from '@radix-ui/react-dialog';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { InvitationItem, initPermission } from '@/app/contract/create/page';
import { Button } from '@/components/ui/button';

export interface IPermission {
    READ_CONTRACT: boolean;
    EDIT_CONTRACT: boolean;
    INVITE_PARTICIPANT: boolean;
    CHANGE_STATUS_CONTRACT: boolean;
    SET_OWNER_PARTY: boolean;
}



export default function GrantPermission({ isOpen, setOpen, permission, callback }:
    { isOpen: boolean, setOpen: any, permission: IPermission, callback: (permission: IPermission) => void }) {

    const [permissionClone, setPermissionClone] = useState<IPermission>(permission)

    const onCheckedChange = (e: boolean, property: any) => {
        setPermissionClone({ ...permissionClone, [property]: e })
    }

    const updatePer = () => {
        callback(permissionClone)
        setPermissionClone(initPermission)
        setOpen(false)
    }
    useEffect(() => {
        setPermissionClone(permission)
    }, [isOpen])
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setOpen}>
                <DialogPortal>
                    <DialogOverlay>
                        <DialogContent className="min-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Grant Permission</DialogTitle>
                                <DialogDescription>
                                    Grant Permisson to ...
                                </DialogDescription>
                            </DialogHeader>
                            <Accordion type="single" defaultValue="item-1">
                                <AccordionItem value="item-1">
                                    <AccordionContent>
                                        <table >
                                            {/* <thead className='border-b-2 border-[#cccccc37]'>
                                                <tr>
                                                    <td className='pt-1 pb-2 px-1'>
                                                        <div className='flex items-center space-x-2'>
                                                            <Switch  defaultChecked={fullPermission}  checked={fullPermission} onCheckedChange={(e) => {
                                                                if (e) {
                                                                    setPermission({
                                                                        READ_CONTRACT: true,
                                                                        EDIT_CONTRACT: true,
                                                                        INVITE_PARTICIPANT: true,
                                                                        CHANGE_STATUS_CONTRACT: true,
                                                                        SET_OWNER_PARTY: true
                                                                    })
                                                                } else {
                                                                    setPermission({
                                                                        READ_CONTRACT: false,
                                                                        EDIT_CONTRACT: false,
                                                                        INVITE_PARTICIPANT: false,
                                                                        CHANGE_STATUS_CONTRACT: false,
                                                                        SET_OWNER_PARTY: false
                                                                    })
                                                                }
                                                            }} />
                                                            <Label htmlFor="readContractSwitch">Full Permission</Label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </thead> */}
                                            <tbody>
                                                <tr>
                                                    <td className='px-1'>
                                                        <div className='flex items-center space-x-2'>
                                                            <Switch
                                                                defaultChecked={permissionClone?.READ_CONTRACT}
                                                                onCheckedChange={(e) => {
                                                                    onCheckedChange(e, 'READ_CONTRACT')
                                                                }}
                                                            />
                                                            <Label htmlFor="readContractSwitch">Read Contract</Label>
                                                        </div>
                                                    </td>
                                                    <td className='px-1'>
                                                        <div className='flex items-center space-x-2'>
                                                            <Switch
                                                                defaultChecked={permissionClone?.EDIT_CONTRACT}
                                                                onCheckedChange={(e) => {
                                                                    onCheckedChange(e, 'EDIT_CONTRACT')
                                                                }}
                                                            />
                                                            <Label htmlFor="editPartyInfoSwitch">Edit Contract</Label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='pt-5 px-1'>
                                                        <div className='flex items-center space-x-2'>
                                                            <Switch
                                                                defaultChecked={permissionClone?.INVITE_PARTICIPANT}
                                                                onCheckedChange={(e) => {
                                                                    onCheckedChange(e, 'INVITE_PARTICIPANT')
                                                                }}
                                                            />
                                                            <Label htmlFor="chatWithPartySwitch">Invite Participant</Label>
                                                        </div>
                                                    </td>
                                                    <td className='pt-5 px-1'>
                                                        <div className='flex items-center space-x-2'>
                                                            <Switch
                                                                defaultChecked={permissionClone?.CHANGE_STATUS_CONTRACT}
                                                                onCheckedChange={(e) => {
                                                                    onCheckedChange(e, 'CHANGE_STATUS_CONTRACT')
                                                                }}
                                                            />
                                                            <Label htmlFor="editTermsSwitch">Change Status Contract</Label>
                                                        </div>
                                                    </td>
                                                    <td className='pt-5 px-1'>
                                                        <div className='flex items-center space-x-2'>
                                                            <Switch
                                                                defaultChecked={permissionClone?.SET_OWNER_PARTY}
                                                                onCheckedChange={(e) => {
                                                                    onCheckedChange(e, 'SET_OWNER_PARTY')
                                                                }}
                                                            />
                                                            <Label htmlFor="editTermsSwitch">Set Owner Party</Label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </AccordionContent>
                                </AccordionItem>
                                <div className='flex'>
                                    <Button className='mt-4 ml-auto' variant={'destructive'} onClick={(e) => { setOpen(false) }}>Cancel</Button>
                                    <Button className='mt-4 ms-2' onClick={updatePer}>Save</Button>
                                </div>
                            </Accordion>
                        </DialogContent>
                    </DialogOverlay>
                </DialogPortal>
            </Dialog>
        </div>
    );
}