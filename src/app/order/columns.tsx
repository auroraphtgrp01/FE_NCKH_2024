/* eslint-disable @next/next/no-img-element */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchAPI } from "@/utils/fetchAPI";
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

function updateOrder(e: object, index: number) {
  console.log(index);
  const payload = {
    products: [
      {
        "id": "0b8764b6-50c3-436f-9f17-db4d514d0231",
        "name": "Balo hình sữa vinamilk",
        "unit": "Cái",
        "image": "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720TPB/cong-ty-cp-xi-mang-ha-tien-1-651515.jpg",
        "price": 0.7,
        "discount": 0,
        "quantity": 1,
        "taxPrice": 0,
        "description": null
      }
    ]
  }
  // stesst
  fetchAPI("/orders", "PATCH", payload)
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);

    });
}
const userInfoString = localStorage.getItem('user-info');
const user_info = userInfoString ? JSON.parse(userInfoString) : null;
console.log(user_info.data);
const isCustomer = user_info && user_info.data.role === 'Customer';
export const columns: ColumnDef<TOrderDetail>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="font-semibold ">Products</div>;
    },
    cell: ({ row }) =>
      <div className="text-start">{row.getValue("name")}</div>
    ,
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
        src={row.getValue("image")}
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
    accessorKey: 'quantity',
    header: () => <div className="font-semibold">Quantity</div>,
    cell: ({ row }) => {
      return (
        <div>
          {isCustomer ? (
            <div className="text-start">
              <Input
                className="w-16"
                type="text"
                onBlur={(e) => updateOrder(e, row.index)}
                defaultValue={row.getValue('quantity')}
              />
            </div>
          ) : (
            <div className="text-start">{row.getValue('quantity')}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return <div className="font-semibold ">Discount</div>;
    },
    cell: ({ row }) => (
      <div>
        {isCustomer ? (
          <div className="text-start">
            <div className="text-start">{row.getValue('discount')}</div>
          </div>
        ) : (
          <div className="text-start">
            <Input className="w-16" type="text" defaultValue={row.getValue('discount')} />
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "priceWithoutTax",
    header: ({ column }) => {
      return <div className="font-semibold ">Price without tax</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("priceWithoutTax")}</div>
    ),
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return <div className="font-semibold ">Unit</div>;
    },
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("unit")}</div>
    ),
  },
];
