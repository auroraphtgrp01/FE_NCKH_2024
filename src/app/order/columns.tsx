/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { fetchAPI } from "@/utils/fetchAPI";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TData } from "./[id]/page";
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
  idOrder: string;
}



export function getColumns(data: DataWithName[], setData: React.Dispatch<React.SetStateAction<DataWithName[]>>, getDataOrders: () => void): ColumnDef<DataWithName>[] {
  const { toast } = useToast()
  const userInfoString = localStorage.getItem("user-info");
  const user_info = userInfoString ? JSON.parse(userInfoString) : null;
  const isCustomer = user_info && user_info.data.role === "Customer";
  const updateOrder = async (e: any, index: number, type: string) => {
    const products = data.map((value: any, index: any) => {
      return {
        "id": value.id,
        "name": value.name,
        "unit": value.unit,
        "image": value.image,
        "price": value.price,
        "discount": value.discount,
        "quantity": value.quantity,
        "taxPrice": value.taxPrice,
        "description": value.description
      }
    })

    if (type == 'quantity') {
      products[index].quantity = (e.target.value ? Number(e.target.value) : products[index].quantity)
    } else {
      products[index].discount = (e.target.value ? Number(e.target.value) : products[index].discount)
    }
    console.log('>>>>>>>>>>>>>>');
    console.log("Product thứ index : ", index, ": ", products[index]);
    const payload = {
      id: data[0].idOrder,
      products: products
    };
    console.log('>>>>>Payload PATCH lên : ', payload);
    await fetchAPI("/orders", "PATCH", payload)
      .then((res) => {
        toast({
          title: `Update thành công`,
          variant: "success",
        })
        getDataOrders()
      })
      .catch((err) => {
        toast({
          title: `Update không thành công`,
          variant: "destructive",
        })
      });
  };
  return [
    {
      accessorKey: "name",
      header: () => <div className="font-semibold ">Products</div>,
      cell: ({ row }) => <div className="text-start">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: () => <div className="font-semibold">Description</div>,
      cell: ({ row }) => <div className="text-start">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "price",
      header: () => <div className="font-semibold ">Price</div>,
      cell: ({ row }) => <div className="text-start">{row.getValue("price")}</div>,
    },
    {
      accessorKey: "image",
      header: () => <div className="font-semibold ">Image</div>,
      cell: ({ row }) => (
        <img
          className="w-14 hover:scale-[2] hover:delay-250 duration-300"
          src={row.getValue("image")}
          alt="Product Image"
        />
      ),
    },
    {
      accessorKey: "taxPrice",
      header: () => <div className="font-semibold ">Tax Price</div>,
      cell: ({ row }) => <div className="text-start">{row.getValue("taxPrice")}</div>,
    },
    {
      accessorKey: "quantity",
      header: () => <div className="font-semibold">Quantity</div>,
      cell: ({ row }) => {
        return (
          <div>
            {isCustomer ? (
              <div className="text-start">
                <Input
                  className="w-16"
                  type="text"
                  onBlur={(e) => { updateOrder(e, row.index, 'quantity') }}
                  defaultValue={row.getValue("quantity")}
                />
              </div>
            ) : (
              <div className="text-start">{row.getValue("quantity")}</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "discount",
      header: () => <div className="font-semibold ">Discount</div>,
      cell: ({ row }) => (
        <div>
          {isCustomer ? (
            <div className="text-start">{row.getValue("discount")}</div>
          ) : (
            <div className="text-start">
              <Input className="w-16" type="text" defaultValue={row.getValue("discount")} onBlur={(e) => { updateOrder(e, row.index, 'discount') }} />
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "priceWithoutTax",
      header: () => <div className="font-semibold ">Price without tax</div>,
      cell: ({ row }) => <div className="text-start">{row.getValue("priceWithoutTax")}</div>,
    },
    {
      accessorKey: "unit",
      header: () => <div className="font-semibold ">Unit</div>,
      cell: ({ row }) => <div className="text-start">{row.getValue("unit")}</div>,
    },
  ];
}
