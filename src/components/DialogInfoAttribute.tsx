import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function DialogInfoAttribute({
  isDetailAttributeDialog,
  setIsDetailAttributeDialog,
  infoOfAttribute,
}: {
  isDetailAttributeDialog: boolean;
  setIsDetailAttributeDialog: (item: boolean) => void;
  infoOfAttribute: any;
}) {
  return (
    <div>
      <AlertDialog
        open={isDetailAttributeDialog}
        onOpenChange={setIsDetailAttributeDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Info of Contract Attribute
            </AlertDialogTitle>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Id</b>
                  </TableCell>
                  <TableCell>{infoOfAttribute?.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Value</b>
                  </TableCell>
                  <TableCell>{infoOfAttribute?.value}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Type</b>
                  </TableCell>
                  <TableCell>{infoOfAttribute?.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Property</b>
                  </TableCell>
                  <TableCell>
                    {infoOfAttribute?.property
                      ? infoOfAttribute.property
                      : 'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Created By:</b>{' '}
                  </TableCell>
                  <TableCell>
                    {infoOfAttribute?.createdBy?.email
                      ? infoOfAttribute?.createdBy?.email
                      : 'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Updated By: </b>
                  </TableCell>
                  <TableCell>
                    {infoOfAttribute?.updatedBy?.email
                      ? infoOfAttribute?.updatedBy?.email
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AlertDialogHeader>
          <AlertDialogCancel>
            <b>Close</b>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
