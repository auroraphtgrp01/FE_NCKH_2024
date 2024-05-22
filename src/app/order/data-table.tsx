"use client";
import * as React from "react";
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
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { fetchAPI } from "@/utils/fetchAPI";
import { useToast } from "@/components/ui/use-toast";
import { getColumns, TOrderDetail } from './columns'; // Import hàm getColumns
interface DataWithName {
  id: string;
  name: string;
  unit: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
  taxPrice: number;
  description: string;
  idSupplier: string;
}
interface DataTableProps<TData extends DataWithName, TValue> {
  data: TData[];
}
export function DataTable<TData extends DataWithName, TValue>({
  data
}: DataTableProps<TData, TValue>) {
  const columns = getColumns(data); // Lấy danh sách cột bằng cách truyền data vào hàm getColumns
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
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
      columnVisibility,
    },
  });
  // console.log(data);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toast } = useToast()
  const handleSelect = (index: number) => {
    const payload = {
      supplierId: data[selectedIndex].idSupplier,
      productId: data[selectedIndex].id
    }
    console.log(payload);
    fetchAPI("/orders", "POST", payload)
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: `${res.data.message}`,
            variant: "success",
          })
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: `${err.message}`,
          variant: "destructive",
        })
      });
  };
  return (
    <div>
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mr-auto">
              Tax incl.
              <Settings2 size={20} strokeWidth={1.5} />
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
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
            <TableRow className="justify-start hover:bg-transparent">
              <TableCell colSpan={7}>
                <div className="flex">
                  <Select onValueChange={(value) => {
                    const index = data.findIndex(item => item.name === value);
                    setSelectedIndex(index);
                  }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data.map((value, index) => (
                          <SelectItem
                            value={value.name}
                            key={index}
                          >
                            {value.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button className="ml-2" variant="default" onClick={() => handleSelect(selectedIndex)}>
                    Chọn ngay
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div >
  );
}
