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
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6ZsmLf89sKSynl9oIGgNH63wzE7I2fsNjvHKjxmstQ&s"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://dnbvietnam.com/Uploads/images/news/khong-the-loai-bo-hoan-toan-rui-ro-tu-nha-cung-cap.jpg"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://vietquality.vn/wp-content/uploads/2018/12/Supplier-Managment-e1568540665525.jpg"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://faceworks.vn/wp-content/uploads/2017/12/the-nao-la-nha-cung-cap-erp-tot-01.png"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBWhKuGrJl1vHIb1l3bGdzziE6MXgb48cUk2Ccuc2OuA&s"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://3d-smartsolutions.com/wp-content/uploads/2023/05/Danh-gia-nha-cung-cap-trong-nen-cong-nghiep-40.jpg"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn9cCK31k1uo8slM3GNl07VARXP3tHiCBO1xHXtEqTcA&s"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://phuongnam24h.com/img_data/images/nha-cung-cap-la-gi.jpg"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
          <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
            <a href="link-supplier">
              <CardHeader className="p-0 h-[60%]">
                <img
                  className="rounded-t-md h-[200px]"
                  src="https://www.fasolutions.vn/wp-content/uploads/2023/09/su-dung-phan-mem-quan-ly-nha-cung-cap-1.jpg"
                  alt=""
                />
              </CardHeader>
              <CardContent className="mt-2">
                <CardTitle className="mb-1 font-semibold text-lg">
                  Tôn Hoa Sen
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                  183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
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
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
