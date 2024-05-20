/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from "react";

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
import { columns } from "../columns";
import { DataTable } from "../data-table";
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
import { fetchAPI } from "@/utils/fetchAPI";
import { useParams } from "next/navigation";

export interface OrderDetail {
  id: string;
  name: string;
  description?: string;
  quantity?: number;
  price: number;
  image: string;
  taxPrice?: number;
  discount?: number;
  taxExclude?: number;
  unit: string
}

export default function Page() {
  const [data, setData] = useState<OrderDetail[]>([]);
  const params = useParams<{ id: string }>();
  const [supplier, setsupplier] = useState('')
  const [endDate, setEndate] = useState('')
  const [supplierCode, setSupplierCode] = useState('')
  const [delivery, setDelivery] = useState('')

  useEffect(() => {
    fetchAPI(`/orders/${params.id}`, 'GET')
      .then(res => {
        console.log(res.data);
        const productOrder = res.data.order.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          taxPrice: product.taxPrice,
          discount: product.discount,
          priceWithoutTax: (product.price - product.discount),
          unit: product.unit,
        }));
        console.log(productOrder);
        setData(productOrder);
      })
      .catch(error => console.error("Lỗi khi lấy dữ liệu sản phẩm:", error));
  }, [params.id]);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold tracking-tight text-lg mb-5">
          Yêu cầu Báo giá
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
          <div className="text-sm font-semibold w-28 mt-2">Supplier</div>
          <Input
            className="w-[50%] ml-4"
            placeholder="Tên, Email, hoặc Tham chiếu" onBlur={(e) => setsupplier(e.target.value)}
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32 mt-2">End date</div>
          <Input
            className="w-[50%] ml-4"
            type="date"
            placeholder="Tên, Email, hoặc Tham chiếu" onBlur={(e) => setEndate(e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex">
          <div className="text-sm font-semibold w-28 mt-2">Supplier code</div>
          <Input
            className="w-[50.5%] ml-4"
            placeholder="xxxx-xxxx-xxxx"
            onBlur={(e) => setSupplierCode(e.target.value)}
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32">
            Delivery date
          </div>
          <Input
            className="w-[50.5%] ml-4"
            type="date"
            placeholder="Tên, Email, hoặc Tham chiếu" onBlur={(e) => setDelivery(e.target.value)}
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
          Gửi Yêu Cầu
        </Button>
        <Button className="px-2 py-2 mr-1" variant={"destructive"}>
          Xác Nhận Đơn Hàng
        </Button>
        <Button className="px-2 py-2" variant={"secondary"}>
          Hủy
        </Button>
      </div>
    </div >
  );
}
