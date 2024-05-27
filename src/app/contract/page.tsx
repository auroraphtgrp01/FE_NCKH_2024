"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { fetchAPI } from "@/utils/fetchAPI";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";

export interface Participant {
  userId: string;
  fullName: string;
  addressWallet: string;
  position: string;
  company: string;
  avatar?: string;
}

const data: Contract[] = [
  {
    id: "m5gr84i9",
    status: "SUCCESS",
    address:
      "0x4f19cf235dee93c0105d40083ae214b060001a7ef22ade30e5adce0cee5b0fb6",
    typeID: "e8d5c929-9d64-41b0-bf09-bcdf41412480",
    typeName: "SCM Contract ",
  },
  {
    id: "m5gr84i9",
    status: "FAILED",
    address:
      "0x4f19cf235dee93c0105d40083ae214b060001a7ef22ade30e5adce0cee5b0fb6",
    typeID: "e8d5c929-9d64-41b0-bf09-bcdf41412480",
    typeName: "Buy/Sell Contract",
  },
];

export type Contract = {
  id: string;
  address: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  typeID: string;
  typeName: string;
};

const initParticipants: Participant[] = [
  {
    addressWallet: "",
    company: "",
    fullName: "",
    position: "",
    userId: "",
    avatar: "",
  },
  {
    addressWallet: "",
    company: "",
    fullName: "",
    position: "",
    userId: "",
    avatar: "",
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [participants, setParticipants] =
    React.useState<Participant[]>(initParticipants);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [isOpen, setIsOpen] = React.useState(false);
  async function handleOpenParticipant(addressWallet: string) {
    await getParticipants(addressWallet);
    setIsOpen(true);
  }
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const getParticipants = async (addressWallet: string) => {
    fetchAPI(`/contract/participants/${addressWallet}`, "GET").then((res) => {
      setParticipants(res.data);
    });
  };

  const columns: ColumnDef<Contract>[] = [
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
      accessorKey: "address",
      header: ({ column }) => {
        return <div className="font-semibold ">Address Contract</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "typeID",
      enableHiding: true,
      header: ({ column }) => {
        return <div className="font-semibold ">Type Contract</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">{row.getValue("typeID")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => {
        return <div className="text-center font-semibold">Status</div>;
      },
      cell: ({ row }) => (
        <div className="capitalize text-center text-green-500 font-semibold">
          {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "participants",
      header: () => <div className="text-center font-semibold">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <Button
              onClick={() => handleOpenParticipant(row.getValue("address"))}
            >
              Participants
            </Button>
            <Link
              href={`/contract/detail/${row.getValue("typeID")}/${row.getValue(
                "address"
              )}`}
            >
              <Button className="ms-2" variant={"destructive"}>
                Detail
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

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
  });

  return (
    <div className="w-full">
      <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
        <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
          <div className="flex">
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
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
          <Link href={"/contract/create"}>
            <Button className="me-3" variant={"destructive"}>
              Create a new Contract
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
              table.getRowModel().rows.map((row) => (
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent
              className="p-8 min-w-[650px]"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Individuals involved in the contract</DialogTitle>
                <DialogDescription>
                  The information here is extracted from the database. You can
                  re-fetch it from the chain-network
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
