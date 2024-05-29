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
} from "@/components/ui/select";
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
import { getColumns } from "./columns"; // Import hàm getColumns
import { TData } from "./[id]/page";
import { DataWithName } from "./[id]/page";
import { DataTableProps } from "./[id]/page";
import { Product } from "./[id]/page";
import { OrderDetail } from "./[id]/page";

export function DataTable<TData extends DataWithName>({
  data,
  getDataOrders,
  setData,
}: DataTableProps<TData>) {
  const columns = getColumns(
    data,
    (orderDetails) => setData((prev) => ({ ...prev, orderDetails })),
    getDataOrders
  ) as ColumnDef<OrderDetail, any>[]; // Lấy danh sách cột bằng cách truyền data vào hàm getColumns
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [userInfo, setUserInfo] = React.useState<any>(
    JSON.parse(localStorage.getItem("user-info") as string)
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [ListSelectProduct, setListSelectProduct] = React.useState<Product[]>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data: data.orderDetails as OrderDetail[], // Add type assertion to data.orderDetails
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

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { toast } = useToast();

  const handleSelect = (index: number) => {
    if (ListSelectProduct.length > 0) {
      const payload = {
        supplierId: ListSelectProduct?.[index]?.idSupplier ?? "",
        productId: ListSelectProduct?.[index]?.id ?? "",
      };
      fetchAPI("/orders", "POST", payload)
        .then((res) => {
          if (res.status === 201) {
            toast({
              title: `${res.data.message}`,
              variant: "success",
            });
            getDataOrders();
          }
        })
        .catch((err) => {
          toast({
            title: `${err.message}`,
            variant: "destructive",
          });
        });
    }
  };

  const getProduct = () => {
    if (data.orderDetails.length > 0) {
      const idSupplier = data?.orderDetails[0]?.idSupplier ?? "";
      fetchAPI(`/products/find-all-by-supplier/${idSupplier}`, "GET")
        .then((res) => {
          const mappedProducts = res.data.map((value: any) => {
            return {
              ...value,
              image: value?.images?.[0]?.path ?? "",
              priceWithoutTax: value.price - value.discount,
              idOrder: value.idOrder,
              quantity: 1,
            };
          });
          setListSelectProduct(mappedProducts);
        })
        .catch((errors) => console.log("Error : " + errors));
    }
  };
  React.useEffect(() => {
    getProduct();
  }, [data]);
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
            {userInfo.data.role === "Customer" && data.status === "Pending" ? (
              <TableRow className="justify-start hover:bg-transparent">
                <TableCell colSpan={7}>
                  <div className="flex">
                    <Select
                      onValueChange={(value) => {
                        const index = ListSelectProduct.findIndex(
                          (item) => item.name === value
                        );
                        setSelectedIndex(index);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {ListSelectProduct.map((value, index) => (
                            <SelectItem value={value.name} key={index}>
                              {value.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button
                      className="ml-2"
                      variant="blue"
                      onClick={() => handleSelect(selectedIndex)}
                    >
                      Add Product
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              ""
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
