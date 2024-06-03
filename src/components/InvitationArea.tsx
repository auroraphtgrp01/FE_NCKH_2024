import GrantPermission from '@/components/GrantPermission'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { initPermission } from '@/constants/initVariable.constants'
import { IPermission, InvitationItem } from '@/interface/contract.i'
import React, { useState } from 'react'

export interface IInvitationArea {
  invitation: InvitationItem[]
  setInvitation: (invitation: InvitationItem[]) => void
  messages: string
  setMessages: (messages: string) => void
  participant?: any
}

export default function InvitationArea({
  invitation,
  setInvitation,
  messages,
  setMessages,
  participant
}: IInvitationArea) {
  const [invitationInput, setInvitationInput] = useState('')
  const [indexPerson, setIndexPerson] = useState<number>(-1)
  const [isOpen, setOpen] = useState(false)
  const { toast } = useToast()
  function onAddInvitation(): void {
    // const isEmail = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    // if (!isEmail.test(invitationInput)) {
    //   toast({
    //     title: 'Error When Add Participant',
    //     description: 'Email Is Invalid',
    //     variant: 'destructive'
    //   })
    //   return
    // }
    if (participant) {
      const isExist = participant.find((p: any) => p.email === invitationInput)
      if (isExist) {
        toast({
          title: 'Error When Add Participant',
          description: 'Participant already exists',
          variant: 'destructive'
        })
        return
      }
    }
    setInvitation([...invitation, { email: invitationInput, permission: initPermission }])
    setInvitationInput('')
  }
  function updatePermission(data: IPermission): void {
    invitation[indexPerson].permission = data
    setInvitation([...invitation])
  }
  function onDeleteInvitation(index: number) {
    setInvitation([...invitation.filter((_, i) => i !== index)])
  }
  return (
    <div className='mt-5'>
      <div className='mt-2 flex flex-col space-y-2'>
        <Label>Invitation Participants:</Label>
        <div className='flex'>
          <Input
            className='me-2'
            onChange={(e) => {
              setInvitationInput(e.target.value)
            }}
            value={invitationInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddInvitation()
              }
            }}
          ></Input>
          <Button onClick={onAddInvitation}>Add Participant</Button>
        </div>
      </div>
      <div className='mt-2 flex flex-col space-y-2'>
        <ScrollArea className='h-72 rounded-md border px-2'>
          <Table className=''>
            <TableHeader>
              <TableRow>
                <TableHead className=''>#</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className='text-center'>Permission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitation.map((inv, index) => (
                <TableRow key={inv.email}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{inv.email}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex'>
                      <Button
                        variant={'default'}
                        className='me-2 w-[50%]'
                        onClick={() => {
                          setIndexPerson(index)
                          setOpen(true)
                        }}
                      >
                        Grant
                      </Button>
                      <Button
                        variant={'destructive'}
                        className='w-[50%]'
                        onClick={() => {
                          onDeleteInvitation(index)
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className='mt-2 flex flex-col space-y-2'>
        <Label>Message for Invitation: </Label>
        <Textarea
          placeholder='Message'
          className='min-h-[150px] w-full resize-none'
          defaultValue={messages}
          onChange={(e) => {
            setMessages(e.target.value)
          }}
        />
      </div>
      <GrantPermission
        isOpen={isOpen}
        setOpen={setOpen}
        permission={invitation[indexPerson]?.permission}
        callback={updatePermission}
      ></GrantPermission>
    </div>
  )
}
