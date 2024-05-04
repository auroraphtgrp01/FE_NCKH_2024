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
import {
  ArrowUpDown,
  CheckCheck,
  ChevronDown,
  FilePen,
  FileSearch,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";
import { fetchAPI } from "@/utils/fetchAPI";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
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
} from "@/components/ui/alert-dialog";

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
    id: "stringstring",
    name: "stringstring",
    phoneNumber: "stringstring",
    email: "stringstring",
    indentifyNumber: "stringstring",
    addressWallet: "stringstring",
    gender: "stringstring",
    dateOfBirth: "stringstring",
    role: "stringstring",
    status: "stringstring",
    suppliers: "stringstring",
  },
];

export type Contract = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  indentifyNumber: string;
  addressWallet: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  status: string;
  suppliers: string;
};

const initParticipants: Participant[] = [
  {
    name: "",
    phoneNumber: "",
    email: "",
    indentifyNumber: "",
    addressWallet: "",
    gender: "",
    dateOfBirth: "",
    role: "",
    status: "",
    suppliers: "",
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
      accessorKey: "name",
      header: ({ column }) => {
        return <div className="font-semibold ">Name</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      enableHiding: true,
      header: ({ column }) => {
        return <div className="font-semibold ">Phone Number</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">
          {row.getValue("phoneNumber")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      enableHiding: true,
      header: ({ column }) => {
        return <div className="font-semibold ">Email</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "indentifyNumber",
      header: () => {
        return (
          <div className="text-center font-semibold">Indentify Number</div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">
          {row.getValue("indentifyNumber")}
        </div>
      ),
    },
    {
      accessorKey: "addressWallet",
      header: () => {
        return <div className="text-center font-semibold">Address Wallet</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">
          {row.getValue("addressWallet")}
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: () => {
        return <div className="text-center font-semibold">Gender</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("gender")}</div>
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: () => {
        return <div className="text-center font-semibold">Date Of Birth</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">
          {row.getValue("dateOfBirth")}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return <div className="font-semibold ">Role</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return <div className="font-semibold ">Status</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "suppliers",
      header: ({ column }) => {
        return <div className="font-semibold ">Suppliers</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase text-start">{row.getValue("suppliers")}</div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center font-semibold">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>
                  <FilePen
                    size={17}
                    strokeWidth={2.4}
                    className="dark:text-white"
                  />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="grid gap-3 pr-4 py-4">
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Name
                        </Label>
                        <Input id="" className="col-span-2" />
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Address Wallet
                        </Label>
                        <Input id="" className="col-span-2" />
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Email
                        </Label>
                        <Input id="" className="col-span-2" />
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Gender
                        </Label>
                        <Input id="" className="col-span-2" />
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Date Of Birth
                        </Label>
                        <Input id="e" className="col-span-2" />
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Phone Number
                        </Label>
                        <Input id="e" className="col-span-2" />
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Indentify Number
                        </Label>
                        <Input id="e" className="col-span-2" />
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <Label className="text-right pr-3" htmlFor="">
                          Role ID
                        </Label>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Customer</SelectItem>
                            <SelectItem value="dark">Admin</SelectItem>
                            <SelectItem value="system">Supplier</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="dark:text-white">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/* dialog delete */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="ms-2" variant={"destructive"}>
                  <Trash2 size={20} strokeWidth={2.5} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Warning: Once deleted, this action cannot be reversed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="dark:text-white">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
      <BreadCrumbHeader />
      <div className="flex justify-between py-4">
        <Select>
          <SelectTrigger className="w-[5%]">
            <SelectValue />
            <UserCog size={20} strokeWidth={2} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Customer</SelectItem>
            <SelectItem value="dark">Admin</SelectItem>
            <SelectItem value="system">Suppier</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mb-4"
        />
        <div className="ml-auto">
          {/* <Link href={"/contract/create"}>
            <Button className="me-3" variant={"destructive"}>
              Create a new Contract
            </Button>
          </Link> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto mb-4">
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
