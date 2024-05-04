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
export type TOrderDetail = {
  id: string;
  name: string;
  description?: string;
  quantity?: number;
  price: number;
  image: string[];
  taxPrice?: number;
  discount?: number;
  taxExclude?: number;
};
function test(data: any) {
  console.log(typeof data, data);

  return "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
}

function getFirstPathImage(images: string[]) {
  return images.length > 0
    ? images[0]
    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
}

export const columns: ColumnDef<TOrderDetail>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="font-semibold ">Products</div>;
    },
    cell: ({ row }) => <div className="text-start">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <div className="font-semibold">Description</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <div className="font-semibold ">Price</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <div className="font-semibold ">Image</div>;
    },
    cell: ({ row }) => (
      <img
        className="w-14 hover:scale-[2] hover:delay-250 duration-300"
        src={getFirstPathImage(row.getValue("image"))}
        alt="Product Image"
      />
    ),
  },
  {
    accessorKey: "taxPrice",
    header: ({ column }) => {
      return <div className="font-semibold ">Tax Price</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("taxPrice")}</div>
    ),
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return <div className="font-semibold ">Discount</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("discount")}</div>
    ),
  },
  {
    accessorKey: "taxExclude",
    header: ({ column }) => {
      return <div className="font-semibold ">Price without tax</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("taxExclude")}</div>
    ),
  },
];
