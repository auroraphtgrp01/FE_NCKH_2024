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
import { DialogDescription, DialogTrigger } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-dropdown-menu'

export type Supplier = {
  id: string
  name: string
  taxCode: string
  email: string
  phoneNumber: string
  address: string
  description: string
}

export default function DataTableDemo() {
  const defaultColumnVisibility = {
    id: true,
    name: true,
    taxCode: true,
    email: true,
    phoneNumber: true,
    address: true,
    description: true
  }

  const [dataTable, setDataTable] = React.useState<Supplier[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<any>(defaultColumnVisibility)
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {}, [])

  const columnsSuppier: ColumnDef<Supplier>[] = [
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
      accessorKey: 'name',
      header: ({ column }) => <div className='font-semibold'>Name</div>,
      cell: ({ row }) => (
        <div className='text-start'>
          {row.getValue('name') !== undefined || row.getValue('name') !== ''
            ? row.getValue('name')
            : 'Not yet deployed'}
        </div>
      )
    },
    {
      accessorKey: 'taxCode',
      header: ({ column }) => <div className='font-semibold'>Tax Code</div>,
      cell: ({ row }) => <div className='text-start'>{row.getValue('taxCode')}</div>
    },
    {
      accessorKey: 'email',
      enableHiding: true,
      header: ({ column }) => <div className='font-semibold'>Email</div>,
      cell: ({ row }) => <div className='text-start'>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'phoneNumber',
      header: () => <div className='text-center font-semibold'>Phone Number</div>,
      cell: ({ row }) => (
        <div className='text-center font-semibold capitalize text-green-500'>{row.getValue('phoneNumber')}</div>
      )
    },
    {
      accessorKey: 'address',
      header: () => <div className='text-center font-semibold'>Address</div>,
      cell: ({ row }) => (
        <div className='text-center font-semibold capitalize text-green-500'>{row.getValue('address')}</div>
      )
    },
    {
      accessorKey: 'description',
      header: () => <div className='text-center font-semibold'>Description</div>,
      cell: ({ row }) => (
        <div className='text-center font-semibold capitalize text-green-500'>{row.getValue('description')}</div>
      )
    },
    {
      accessorKey: 'action',
      header: () => <div className='text-center font-semibold'>Action</div>,
      cell: ({ row }) => (
        <div className='text-center'>
          <Link href={``}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Update</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                  <DialogTitle>Update</DialogTitle>
                  <DialogDescription>
                    Update the information you need to update. Click save when you done.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Name</Label>
                    <Input id='name' className='col-span-3' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Tax Code</Label>
                    <Input id='taxCode' className='col-span-3' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Email</Label>
                    <Input id='email' className='col-span-3' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Phone Number</Label>
                    <Input id='phoneNumber' className='col-span-3' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Address</Label>
                    <Input id='address' className='col-span-3' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Description</Label>
                    <Input id='description' className='col-span-3' />
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
                    Are you sure you want to delete this supplier? Click save when you done.
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

  const tableSupplier = useReactTable({
    data: dataTable,
    columns: columnsSuppier,
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
          value={(tableSupplier.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => tableSupplier.getColumn('id')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <div className='ml-auto'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='mr-3' variant={'destructive'}>
                Create a new supplier
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
              <DialogHeader>
                <DialogTitle>Create a new supplier</DialogTitle>
                <DialogDescription>
                  Please enter complete and valid information. Click save when you done.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>
                    Name <span className='text-red-500'>*</span>
                  </Label>
                  <Input id='name' className='col-span-3' placeholder='Enter name' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>
                    Tax Code <span className='text-red-500'>*</span>
                  </Label>
                  <Input id='taxCode' className='col-span-3' placeholder='Enter tax code' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>
                    Email <span className='text-red-500'>*</span>
                  </Label>
                  <Input id='email' className='col-span-3' placeholder='Enter email' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>
                    Phone <span className='text-red-500'>*</span> Number
                  </Label>
                  <Input id='phoneNumber' className='col-span-3' placeholder='Enter phone number' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>
                    Address <span className='text-red-500'>*</span>
                  </Label>
                  <Input id='address' className='col-span-3' placeholder='Enter address' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-right'>
                    Description <span className='text-red-500'>*</span>
                  </Label>
                  <Input id='description' className='col-span-3' placeholder='Enter description' />
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
              {tableSupplier
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
            {tableSupplier.getHeaderGroups().map((headerGroup) => (
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
            {tableSupplier.getRowModel().rows?.length ? (
              tableSupplier.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnsSuppier.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Page {tableSupplier.getState().pagination.pageIndex + 1} of {tableSupplier.getPageCount()}
        </div>
        <Button
          variant='outline'
          onClick={() => tableSupplier.previousPage()}
          disabled={!tableSupplier.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button variant='outline' onClick={() => tableSupplier.nextPage()} disabled={!tableSupplier.getCanNextPage()}>
          Next
        </Button>
      </div>
      /
    </div>
  )
}
