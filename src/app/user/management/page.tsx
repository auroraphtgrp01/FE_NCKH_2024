'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import { DialogDescription, DialogOverlay, DialogPortal, DialogTrigger } from '@radix-ui/react-dialog'
import { fetchAPI } from '@/utils/fetchAPI'
import { Label } from '@radix-ui/react-dropdown-menu'

export interface Participant {
  userName: string
  id: string
  email: string
  status: string
}

export type Contract = {
  id: string
  contractAddress: string
  name: string
  status: string
  type: string
  email: string
}

export default function DataTableDemo() {
  const [dataTable, setDataTable] = React.useState<Contract[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [participants, setParticipants] = React.useState<Participant[]>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    fetchAPI(`/contracts/get-all-contract-details`, 'GET').then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log(res.data.contracts)
        setDataTable(res.data.contracts)
      }
    })
  }, [])
  async function handleOpenParticipant(contractId: string) {
    const response = await fetchAPI(`/participants/find-all/${contractId}`, 'GET')
    console.log(response.data)
    const data: Participant[] = await Promise.all(
      response.data.map((item: any) => {
        const result: Participant = {
          id: item.id,
          email: item.email,
          userName: item.User.name,
          status: item.status
        }
        return result
      })
    )
    setParticipants(data)
    setIsOpen(true)
  }

  const columnsContracts: ColumnDef<Contract>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'contractAddress',
      header: ({ column }) => <div className='font-semibold'>Address Contract</div>,
      cell: ({ row }) => (
        <div className='text-start'>
          {row.getValue('contractAddress') !== undefined || row.getValue('contractAddress') !== ''
            ? row.getValue('contractAddress')
            : 'Not yet deployed'}
        </div>
      )
    },
    {
      accessorKey: 'contractTitle',
      header: ({ column }) => <div className='font-semibold'>Contract Title</div>,
      cell: ({ row }) => <div className='text-start'>{row.getValue('contractTitle')}</div>
    },
    {
      accessorKey: 'type',
      enableHiding: true,
      header: ({ column }) => <div className='font-semibold'>Type</div>,
      cell: ({ row }) => <div className='text-start'>{row.getValue('type')}</div>
    },
    {
      accessorKey: 'status',
      header: () => <div className='text-center font-semibold'>Status</div>,
      cell: ({ row }) => (
        <div className='text-center font-semibold capitalize text-green-500'>{row.getValue('status')}</div>
      )
    },
    {
      accessorKey: 'id',
      header: () => <div className='text-center font-semibold'>Action</div>,
      cell: ({ row }) => (
        <div className='text-center'>
          {/* <Button onClick={() => handleOpenParticipant(row.getValue('id'))}>Participants</Button> */}
          <Link href={``}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Update</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[900px]'>
                <DialogHeader>
                  <DialogTitle>Update</DialogTitle>
                  <DialogDescription>
                    Update the information you need to update. Click save when you done.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Email</Label>
                      <Input id='email' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Name</Label>
                      <Input id='name' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Phone Number</Label>
                      <Input id='phoneNumber' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Indentify Number</Label>
                      <Input id='indentifyNumber' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Address Wallet</Label>
                      <Input id='addressWallet' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Gender</Label>
                      <Input id='gender' className='col-span-3' />
                    </div>
                  </div>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Date Of Birth</Label>
                      <Input id='dateOfBirth' className='col-span-3' type='date' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>PIN</Label>
                      <Input type='password' id='pin' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Address</Label>
                      <Input id='address' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>User Status</Label>
                      <Input id='userStatus' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label className='text-right'>Role</Label>
                      <Input id='role' className='col-span-3' />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit'>Update</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Link>
          <Link className='ms-2' href={``}>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'destructive'}>Delete</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Delete</DialogTitle>
                  <DialogDescription className='text-red-500'>
                    Are you sure you want to delete this user? Click save when you done.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant={'destructive'} type='submit'>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Link>
        </div>
      )
    }
  ]

  const columnsParticipants: ColumnDef<Participant>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'userName',
      header: ({ column }) => <div className='font-semibold'>User Name</div>,
      cell: ({ row }) => <div className='font-semibold capitalize'>{row.getValue('userName')}</div>
    },

    {
      accessorKey: 'email',
      header: () => <div className='font-semibold'>Email</div>,
      cell: ({ row }) => <div className='font-semibold capitalize'>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'status',
      header: () => <div className='font-semibold'>Status</div>,
      cell: ({ row }) => <div className='font-semibold capitalize'>{row.getValue('status')}</div>
    }
  ]

  const tableContracts = useReactTable({
    data: dataTable,
    columns: columnsContracts,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const tableParticipants = useReactTable({
    data: participants,
    columns: columnsParticipants,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className='w-full'>
      <header className='sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background'>
        <div className='relative mb-3 ml-auto flex flex-1 md:grow-0'>
          <div className='flex'>
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={(tableContracts.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => tableContracts.getColumn('id')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <div className='ml-auto'>
          {/* <Link href={'#'}>
            <Button className='me-3' variant={'destructive'}>
              Create a new Contract
            </Button>
          </Link> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className='mr-3' variant={'destructive'}>
                Create a new user
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[900px]'>
              <DialogHeader>
                <DialogTitle>Create a new supplier</DialogTitle>
                <DialogDescription>
                  Please enter complete and valid information. Click save when you done.
                </DialogDescription>
              </DialogHeader>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Email <span className='text-red-500'>*</span>
                    </Label>
                    <Input id='email' className='col-span-3' placeholder='Enter email' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Name <span className='text-red-500'>*</span>
                    </Label>
                    <Input id='name' className='col-span-3' placeholder='Enter name' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Phone <span className='text-red-500'>*</span> Number
                    </Label>
                    <Input id='phoneNumber' className='col-span-3' placeholder='Enter phone number' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Indentify <span className='text-red-500'>*</span> Number
                    </Label>
                    <Input id='indentifyNumber' className='col-span-3' placeholder='Enter indentify number' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Address <span className='text-red-500'>*</span> Wallet
                    </Label>
                    <Input id='addressWallet' className='col-span-3' placeholder='Enter address wallet' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Gender <span className='text-red-500'>*</span>
                    </Label>
                    <Input id='gender' className='col-span-3' placeholder='Enter gender' />
                  </div>
                </div>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Date Of <span className='text-red-500'>*</span> Birth
                    </Label>
                    <Input id='dateOfBirth' className='col-span-3' type='date' placeholder='Enter date of birth' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      PIN <span className='text-red-500'>*</span>
                    </Label>
                    <Input type='password' id='pin' className='col-span-3' placeholder='Enter pin' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Address <span className='text-red-500'>*</span>
                    </Label>
                    <Input id='address' className='col-span-3' placeholder='Enter address' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      User <span className='text-red-500'>*</span> Status
                    </Label>
                    <Input id='userStatus' className='col-span-3' placeholder='Enter userStatus' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>
                      Role <span className='text-red-500'>*</span>
                    </Label>
                    <Input id='role' className='col-span-3' placeholder='Enter role' />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type='submit'>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {tableContracts
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {tableContracts.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableContracts.getRowModel().rows?.length ? (
              tableContracts.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnsContracts.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Page {tableContracts.getState().pagination.pageIndex + 1} of {tableContracts.getPageCount()}
        </div>
        <Button
          variant='outline'
          onClick={() => tableContracts.previousPage()}
          disabled={!tableContracts.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button variant='outline' onClick={() => tableContracts.nextPage()} disabled={!tableContracts.getCanNextPage()}>
          Next
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent
              className='min-w-[800px] p-8'
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault()
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Individuals involved in the contract</DialogTitle>
                <div className='text-sm text-muted-foreground'>
                  The information here is extracted from the database. You can re-fetch it from the chain-network
                  <div className='mt-3 rounded-md border'>
                    <Table>
                      <TableHeader>
                        {tableParticipants.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {tableParticipants.getRowModel().rows?.length ? (
                          tableParticipants.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={columnsParticipants.length} className='h-24 text-center'>
                              No results.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  )
}
