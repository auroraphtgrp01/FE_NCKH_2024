/* eslint-disable react-hooks/rules-of-hooks */
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
import { useRouter } from 'next/router'
import { products, images, supplierList } from '../data'
import { undefined } from "zod";
import Link from "next/link";

export default function page({ params }: { params: { id: string } }) {
    const findSupplier = supplierList.find((supplier) => supplier.id === parseInt(params.id));
    var result: any[] = [];
    var filterProduct: any[] = [];
    if (findSupplier) {
        const image = images.find((img) => img.id === findSupplier.IdImage);
        filterProduct = products.filter((product) => product.SupplierId === findSupplier.id);

        if (filterProduct) {
            result = filterProduct.map((product) => {
                const imageProduct = images.find(value => value.id === product.IdImage);

                if (imageProduct) {
                    (product as any).path = imageProduct.url;
                }

                return {
                    ...findSupplier,
                    url: image ? image.url : undefined,
                    pro: product
                };
            });
        }
    }

    function handleChangeBuy(index: number) {
        const value = result[index]
        const payLoad = {
            name: value.pro.Name,
            price: value.pro.price,
            description: value.pro.Description,
            suppliersId: value.id
        }
        console.log("information product : ");
        console.log(payLoad);
        console.log('nè');
    }

    return (
        <div className="mb-14">
            <div className="flex justify-between mt-4 drop-shadow-2xl mb-3">
                <div>
                    <Label className="font-bold text-xl text-[#1e293b]">Supplier Detail</Label>
                </div>
                <div className="flex">
                    <Input
                        className="mr-4 w-[300px]"
                        placeholder="Search for supplier name..."
                    ></Input>
                    <Button>Search</Button>
                </div>
            </div>
            <div className="flex justify-around gap-4">
                <div className="w-[25%] border p-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6ZsmLf89sKSynl9oIGgNH63wzE7I2fsNjvHKjxmstQ&s" alt="123" className="w-full" />
                    <div className="mt-2 text-center font-bold">{findSupplier ? findSupplier.Name : ''}</div>
                    <div className="mt-2 text-justify"><strong>Email: </strong>{findSupplier ? findSupplier.email : ''}</div>
                    <div className="mt-2 text-justify"><strong>Số điện thoại: </strong>{findSupplier ? findSupplier.phoneNumber : ''}</div>
                    <div className="mt-2 text-justify"><strong>Địa chỉ: </strong>{findSupplier ? findSupplier.address : ''}</div>
                    <div className="mt-2 text-justify"><strong>Mô tả</strong>: {findSupplier ? findSupplier.Description : ''} </div>
                </div>

                <div className="border">
                    <div className="ms-3 my-2"><Label className="font-bold text-xl text-[#1e293b] ">Các sản phẩm nổi bật của nhà cung cấp</Label></div>
                    <div className="grid">
                        <div className="grid pl-4 grid-cols-4 justify-around gap-5 ">
                            {result.map((value, index) => (
                                <Card key={index} className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300 cursor-pointer" onClick={(e) => { handleChangeBuy(index) }}>
                                    <Link href={`/supplier/${value.id}/detail_product/${index}`}>
                                        <CardHeader className="p-0 h-[60%]">
                                            <img
                                                className="rounded-t-md h-[200px]"
                                                src={value.pro.path}
                                                alt=""
                                            />
                                        </CardHeader>
                                        <CardContent className="mt-2">
                                            <CardTitle className="mb-1 font-semibold text-lg  justify-center">
                                                <div>{value.pro.Name}</div>
                                            </CardTitle>
                                            <CardDescription className="text-sm mt-2">
                                                {value.pro.Description}
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
                    <div className="ms-3 my-2"><Label className="font-bold text-xl text-[#1e293b] ">Các sản phẩm khác</Label></div>
                    <div className="grid">
                        <div className="grid pl-4 grid-cols-4 justify-around gap-5 ">
                            <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
                                <a href="#">
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
                                <a href="#">
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
                                                <p className="text-primary mr-1">163</p> <p> Mua ngay</p>
                                            </div>
                                            <div className="flex text-[13px] pl-5">
                                                <p className="text-primary mr-1">4.6</p> <p> Trả góp</p>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </a>
                            </Card>
                            <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
                                <a href="#">
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
                            <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300 ">
                                <a href="#">
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
