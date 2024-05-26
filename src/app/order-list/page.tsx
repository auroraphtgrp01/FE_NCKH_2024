/* eslint-disable @next/next/no-img-element */
"use client"
import { ReceiptText, Trash2, X } from 'lucide-react';
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
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
    useReactTable,
} from "@tanstack/react-table"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import BreadCrumbHeader from "@/components/BreadCrumbHeader"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { fetchAPI } from '@/utils/fetchAPI';
const data: Payment[] = []

export type Payment = {
    id: string;
    orderCode: string;
    buyer: string;
    supplier: string;
    numberOfProducts: number;
    totalPrice: number;
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
}

type status = {
    PENDING: number; PROCESSING: number; COMPLETED: number
}


export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "orderCode",
        header: "Mã đơn hàng ",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("orderCode")}</div>
        ),
    },
    {
        accessorKey: "buyer",
        header: "Người mua ",
        cell: ({ row }) => <div className="capitalize">{row.getValue("buyer")}</div>,
    },
    {
        accessorKey: "supplier",
        header: "Nhà cung cấp ",
        cell: ({ row }) => <div className="capitalize">{row.getValue("supplier")}</div>,
    },
    {
        accessorKey: "numberOfProducts",
        header: "Số sản phẩm",
        cell: ({ row }) => <div className="capitalize">{row.getValue("numberOfProducts")}</div>,
    },

    {
        accessorKey: "totalPrice",
        header: "Tổng tiền",
        cell: ({ row }) => <div className="capitalize">{row.getValue("totalPrice")}</div>,
    },

    {
        accessorKey: "status",
        header: "Action",
        cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
]

export default function Page() {
    const router = useRouter();
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [order, setOrder] = React.useState([])
    const [status, setStatus] = React.useState<status>({})
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
            rowSelection,
        },
    })
    function changePage(index: number) {
        setClick(index);
        router.push(`/order/${order[index].id}`)
    }
    useEffect(() => {
        fetchAPI('/orders/find-all-by-user-id', 'GET')
            .then(res => {
                console.log(res.data.orders[0]);
                const dataUserOrder = res.data.orders[0].map((order: any) => {
                    return {
                        orderCode: order.orderCode,
                        buyer: order.customer,
                        supplier: order.supplier,
                        numberOfProducts: order.products.length,
                        totalPrice: order.total,
                        status: order.status,
                        id: order.id
                    }
                })
                const objStatus: status = {
                    PENDING: 0, PROCESSING: 0, COMPLETED: 0
                }

                if (dataUserOrder) {
                    dataUserOrder.forEach((element: any) => {
                        if (element.status == 'Pending') objStatus.PENDING = objStatus.PENDING + 1
                        else if (element.status == 'Processing') objStatus.PROCESSING = objStatus.PROCESSING + 1
                        else objStatus.COMPLETED = objStatus.COMPLETED + 1
                    });
                    setStatus(objStatus)
                    setOrder(dataUserOrder); // Lưu đối tượng đơn hàng đã được biến đổi vào state
                }

            })
    }, []);

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <Button className='mr-1'>New</Button>
                    <div>Request for Quoration</div>
                </div>
                <div>
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("orderCode")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
            </div>
            <hr className='my-2' />
            <div>
                <div>
                    <div className='flex items-center my-2'>
                        <span className='mr-3 w-20'>All RFQs</span>
                        <div className='flex items-center gap-4'>
                            <div className=' bg-violet-500  px-6 py-2 w-[130px]'>
                                <div className='text-center'>{status.PENDING}</div>
                                <div className='text-center'>Cần gửi</div>
                            </div>
                            <div className=' bg-violet-500  px-6 py-2 w-[130px]'>
                                <div className='text-center'>{status.PROCESSING}</div>
                                <div className='text-center'>Đang chờ</div>
                            </div>
                            <div className=' bg-violet-500  px-6 py-2 w-[130px]'>
                                <div className='text-center'>{status.COMPLETED}</div>
                                <div className='text-center'>Đã trả lời</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* table */}
            <div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (

                                    <TableRow className='w-[150px] cursor-pointer' onClick={() => { changePage(index) }}
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >

                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}

                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}