"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "postcss";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  // amount: number;
  // status: string;
  // email: string;
  produtcs: string;
  dec: string;
  quantity: string;
  unitprice: number;
  taxes: string;
  dics: string;
  taxexcl: string;
};

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "produtcs",
    header: () => <div className="font-semibold ">Produtcs</div>,
  },
  {
    accessorKey: "dec",
    header: () => <div className="font-semibold ">Decription</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="font-semibold ">Quantity</div>,
  },
  {
    accessorKey: "unitprice",
    header: () => <div className="font-semibold ">Unit Price</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("unitprice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(quantity);

      return <div className="font-semibold">{formatted}</div>;
    },
  },
  {
    accessorKey: "taxes",
    header: () => <div className="font-semibold ">Taxes</div>,
  },
  {
    accessorKey: "dics",
    header: () => <div className="font-semibold ">Dics.%</div>,
  },
  {
    accessorKey: "taxexcl",
    header: () => <div className="font-semibold ">Tax excl</div>,
  },
];