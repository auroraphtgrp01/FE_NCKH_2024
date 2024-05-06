/* eslint-disable @next/next/no-img-element */
'use client'
import React from "react";
import { Star } from 'lucide-react';
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
import Link from "next/link";

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
        <div className="grid grid-cols-6 gap-3 custom-grid">
          {(() => {
            const cards = [];
            for (let i = 0; i < 20; i++) {
              cards.push(
                <Card key={i} className="mb-0 rounded-md hover:scale-105 hover:delay-250 duration-300">
                  <Link href={`/supplier/${i + 1}`}>
                    <CardHeader className="p-0">
                      <img
                        className="rounded-t-md w-full h-[128px]"
                        src='https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg'
                        alt=""
                      />
                    </CardHeader>
                    <CardContent className="mt-2 p-3">
                      <CardTitle className="mb-1 font-semibold text-lg truncate">
                        Nhà cung cấp Orace {i + 1}
                      </CardTitle>
                      <CardDescription className="text-sm mt-2 line-clamp-2 text-justify">
                        Đây là nhà cung cấp logistic số 1 thế giới
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-3">
                      <div className="flex basis-full justify-between items-center ">
                        <div className="flex items-center">
                          <p className="text-black mr-1 text-[13px] ">163</p>
                          <p className="text-nowrap text-primary text-[13px] "> Sản phẩm</p>
                        </div>
                        <div className="flex items-center text-right">
                          <p className="text-black mr-1 text-[13px] ">4.6 </p>
                          <p className="text-nowrap text-primary text-[13px] "> Đánh giá</p>
                        </div>
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              );
            }
            return cards;
          })()}
        </div>
      </div>
    </div >
  );
}
