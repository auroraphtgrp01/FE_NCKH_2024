'use client'
import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Settings2 } from 'lucide-react'
import { useState } from 'react'
import { fetchAPI } from '@/utils/fetchAPI'
import { useToast } from '@/components/ui/use-toast'
import { getColumns } from './columns' // Import hàm getColumns
import { DataTableProps } from './[id]/page'
import { Product } from './[id]/page'
import { DataWithName, IOrderDetail } from '@/interface/order.i'
import { useAppContext } from '@/components/ThemeProvider'

export function DataTable<TData extends DataWithName>({ data, getDataOrders, setData }: DataTableProps<TData>) {
  const columns = getColumns(
    data,
    (orderDetails) => setData((prev) => ({ ...prev, orderDetails })),
    getDataOrders
  ) as ColumnDef<IOrderDetail, any>[] // Lấy danh sách cột bằng cách truyền data vào hàm getColumns
  const [sorting, setSorting] = React.useState<SortingState>([])
  const { userInfo, setUserInfo }: any = useAppContext()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [ListSelectProduct, setListSelectProduct] = React.useState<Product[]>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const table = useReactTable({
    data: data.products, // Add type assertion to data.orderDetails
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility
    }
  })

  const [selected, setSelected] = useState('')
  const { toast } = useToast()

  const handleAddProduct = async (productId: string) => {
    if (ListSelectProduct.length > 0) {
      const payload = {
        orderId: data.id,
        productId: productId
      }
      await fetchAPI('orders/add-product', 'POST', payload)
        .then((res) => {
          if (res.status === 201) {
            toast({
              title: `${res.data.message}`,
              variant: 'success'
            })
            getDataOrders()
          }
        })
        .catch((err) => {
          toast({
            title: `${err.message}`,
            variant: 'destructive'
          })
        })
    }
  }

  async function getProduct() {
    await fetchAPI(`/products/find-all-by-supplier/${data.suppliersId}`, 'GET')
      .then((res) => {
        const mappedProducts = res.data.map((value: any) => {
          return {
            ...value,
            image: value?.images?.[0]?.path ?? '',
            priceWithoutTax: value.price - value.discount,
            idOrder: value.idOrder,
            quantity: 1
          }
        })
        setListSelectProduct(mappedProducts)
      })
      .catch((errors) => console.log('Error : ' + errors))
  }
  React.useEffect(() => {
    getProduct()
  }, [data])
  return (
    <div>
      <div className='flex items-center py-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='mr-auto'>
              Tax incl.
              <Settings2 size={20} strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
            {userInfo.data.role === 'Customer' && data.status === 'Pending' ? (
              <TableRow className='justify-start hover:bg-transparent'>
                <TableCell colSpan={7}>
                  <div className='flex'>
                    <Select onValueChange={(value) => console.log(value)}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Select a fruit' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {ListSelectProduct.map((value, index) => (
                            <SelectItem value={value.id} key={index}>
                              {value.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button className='ml-2' variant='blue' onClick={() => handleAddProduct(selected)}>
                      Add Product
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              ''
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
