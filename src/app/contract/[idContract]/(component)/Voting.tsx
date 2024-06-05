import { calculateVoteRatio } from '@/app/contract/[idContract]/(functionHandler)/functionHandler'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { IContractVotingProps, IVoteRatio, IVotes } from '@/interface/contract.i'
import { fetchAPI } from '@/utils/fetchAPI'
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import React, { useEffect } from 'react'

export default function Voting({
  isDisableButton,
  isVisibleButton,
  votes,
  setVotes,
  setIsDisableButton,
  userInfo,
  individual
}: IContractVotingProps) {
  const { toast } = useToast()
  const [cloneVotes, setCloneVotes] = React.useState<IVoteRatio>(votes)
  const [userLogin, setUserLogin] = React.useState<IVotes>()
  useEffect(() => {
    setCloneVotes(votes)
  }, [votes])
  const handleOnClickVote = (selected: 'A' | 'B') => {
    let voteArr = cloneVotes.votes
    const indexOfParticipant = voteArr.findIndex((item) => item.userId === userInfo?.data.id)
    voteArr[indexOfParticipant] = { ...voteArr[indexOfParticipant], vote: selected }
    setUserLogin(voteArr[indexOfParticipant])
    setCloneVotes({
      votes: voteArr,
      ...calculateVoteRatio(voteArr)
    })
    setIsDisableButton((prev) => ({
      ...prev,
      voteCustomerButton: selected === 'A',
      voteSupplierButton: selected === 'B'
    }))
  }
  const handleOnSave = async () => {
    if (isDisableButton.voteCustomerButton || isDisableButton.voteSupplierButton) {
      setVotes(cloneVotes)
      const res = await fetchAPI('/participants', 'PATCH', {
        id: userLogin?.participantId,
        vote: userLogin?.vote,
        individual: {
          sender: individual.senderInd,
          receiver: individual.receiverInd
        }
      })
      if (res.data.isVotedAll) {
        setIsDisableButton((prev) => ({
          ...prev,
          voteButton: true,
          setIsVotedAll: true
        }))
      }
      toast({
        variant: 'success',
        title: 'Voting successfully',
        description: 'You have successfully voted for the party'
      })
    }
  }
  return (
    <div className='w-full'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {isVisibleButton.voteButton && (
            <Button disabled={isDisableButton.voteButton} className='w-full' onClick={() => {}} variant={'violet'}>
              Voting
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>Please choose to vote for the party</AlertDialogTitle>
            <AlertDialogDescription className=''>
              <div className='mb-2'>
                <div className='flex justify-between'>
                  <div className='mb-1 font-semibold'>Customer </div>
                  <div className='flex justify-between'>
                    <div className='mt-1 font-semibold'>{cloneVotes?.sender} %</div>
                  </div>
                </div>
                <div className='flex'>
                  <Progress value={cloneVotes?.sender}></Progress>{' '}
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex justify-between'>
                  <div className='mb-1 font-semibold'>Supplier </div>
                  <div className='flex justify-between'>
                    <div className='mt-1 font-semibold'>{cloneVotes?.receiver} %</div>
                  </div>
                </div>
                <div className='flex'>
                  <Progress
                    color='bg-destructive'
                    className='bg-destructive/20'
                    value={cloneVotes?.receiver}
                  ></Progress>{' '}
                </div>
              </div>
              <div className='mt-3 flex items-center justify-center'>
                <Button
                  disabled={isDisableButton.voteCustomerButton}
                  variant={'default'}
                  className='me-2 w-[50%] font-semibold'
                  onClick={() => {
                    handleOnClickVote('A')
                  }}
                >
                  Customer
                </Button>
                <Button
                  disabled={isDisableButton.voteSupplierButton}
                  variant={'destructive'}
                  className='ms-1 w-[50%] font-semibold'
                  onClick={() => {
                    handleOnClickVote('B')
                  }}
                >
                  Supplier
                </Button>
              </div>
              <Separator className='mt-4' />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant={'destructive'}>Close</Button>
            </AlertDialogCancel>
            <AlertDialogAction className='me-1' onClick={handleOnSave}>
              Save Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
