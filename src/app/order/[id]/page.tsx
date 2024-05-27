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
import { useRouter } from "next/router";

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
  orderStatus: string;
}

export interface DataWithName {
  status: string;
  orderDetails: OrderDetail[];
}

export interface UserInfo {
  access_token: string;
  addressWallet: string;
  email: string;
  id: string;
  name: string;
  refresh_token: string;
  role: string;
}
export interface DataTableProps<TData extends DataWithName> {
  data: TData;
  getDataOrders: () => void;
  setData: React.Dispatch<React.SetStateAction<TData>>;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  idSupplier: number;
}

export default function Page() {
  const { toast } = useToast();
  const [data, setData] = useState<DataWithName>({
    status: "",
    orderDetails: [],
  });
  const { id } = useParams<{ id: string }>();
  const [dataOrder, setDataOrder] = useState<any>({});
  const [endDate, setEndate] = useState("");
  const [delivery, setDelivery] = useState("");
  const [isDisableButton, setIsDisableButton] = useState({
    isDisableButtonSendRq: false,
    isDisableButtonResendRq: false,
    isDisableButtonDeleteSurvey: false,
    isDisableButtonCreateContract: false,
    isDisableButtonRefuseSurvey: false,
  });
  const [isCustomer, setIsCustomer] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    access_token: "",
    addressWallet: "",
    email: "",
    id: "",
    refresh_token: "",
    name: "",
    role: "",
  });
  // xxxxxx
  useEffect(() => {
    getDataOrders();
    console.log(isDisableButton.isDisableButtonSendRq);
    console.log(isDisableButton.isDisableButtonResendRq);

    const info = JSON.parse(localStorage.getItem("user-info") as string);
    setUserInfo(info);
    if (info.data.role === "Customer") setIsCustomer(true);
  }, []);

  async function sendRequestToSupplier() {
    await fetchAPI(`/orders/send-request/${dataOrder.id}`, "GET")
      .then((res) => {
        toast({
          title: res.data.message,
          variant: "success",
        });

        setIsDisableButton({ ...isDisableButton, isDisableButtonSendRq: true });
        getDataOrders();
      })
      .catch((err) =>
        toast({
          title: err.message,
          variant: "destructive",
        })
      );
  }

  async function resendSurveyToCustomer() {
    await fetchAPI(`/orders/resend-request/${dataOrder.id}`, "GET")
      .then((res) => {
        toast({
          title: res.data.message,
          variant: "success",
        });

        setIsDisableButton({
          ...isDisableButton,
          isDisableButtonResendRq: true,
        });
        getDataOrders();
      })
      .catch((err) =>
        toast({
          title: err.message,
          variant: "destructive",
        })
      );
  }

  async function createContract() {
    const router = useRouter();
    router.push({
      pathname: "/contract",
      query: {
        supplierId: dataOrder.order.suppliersId,
        userId: dataOrder.order.userId,
        orderId: dataOrder.order.id,
      },
    });
  }

  async function updateOrder(e: any, type: string) {
    let payload = {};
    const dateValue = new Date(e.target.value);
    if (!isNaN(dateValue.getTime())) {
      const isoDate = dateValue.toISOString();
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
        try {
          await fetchAPI("/orders", "PATCH", payload).then((res) => {
            getDataOrders();
            toast({
              title: `Update thành công`,
              variant: "success",
            });
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
  }
  function getDataOrders() {
    fetchAPI(`/orders/${id}`, "GET")
      .then((res) => {
        setDataOrder(res.data);
        if (res.data.order.endDate !== null)
          setEndate(res.data.order.endDate.split("T")[0]);
        if (res.data.order.executeDate !== null)
          setDelivery(res.data.order.executeDate.split("T")[0]);
        const { products, ...rest } = res.data.order;
        setIsDisableButton({
          ...isDisableButton,
          isDisableButtonSendRq: res.data.order.status !== "Pending",
          isDisableButtonResendRq:
            res.data.order.status === "Completed" ||
            res.data.order.status === "Cancelled",
          isDisableButtonCreateContract: res.data.order.status !== "Completed",
          isDisableButtonRefuseSurvey: res.data.order.status !== "In Progress",
          isDisableButtonDeleteSurvey: res.data.order.status !== "Pending",
        });

        const productOrder = res.data.order.products.map((product: any) => {
          return {
            ...product,
            priceWithoutTax:
              product.price * product.quantity - product.discount,
            idSupplier: res.data.supplier.id,
            idOrder: id,
          };
        });

        setData({ status: rest.status, orderDetails: productOrder });
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu sản phẩm:", error));
  }

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
            defaultValue={dataOrder.supplier?.name}
            disabled
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32 mt-2">End date</div>
          <Input
            className="w-[50%] ml-4"
            type="date"
            placeholder="Tên, Email, hoặc Tham chiếu"
            defaultValue={endDate}
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
            defaultValue={dataOrder.supplier?.taxCode}
            disabled
          ></Input>
        </div>
        <div className="flex">
          <div className="text-sm font-semibold w-32">Delivery date</div>
          <Input
            className="w-[50.5%] ml-4"
            type="date"
            placeholder="Tên, Email, hoặc Tham chiếu"
            defaultValue={delivery}
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
        {isCustomer === false ? (
          <div>
            <Button
              className="px-2 py-2 mr-1"
              variant={"default"}
              disabled={isDisableButton.isDisableButtonResendRq}
              onClick={() => resendSurveyToCustomer()}
            >
              Resend to customer
            </Button>
            <Button
              className="px-2 py-2"
              variant={"destructive"}
              disabled={isDisableButton.isDisableButtonRefuseSurvey}
            >
              Refuse
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="px-2 py-2 mr-1"
              variant={"outline"}
              disabled={isDisableButton.isDisableButtonCreateContract}
              onClick={() => createContract()}
            >
              Create contract
            </Button>
            <Button
              className="px-2 py-2 mr-1"
              variant={"default"}
              disabled={isDisableButton.isDisableButtonSendRq}
              onClick={() => sendRequestToSupplier()}
            >
              Send request to supplier
            </Button>
            <Button
              className="px-2 py-2"
              variant={"destructive"}
              disabled={isDisableButton.isDisableButtonDeleteSurvey}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
