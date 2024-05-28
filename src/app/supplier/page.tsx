/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
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
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import { fetchAPI } from "@/utils/fetchAPI";
import Link from "next/link";

export default function page() {
  const [supplierList, setSupplierList] = useState<any>([]);
  useEffect(() => {
    fetchAPI("/suppliers", "GET").then((res) => {
      setSupplierList([...res.data]);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="mb-14">
      <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
        <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
          <div className="flex">
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <div className="flex justify-between mt-4 drop-shadow-2xl">
        <div></div>
        <div className="flex">
          <Input
            className="mr-4 w-[300px]"
            placeholder="Search for supplier name..."
          ></Input>
          <Button>Search</Button>
        </div>
      </div>
      <div className="mt-5 grid">
        <div className="grid pl-4 grid-cols-5">
          {supplierList.map((item: any, index: any) => (
            <Link href={`/supplier/${item.id}`} key={index}>
              <div className=" rounded-lg shadow-md overflow-hidden dark:bg-zinc-800 hover:scale-105 hover:delay-250 duration-300">
                <img
                  alt="Product 1"
                  className="w-full h-40 object-cover select-none"
                  height="300"
                  src={
                    item?.images.length > 0
                      ? item?.images[0]?.path
                      : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width="400"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold select-none mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 select-none dark:text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-gray-500 select-none dark:text-gray-400 line-clamp-2">
                    Address: {item.address}
                  </p>
                  <p className="text-gray-500 select-none dark:text-gray-400 line-clamp-2">
                    TaxCode: {item.taxCode}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
