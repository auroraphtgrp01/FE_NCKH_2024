/* eslint-disable @next/next/no-img-element */
'use client'
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Info } from "lucide-react";
import { products, images, supplierList } from './data'
import Link from "next/link";
const imageMap = new Map(images.map(image => [image.id, image.url]));

const suppliersWithImages = supplierList.map(supplier => ({
  ...supplier,
  imageUrl: imageMap.get(supplier.IdImage)
}));
function handlegetInforSupplier(index: number) {
  if (index >= 0 && index < suppliersWithImages.length) {
    const value = suppliersWithImages[index];
    const payLoad = {
      name: value.Name,
      taxCode: value.taxCode,
      email: value.email,
      phoneNumber: value.phoneNumber,
      address: value.address,
      userId: 1,
    };
    console.log('information supplier');
    console.log(payLoad);
  }
}
export default function page() {
  return (
    <div className="mb-14">
      <div className="flex justify-between mt-4 drop-shadow-2xl">
        <div>
          <Label className="font-bold text-xl text-[#1e293b]">Supplier</Label>
        </div>
        <div className="flex">
          <Input
            className="mr-4 w-[300px]"
            placeholder="Search for supplier name..."
          ></Input>
          <Button>Search</Button>
        </div>
      </div>
      <div className="mt-5 grid">
        <div className="grid pl-4 grid-cols-5 justify-around">
          {suppliersWithImages.map((value, index) => (
            <Card key={value.id} className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
              <Link href={`/supplier/${value.id}`} onClick={() => handlegetInforSupplier(index)}>
                <CardHeader className="p-0 h-[60%]">
                  <img
                    className="rounded-t-md h-[200px]"
                    src={value.imageUrl}
                    alt=""
                  />
                </CardHeader>
                <CardContent className="mt-2">
                  <CardTitle className="mb-1 font-semibold text-lg">
                    {value.Name}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2">
                    {value.Description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="inline-flex justify-between">
                    <div className="flex text-[13px] pr-5">
                      <p className="text-primary mr-1">163</p> <p> Sản phẩm</p>
                    </div>
                    <div className="flex text-[13px] pl-5">
                      <p className="text-primary mr-1">4.6</p> <p> Đánh giá</p>
                    </div>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div >
  );
}
