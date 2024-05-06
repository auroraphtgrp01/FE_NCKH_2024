/* eslint-disable @next/next/no-img-element */
"use client"
import { ReceiptText, Trash2, X } from 'lucide-react';
import React, { use, useEffect, useState } from "react";
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
// data alertdialog
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
const data: Payment[] = [
    {
        id: "m5gr84i9",
        image: 'https://ik.imagekit.io/ikmedia/backlit.jpg',
        status: "success",
        name: "Hợp đồng 1",
        description: 'Đây là mô tả về hợp đồng'
    },
    {
        id: "3u1reuv4",
        image: 'https://ik.imagekit.io/ikmedia/backlit.jpg',
        status: "success",
        name: "Hợp đồng 2",
        description: 'Đây là mô tả về hợp đồng'
    },
    {
        id: "derv1ws0",
        image: 'https://ik.imagekit.io/ikmedia/backlit.jpg',
        status: "processing",
        name: "Hợp đồng 3",
        description: 'Đây là mô tả về hợp đồng'
    },
    {
        id: "5kma53ae",
        image: 'https://ik.imagekit.io/ikmedia/backlit.jpg',
        status: "success",
        name: "Hợp đồng 4",
        description: 'Đây là mô tả về hợp đồng'
    },
    {
        id: "bhqecj4p",
        image: 'https://ik.imagekit.io/ikmedia/backlit.jpg',
        status: "failed",
        name: "Hợp đồng 5",
        description: 'Đây là mô tả về hợp đồng'
    },
]

export type Payment = {
    id: string
    image: string
    status: "pending" | "processing" | "success" | "failed"
    name: string
    description: string
}



// edit


