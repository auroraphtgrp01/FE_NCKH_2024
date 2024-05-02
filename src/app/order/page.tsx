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
import { Payment, columns } from "./columns";
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

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      produtcs: "Laptop",
      dec: "Laptop Asus Vivobook A415EA-EB556T Chính Hãng",
      quantity: "20",
      unitprice: 50,
      taxes: "10",
      dics: "2",
      taxexcl: "abcde ",
    },
    {
      id: "728ed52f",
      produtcs: "Điện thoại",
      dec: "Điện Thoại Iphone 15 Plus",
      quantity: "30",
      unitprice: 70,
      taxes: "5",
      dics: "0",
      taxexcl: "abcde ",
    },
  ];
}

export default async function page() {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-between px-5">
        <div>
          <Button className="px-2 py-2 dark:text-white bg-blue-500 hover:bg-blue-500/90 mr-1">
            Send Request
          </Button>
          <Button className="px-2 py-2 dark:text-white bg-orange-500 hover:bg-orange-500/90 mr-1">
            Confirm Order
          </Button>
          <Button className="px-2 py-2 dark:text-white bg-gray-500 hover:bg-gray-500/90">
            Cancel
          </Button>
        </div>
        <div>
          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <div className="text-green-500 font-bold cursor-default">
                  CONFIRM
                </div>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-green-500" />
              <BreadcrumbItem>
                <div className="cursor-default">SEND</div>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <div className="text-gray-500 cursor-default">
                  PURCHASE ORDER
                </div>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="p-5">
        <div className="block rounded-lg border border-dashed shadow-sm gap-4 p-4">
          <h3 className="font-semibold tracking-tight text-lg mb-5">
            Request for Quotation
          </h3>
          <div className="grid grid-cols-2 mb-5">
            <div className="flex">
              <div className="text-sm font-semibold w-32 mt-2 w-30">
                Supplier?
              </div>
              <Input
                className="border-t-0 border-r-0 border-l-0 border-b-2 w-[50%] ml-4"
                placeholder="Name, Email, or Reference"
              ></Input>
            </div>
            <div className="flex">
              <div className="text-sm font-semibold w-32 mt-2">
                Order Deadline?
              </div>
              <Input
                className="border-t-0 border-r-0 border-l-0 border-b-2 w-[50%] ml-4"
                type="date"
                placeholder="Name, Email, or Reference"
              ></Input>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-5">
            <div className="flex">
              <div className="text-sm font-semibold w-32 mt-2">
                Supplier code?
              </div>
              <Input
                className="border-t-0 border-r-0 border-l-0 border-b-2 w-[50.5%] ml-4"
                placeholder="xxxx-xxxx-xxxx"
              ></Input>
            </div>
            <div className="flex">
              <div className="text-sm font-semibold w-32">
                Estimated delivery date?
              </div>
              <Input
                className="border-t-0 border-r-0 border-l-0 border-b-2 w-[50.5%] ml-4"
                type="date"
                placeholder="Name, Email, or Reference"
              ></Input>
            </div>
          </div>
          {/* <Card className="px-5 rounded-md mb-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Products</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead className="text-right">Taxes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card> */}
          <div className="flex justify-end mb-5 pr-3">
            <p className="font-semibold">Total:</p>
            <p className="font-bold px-1">0</p>
            <p className="font-semibold">đ</p>
          </div>
          <Tabs defaultValue="products" className="w-full mb-3">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="information">Other Information</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <Card className="mb-5 rounded-md">
                <div className="container mx-auto">
                  <DataTable columns={columns} data={data} />
                </div>
              </Card>
              <div className="grid grid-cols-2">
                <div>
                  <Textarea placeholder="Define your terms and conditions..."></Textarea>
                </div>
                <div className="flex justify-end mb-5 pr-3">
                  <p className="font-semibold">Total:</p>
                  <p className="font-bold px-1">0</p>
                  <p className="font-semibold">đ</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="information">
              <Card className="px-10 py-5 mt-2 rounded-md">
                <div className="grid grid-cols-2 mb-5">
                  <div className="flex">
                    <div className="text-sm font-semibold w-24 mt-2">
                      Buyer?
                    </div>
                    <Input
                      className=" border-t-0 border-r-0 border-l-0 border-b-2 w-[50%] ml-4"
                      placeholder="Full Name"
                    ></Input>
                  </div>
                  <div className="flex">
                    <div className="text-sm font-semibold w-36 mt-2">
                      Payment Terms?
                    </div>
                    <Select>
                      <SelectTrigger className="w-[50%] border-t-0 border-r-0 border-l-0 border-b-2">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="immediate-payment">
                            Immediate Payment
                          </SelectItem>
                          <SelectItem value="15-days">15 Days</SelectItem>
                          <SelectItem value="30-days">30 Days</SelectItem>
                          <SelectItem value="emd-month">
                            End of Following Month
                          </SelectItem>
                          <SelectItem value="10dayafter">
                            10 Days after End of Next Month
                          </SelectItem>
                          <SelectItem value="balance">
                            30% Now, Balance 60 Days
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 mb-5">
                  <div className="flex">
                    <div className="text-sm font-semibold w-24">
                      Source Document?
                    </div>
                    <Input className="border-t-0 border-r-0 border-l-0 border-b-2 w-[50%] ml-4"></Input>
                  </div>
                  <div className="flex">
                    <div className="text-sm font-semibold w-32 mt-2">
                      Fiscal Position?
                    </div>
                    <Input className="border-t-0 border-r-0 border-l-0 border-b-2 w-[50%] ml-4"></Input>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
