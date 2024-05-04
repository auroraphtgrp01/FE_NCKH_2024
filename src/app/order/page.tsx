import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TOrderDetail, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contract } from "../contract/page";

export interface OrderDetail {
  id: string;
  name: string;
  description?: string;
  quantity?: number;
  price: number;
  image: string[];
  taxPrice?: number;
  discount?: number;
  taxExclude?: number;
}

async function getData(): Promise<OrderDetail[]> {
  return [
    {
      id: "e96460db-119d-4d06-af48-5397649cf796",
      name: "Laptop",
      description: "Macbook Pro 14 inch 2021 [Apple M1 Pro 8-core CPU]",
      price: 50,
      image: [],
      taxPrice: 10,
      discount: 2,
      taxExclude: 888,
    },
    {
      id: "ce41bebd-fc4d-4d33-bfa4-725176086add",
      name: "Điện thoại",
      description: "ip 13",
      image: [],
      price: 70,
      taxPrice: 5,
      discount: 2,
      taxExclude: 999,
    },
  ];
}

export default async function page() {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold tracking-tight text-lg mb-5">
          Request for Quotation
        </h2>
        <Breadcrumb className="mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <div className="text-green-500 font-bold cursor-default">
                Confirm
              </div>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-green-500" />
            <BreadcrumbItem>
              <div className="cursor-default">Send</div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className="text-gray-500 cursor-default">Purchase Order</div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-2 mb-5">
        <div className="flex">
          <div className="text-sm font-semibold w-28 mt-2">Supplier?</div>
          <Input
            className="w-[50%] ml-4"
            placeholder="Name, Email, or Reference"
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32 mt-2">Order Deadline?</div>
          <Input
            className="w-[50%] ml-4"
            type="date"
            placeholder="Name, Email, or Reference"
          ></Input>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex">
          <div className="text-sm font-semibold w-28 mt-2">Supplier code?</div>
          <Input
            className="w-[50.5%] ml-4"
            placeholder="xxxx-xxxx-xxxx"
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32">
            Estimated delivery date?
          </div>
          <Input
            className="w-[50.5%] ml-4"
            type="date"
            placeholder="Name, Email, or Reference"
          ></Input>
        </div>
      </div>
      <Tabs defaultValue="products" className="w-full mb-5">
        <TabsContent value="products">
          <DataTable columns={columns} data={data} />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
        <Button className="px-2 py-2 mr-1" variant={"default"}>
          Send Request
        </Button>
        <Button className="px-2 py-2 mr-1" variant={"destructive"}>
          Confirm Order
        </Button>
        <Button className="px-2 py-2" variant={"secondary"}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