import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useRouter } from "next/navigation";
import { EContractAttributeType, EStatusAttribute, IContractAttribute, IDefinitionContractAttribute } from "@/interface/contract.i";
import { InputWithTooltip } from "@/components/InputWithTooltip";
import AddAttributeArea from '../../../../components/AddAttributeArea';
import { v4 as uuidv4 } from 'uuid';
import DialogInfoAttribute from '../../../../components/DialogInfoAttribute';
import { fetchAPI } from "@/utils/fetchAPI";
import { useToast } from "@/components/ui/use-toast";
import PreviewContract from "@/app/contract/[idContract]/(component)/PreviewContract";
export default function Page() {
    // edit

    const [contractAttribute, setContractAttribute] = useState<any[]>([]);
    const [contractAttributeRaw, setContractAttributeRaw] = useState<any[]>([]);
    const { idContract } = useParams();
    const [isDetailAttributeDialog, setIsDetailAttributeDialog] = useState(false)
    const [infoOfContractAttribute, setInfoOfContractAttribute] = useState()
    const [deleteArray, setDeleteArray] = useState<any[]>([])
    const { toast } = useToast()
    const Router = useRouter();
    const getData = React.useCallback(async (idContract: string) => {
        return await fetchAPI(`/contracts/get-contract-details/${idContract}`, "GET")
            .then((response) => {
                setContractAttribute(response.data.contractAttributes);
                setContractAttributeRaw(response.data.contractAttributes);
            })
            .catch((error) => {
            });
    }, [setContractAttribute, setContractAttributeRaw]);

    React.useLayoutEffect(() => {
        if (idContract) {
            getData(idContract as string);
        }
    }, [idContract, getData]);
    useEffect(() => {
        console.log(contractAttribute);
    }, [contractAttribute])

    const handleChangeAttributeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedAttributes = [...contractAttribute];
        const attributeToUpdate = updatedAttributes[index];

        if (attributeToUpdate.type === EContractAttributeType.CONTRACT_ATTRIBUTE) {
            updatedAttributes[index] = {
                ...attributeToUpdate,
                property: e.target.value,
            };
        } else {
            updatedAttributes[index] = {
                ...attributeToUpdate,
                value: e.target.value,
            };
        }
        setContractAttribute(updatedAttributes);
    };
    const handleValueOfTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const updatedAttributes = [...contractAttribute];
        const attributeToUpdate = updatedAttributes[index];
        updatedAttributes[index] = {
            ...attributeToUpdate,
            value: e.target.value,
        };
        setContractAttribute(updatedAttributes);
    }
    function compareChangesOfContractAttribute() {
        const updatedAttributes = [...contractAttribute];

        let payload = updatedAttributes.map((item, index) => {
            const updatedItem = {
                ...item,
                index
            };
            const rawItem = contractAttributeRaw[index];
            if (item.statusAttribute === EStatusAttribute.CREATE) {
                return updatedItem;
            }
            if (item.type === EContractAttributeType.CONTRACT_ATTRIBUTE) {
                if (item?.value !== rawItem?.value || item.property !== rawItem.property) {
                    updatedItem.statusAttribute = EStatusAttribute.UPDATE;
                }
            } else {
                if (item?.value !== rawItem?.value) {
                    updatedItem.statusAttribute = EStatusAttribute.UPDATE;
                }
            }
            return updatedItem;
        });
        fetchAPI('/contracts/attribute', 'PATCH', {
            id: idContract,
            updatedAttributes: payload,
            deleteArray
        }).then((response) => {
            payload = []
            setDeleteArray([])
            Router.push(`/contract/${idContract}`)
            toast({
                title: "Update Successfully",
                description: "Your changes have been saved successfully",
                variant: "default",
            })
        })
            .catch((error) => {
                toast({
                    title: "Update Failed",
                    description: "Your changes have not been saved successfully",
                    variant: "destructive",
                })
            }
            )
    }

    const handleOnClickSaveChanges = () => {
        compareChangesOfContractAttribute()
    }
    // edit
    const columns: ColumnDef<Payment>[] = [
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
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("status")}</div>
            ),
        },
        {
            accessorKey: "name",
            header: " Tên hợp đồng",
            cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "image",
            header: "Hình ảnh",
            cell: ({ row }) => <div className="w-[150px] active:scale-150">
                <img src={row.getValue("image")} alt="" className='w-full' />
            </div>,
        },
        {
            accessorKey: "description",
            header: " Mô tả",
            cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
        },

        {
            id: "actions",
            enableHiding: false,
            header: " Action",
            cell: ({ row }) => {
                const payment = row.original

                return (
                    <div className='flex items-center'>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='mr-2'>
                                    <ReceiptText />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%] min-w-[90%] h-[90%]">
                                <AlertDialogCancel className=' ml-auto border-none outline-none fixed right-2 top-3'>
                                    <X />
                                </AlertDialogCancel>
                                <main className="flex mx-10 gap-2 py-8 h-full min-h-[90%]">
                                    <div className="px-1 w-[50%] border rounded-lg h-full min-h-full">
                                        <ScrollArea className=" w-[100%]  h-[100%]  min-h-full ">
                                            <form className="max-w-[100%] p-10 text-sm w-[100%]">
                                                <div id="main">
                                                    <div id="application">
                                                        <div>
                                                            {contractAttribute.map((item: IContractAttribute, index: any) => (
                                                                <div key={uuidv4()}>
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADER && (
                                                                        <h5 className="text-center font-bold flex pt-1">
                                                                            <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} onBlur={(e) => {
                                                                                handleChangeAttributeInput(e, index)
                                                                            }} description="" alignCenter={true} className="text-center w-[50%] justify-center ml-auto mr-auto" defaultValue={item.value} />
                                                                        </h5>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADER_DATE && (
                                                                        <div className="flex justify-center items-end mt-5 font-semibold italic">
                                                                            <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} onBlur={(e) => {
                                                                                handleChangeAttributeInput(e, index)
                                                                            }} description="" alignCenter={true} className="text-center w-[50%] justify-end ml-auto" defaultValue={item.value} />
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_TITLE && (
                                                                        <div>
                                                                            <h1 className="text-center font-bold text-2lg mt-4 uppercase">
                                                                                <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h1>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_NUMBER && (
                                                                        <div>
                                                                            <h2 className="text-center font-bold mt-1">
                                                                                <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h2>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_TEXT && (
                                                                        <div className="mt-6">
                                                                            <Textarea
                                                                                onBlur={(e) => handleValueOfTextarea(e, index)}
                                                                                className="mr-auto"
                                                                                defaultValue={item.value}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                                                                        <div>
                                                                            <h1 className="mt-6 font-bold text-[18px]">
                                                                                <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h1>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADING_2 && (
                                                                        <div>
                                                                            <h1 className="mt-1 font-bold text-[18px]">
                                                                                <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h1>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_ATTRIBUTE && (
                                                                        <div>
                                                                            <h2 className="mt-2 text-[14px] flex w-full">
                                                                                <b className="">
                                                                                    <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.property} description={''} onBlur={(e) => {
                                                                                        handleChangeAttributeInput(e, index)
                                                                                    }} />
                                                                                </b>
                                                                                <span className="text-wrap ms-2 w-[80%]">
                                                                                    <Textarea onBlur={(e) => {
                                                                                        handleValueOfTextarea(e, index)
                                                                                    }} className="mr-auto " defaultValue={item.value} />
                                                                                </span>
                                                                            </h2>
                                                                        </div>
                                                                    )}
                                                                    {item.statusAttribute === EStatusAttribute.PREPARE && (
                                                                        <div>
                                                                            <AddAttributeArea setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <AddAttributeArea setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} />
                                                    </div>
                                                </div>
                                            </form>
                                        </ScrollArea>
                                    </div>
                                    <div className="px-1 w-[50%] border rounded-lg  h-full min-h-full">
                                        <PreviewContract contractAttribute={contractAttribute} setContractAttribute={setContractAttribute} />
                                    </div>
                                </main>
                                <AlertDialogFooter className='w-auto h-auto fixed bottom-2 right-2'>
                                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                                    <AlertDialogAction>Tạo hợp đồng</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={"destructive"}>
                                    <Trash2 />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Bạn có chắc muốn xóa mẫu hợp đồng này ? </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )
            },
        },
    ]
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
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

    return (
        <div>
            <BreadCrumbHeader />
            <div className="w-full">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <div className="ml-auto">

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="me-3" variant={"destructive"}>Create a new Contract</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%] min-w-[90%] h-[90%]">
                                <AlertDialogCancel className=' ml-auto border-none outline-none fixed right-2 top-3'>
                                    <X />
                                </AlertDialogCancel>
                                <main className="flex mx-10 gap-2 py-8 h-full min-h-[90%]">
                                    <div className="px-1 w-[50%] border rounded-lg h-full min-h-full">
                                        <ScrollArea className=" w-[100%]  h-[100%]  min-h-full ">
                                            <form className="max-w-[100%] p-10 text-sm w-[100%]">
                                                <div id="main">
                                                    <div id="application">
                                                        <div>
                                                            {contractAttribute.map((item: IContractAttribute, index: any) => (
                                                                <div key={uuidv4()}>
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADER && (
                                                                        <h5 className="text-center font-bold flex pt-1">
                                                                            <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} onBlur={(e) => {
                                                                                handleChangeAttributeInput(e, index)
                                                                            }} description="" alignCenter={true} className="text-center w-[50%] justify-center ml-auto mr-auto" defaultValue={item.value} />
                                                                        </h5>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADER_DATE && (
                                                                        <div className="flex justify-center items-end mt-5 font-semibold italic">
                                                                            <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} onBlur={(e) => {
                                                                                handleChangeAttributeInput(e, index)
                                                                            }} description="" alignCenter={true} className="text-center w-[50%] justify-end ml-auto" defaultValue={item.value} />
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_TITLE && (
                                                                        <div>
                                                                            <h1 className="text-center font-bold text-2lg mt-4 uppercase">
                                                                                <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h1>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_NUMBER && (
                                                                        <div>
                                                                            <h2 className="text-center font-bold mt-1">
                                                                                <Input className="text-center w-[50%] ml-auto mr-auto " defaultValue={item.value} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h2>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_TEXT && (
                                                                        <div className="mt-6">
                                                                            <Textarea
                                                                                onBlur={(e) => handleValueOfTextarea(e, index)}
                                                                                className="mr-auto"
                                                                                defaultValue={item.value}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADING_1 && (
                                                                        <div>
                                                                            <h1 className="mt-6 font-bold text-[18px]">
                                                                                <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h1>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_HEADING_2 && (
                                                                        <div>
                                                                            <h1 className="mt-1 font-bold text-[18px]">
                                                                                <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.value} description={''} onBlur={(e) => {
                                                                                    handleChangeAttributeInput(e, index)
                                                                                }} />
                                                                            </h1>
                                                                        </div>
                                                                    )}
                                                                    {item.type === EContractAttributeType.CONTRACT_ATTRIBUTE && (
                                                                        <div>
                                                                            <h2 className="mt-2 text-[14px] flex w-full">
                                                                                <b className="">
                                                                                    <InputWithTooltip deleteArray={deleteArray} setDeleteArray={setDeleteArray} setInfoOfContractAttribute={setInfoOfContractAttribute} setIsDetailOpen={setIsDetailAttributeDialog} setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} defaultValue={item.property} description={''} onBlur={(e) => {
                                                                                        handleChangeAttributeInput(e, index)
                                                                                    }} />
                                                                                </b>
                                                                                <span className="text-wrap ms-2 w-[80%]">
                                                                                    <Textarea onBlur={(e) => {
                                                                                        handleValueOfTextarea(e, index)
                                                                                    }} className="mr-auto " defaultValue={item.value} />
                                                                                </span>
                                                                            </h2>
                                                                        </div>
                                                                    )}
                                                                    {item.statusAttribute === EStatusAttribute.PREPARE && (
                                                                        <div>
                                                                            <AddAttributeArea setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} index={index} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <AddAttributeArea setContractAttribute={setContractAttribute} contractAttribute={contractAttribute} />
                                                    </div>
                                                </div>
                                            </form>
                                        </ScrollArea>
                                    </div>
                                    <div className="px-1 w-[50%] border rounded-lg  h-full min-h-full">
                                        <PreviewContract contractAttribute={contractAttribute} setContractAttribute={setContractAttribute} />
                                    </div>
                                </main>
                                <AlertDialogFooter className='w-auto h-auto fixed bottom-2 right-2'>
                                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                                    <AlertDialogAction>Tạo hợp đồng</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
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
                                table.getRowModel().rows.map((row) => (
                                    <TableRow className='w-[150px]'
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
