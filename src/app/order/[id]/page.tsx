/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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
// import { columns } from "../columns";
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

export type TData = {
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
  idOrder: string; // Thuộc tính idOrder cần phải có
};
export interface DataWithName {
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
export interface DataTableProps<TData extends DataWithName, TValue> {
  data: TData[];
  getDataOrders: () => void;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  idSupplier: number;
}

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
  unit: string;
  idOrder: string;
  idSupplier: string;
}

export default function Page() {
  const { toast } = useToast();
  const [data, setData] = useState<OrderDetail[]>([]);
  const { id } = useParams<{ id: string }>();
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [supplier, setsupplier] = useState("");
  const [endDate, setEndate] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [delivery, setDelivery] = useState("");
  const updateOrder = async (e: any, type: string) => {
    var payload = {};
    const dateValue = new Date(e.target.value);
    if (!isNaN(dateValue.getTime())) {
      const isoDate = dateValue.toISOString();
      let payload;

      if (type === "endDate") {
        payload = {
          id: id,
          endDate: isoDate,
        };
      } else if (type === "delivery") {
        payload = {
          id: id,
          executeDate: isoDate,
        };
      }

      if (payload) {
        console.log(">>>>>Payload PATCH lên : ", payload);
        try {
          const res = await fetchAPI("/orders", "PATCH", payload);
          toast({
            title: `Update thành công`,
            variant: "success",
          });
        } catch (err) {
          toast({
            title: `Update không thành công`,
            variant: "destructive",
          });
        }
      }
    } else {
      console.log("Chưa nhập xong");
    }
  };
  const getDataOrders = () => {
    fetchAPI(`/orders/${id}`, "GET")
      .then((res) => {
        setEndate(res.data.order.endDate.split("T")[0]);
        setDelivery(res.data.order.executeDate.split("T")[0]);

        setDataOrder(res.data.supplier);
        const productOrder = res.data.order.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          taxPrice: product.taxPrice,
          discount: product.discount,
          priceWithoutTax:
            (product.price - product.discount) * product.quantity,
          unit: product.unit,
          idSupplier: res.data.supplier.id,
          quantity: product.quantity,
          idOrder: id,
        }));
        setData(productOrder);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu sản phẩm:", error));
  };
  useEffect(() => {
    getDataOrders();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold tracking-tight text-lg mb-5">
          Request a quote
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
            placeholder="Tên, Email, hoặc Tham chiếu"
            value={dataOrder.name}
            disabled
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32 mt-2">End date</div>
          <Input
            className="w-[50%] ml-4"
            type="date"
            placeholder="Tên, Email, hoặc Tham chiếu"
            value={endDate}
            onBlur={(e) => {
              updateOrder(e, "endDate");
            }}
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
            value={dataOrder.taxCode}
            disabled
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32">Delivery date</div>
          <Input
            className="w-[50.5%] ml-4"
            type="date"
            placeholder="Tên, Email, hoặc Tham chiếu"
            value={delivery}
            onBlur={(e) => {
              updateOrder(e, "delivery");
            }}
          ></Input>
        </div>
      </div>
      <Tabs defaultValue="products" className="w-full mb-5">
        <TabsContent value="products">
          {/* columns={columns} */}
          <DataTable
            data={data}
            setData={setData}
            getDataOrders={getDataOrders}
          />
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
    </div>
  );
}
