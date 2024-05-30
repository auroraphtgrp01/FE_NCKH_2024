import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EFunctionCall, EStageStatus, IOpenDisputedComponentProps, IStagesContract } from '@/interface/contract.i';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import React from 'react'

const stages: IStagesContract[] = [
    {
        id: '1',
        percent: 0,
        requestBy: '0x',
        requestTo: '1x',
        status: EStageStatus.PENDING
    },
    {
        id: '2',
        percent: 0,
        requestBy: '0x',
        requestTo: '1x',
        status: EStageStatus.PENDING
    },
    {
        id: '3',
        percent: 0,
        requestBy: '0x',
        requestTo: '1x',
        status: EStageStatus.PENDING
    },
    {
        id: '4',
        percent: 0,
        requestBy: '0x',
        requestTo: '1x',
        status: EStageStatus.APPROVED
    }
]

export default function Dispute({ isDisableButton, isVisibleButton }: IOpenDisputedComponentProps) {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    {isVisibleButton.openDisputedButton && (
                        <Button disabled={isDisableButton.fetchCompareButton} className='w-full' onClick={() => {
                        }}
                            variant={'destructive'}>
                            Open Dispute Contract
                        </Button>
                    )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure to create dispute contract?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <Table className="">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">#</TableHead>
                                        <TableHead>Request By</TableHead>
                                        <TableHead>Request To</TableHead>
                                        <TableHead className="text-center">
                                            Due Date
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stages.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{item.requestBy}</TableCell>
                                            <TableCell className="text-right">
                                                {item.status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction>Dispute</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
