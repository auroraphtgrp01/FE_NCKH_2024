/* eslint-disable @next/next/no-img-element */
'use client'
import { ReceiptText, Trash2, X } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { fetchAPI } from '@/utils/fetchAPI'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@radix-ui/react-dropdown-menu'
const data: Order[] = []

export type Order = {
  id: string
  orderCode: string
  customer: string
  supplier: string
  numberOfProducts: number
  total: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
}

type status = {
  PENDING: number
  PROCESSING: number
  OTHER: number
}

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: 'orderCode',
    header: 'Mã đơn hàng ',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('orderCode')}</div>
  },
  {
    accessorKey: 'customer',
    header: 'Người mua ',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('customer')}</div>
  },
  {
    accessorKey: 'supplier',
    header: 'Nhà cung cấp ',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('supplier')}</div>
  },
  {
    accessorKey: 'numberOfProducts',
    header: 'Số sản phẩm',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('numberOfProducts')}</div>
  },

  {
    accessorKey: 'total',
    header: 'Tổng tiền',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('total')}</div>
  },

  {
    accessorKey: 'status',
    header: 'Action',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('status')}</div>
  }
]

export default function Page() {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [order, setOrder] = React.useState<Order[]>([])
  const [status, setStatus] = React.useState<status>({
    PENDING: 0,
    PROCESSING: 0,
    OTHER: 0
  })
  const [click, setClick] = React.useState(0)
  const table = useReactTable({
    data: order,
    columns,
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
  function changePage(index: number) {
    setClick(index)
    router.push(`/order/${order[index].id}`)
  }
  function sumToTal() {
    let sum = 0;
    order.forEach((value) => {
      sum += value.total
    })
    return sum
  }

  function getLastCreatedAtDate(order: any) {
    if (!order || order.length === 0) {
      return null;
    }

    const lastOrder = order.reduce((latest: any, order: any) => {
      return new Date(order.createdAt) > new Date(latest.createdAt) ? order : latest;
    }, order[0]);

    const lastDay = new Date(lastOrder.createdAt);
    const formattedDate = [
      String(lastDay.getDate()).padStart(2, '0'),
      String(lastDay.getMonth() + 1).padStart(2, '0'),
      lastDay.getFullYear()
    ].join('-');

    return formattedDate;
  }


  useEffect(() => {
    fetchAPI('/orders/find-all-by-user-id', 'GET').then((res) => {
      const dataUserOrder = res.data.orders[0].map((order: any) => {
        return {
          ...order,
          numberOfProducts: order.products.length
        }
      })
      setOrder(dataUserOrder)
      console.log(dataUserOrder);

      setStatus({
        PENDING: res.data.orders[0].filter((item: any) => item.status === 'Pending').length,
        PROCESSING: res.data.orders[0].filter((item: any) => item.status === 'In Progress').length,
        OTHER: res.data.orders[0].filter((item: any) => item.status === 'Completed' || item.status === 'Cancelled')
          .length
      })
    })
  }, [])

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Button className='mr-1'>New</Button>
          <div>Request for Quoration</div>
        </div>
        <div>
          <Input
            placeholder='Filter emails...'
            value={(table.getColumn('orderCode')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
        </div>
      </div>
      <hr className='my-2' />
      <div>
        <div>
          <div className='my-2 flex items-center'>
            <span className='mr-3 w-20'>All RFQs</span>
            <div className='flex items-center gap-4'>
              <div className='border border-gray-400 text-black py-2 px-5 bg'>
                <div className='text-center'>{status.PENDING}</div>
                <div className='text-center'>Cần gửi</div>
              </div>
              <div className='border border-gray-400 text-black py-2 px-5 bg'>
                <div className='text-center'>{status.PROCESSING}</div>
                <div className='text-center'>Đang chờ</div>
              </div>
              <div className='border border-gray-400 text-black py-2 px-5 bg'>
                <div className='text-center'>{status.OTHER}</div>
                <div className='text-center'>Đã trả lời</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-between gap-10'>
        {/* table */}


        <Card className="ml-auto w-[600px] h-[500px] bg-transparent">
          <CardHeader className='font-bold'>Tóm tắt đơn đặt hàng</CardHeader>

          <CardContent>
            <div className='flex items-center justify-between mb-4 gap-10'>
              <div className='text-center border border-gray-400 text-black py-2 px-4 bg w-full'>
                <div className='text-nowrap'>Tổng đơn đang đặt</div>
                <div>{status.PROCESSING}</div>
              </div>
              <div className='text-center border border-gray-400 text-black py-2 px-4 bg w-full'>
                <div>Tổng tiền</div>
                <div>{sumToTal()} ETH</div>
              </div>
            </div>
            <div className='flex items-center justify-between gap-10'>
              <div className='text-center border border-gray-400 text-black py-2 px-4 bg w-full'>
                <div>Lần cuối đặt hàng</div>
                <div>{getLastCreatedAtDate(order) ? getLastCreatedAtDate(order) : ''}</div>
              </div>
              <div className='text-center border border-gray-400 text-black py-2 px-4 bg w-full'>
                <div>Tổng số lượng đặt </div>
                <div>{order.length}</div>
              </div>

            </div>
          </CardContent>
        </Card>
        <div className='w-full'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      className='w-[150px] cursor-pointer'
                      onClick={() => {
                        changePage(index)
                      }}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <div className='flex-1 text-sm text-muted-foreground'>
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </div>
            <div className='space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  )
}
