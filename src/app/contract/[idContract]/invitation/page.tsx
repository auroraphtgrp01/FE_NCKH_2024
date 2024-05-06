import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SelectScrollUpButton } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function page() {
    return (
        <div>
            <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background mb-3">
                <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
                    <div className='flex translate-x-[-15px]'>
                        <BreadCrumbHeader />
                    </div>
                </div>
            </header>
            <div className='px-[400px]'>
                <Card x-chunk="dashboard-01-chunk-5" className=''>
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="mt-2">Invitation Join The Contract</CardTitle>
                        </div>
                        <Separator className="mb-2" />
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <Alert>
                            <AlertTitle>Invitation</AlertTitle>
                            <AlertDescription>
                                You have been invited to join the contract. Please click the button below to join.
                            </AlertDescription>
                        </Alert>
                        <div className='flex'>
                            <Button className='w-[50%] me-2'>Join</Button>
                            <Button variant={'destructive'} className='w-[50%] '>Refuse</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
