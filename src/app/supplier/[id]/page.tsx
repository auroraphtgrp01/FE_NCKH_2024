/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { use, useEffect, useRef, useState } from 'react';
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
import { ArrowRight, Heart, Info, Star } from "lucide-react";
import { useRouter } from 'next/router'
import { products, images, supplierList } from '../data'
import { undefined } from "zod";
import Link from "next/link";

// swipper
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../../../assets/style.css';

// import required modules
import { Navigation } from 'swiper/modules';

// alert dialog
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// swipper
// Import Swiper React components

// interface Product {
//     id: number;
//     Name: string;
//     IdImage: number;
//     price: string;
//     SupplierId: number;
//     Description: string;
//     path: string;
// }
// interface Result {
//     url: string;
//     pro: Product; // Sử dụng kiểu dữ liệu Product đã định nghĩa
//     id: number;
//     Name: string;
//     address: string;
//     IdImage: number;
//     taxCode: string;
//     email: string;
//     phoneNumber: string;
//     Description: string;
// }

type MyName = {
    Description: string,
    IdImage: string,
    Name: string,
    address: string,
    email: string,
    id: string,
    phoneNumber: string,
    pro?: string,
    url: string
}

export default function page({ params }: { params: { id: string } }) {
    const [cloneResult, setCloneResult] = useState()
    const findSupplier: MyName = supplierList.find((supplier) => supplier.id === parseInt(params.id));
    console.log('123321', findSupplier);

    // var result: Result[] = [];
    var result: MyName[] = [];
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
    }

    function checkIndex(index: number) {
        setCloneResult(result[index])
    }
    console.log('>>>>>', cloneResult);

    // supplier list
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
    function formatToVND(price: string): string {
        return parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
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

                <div className=" w-[100%]">
                    <div className="ms-3 my-2"><Label className="font-bold text-xl text-[#1e293b] ">Các sản phẩm nổi bật của nhà cung cấp</Label></div>
                    <div className="grid">
                        <Swiper watchSlidesProgress={true} slidesPerView={4} className="mySwiper">
                            {result.map((value, index) => (
                                // start
                                <SwiperSlide className='' key={index}>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>

                                            <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300 cursor-pointer" onClick={(e) => { handleChangeBuy(index); checkIndex(index) }}>
                                                <CardHeader className="p-0 h-[60%]">
                                                    <img
                                                        className="rounded-t-md h-[200px]"
                                                        src={value.pro.path}
                                                        alt=""
                                                    />
                                                </CardHeader>
                                                <CardContent className="mt-2">
                                                    <CardTitle className="mb-1 font-semibold text-lg ">
                                                        <div className='text-left'>{value.pro.Name}</div>
                                                    </CardTitle>
                                                    <CardDescription className="text-sm mt-2 line-clamp-2">
                                                        <div className='text-left'>{value.pro.Description}</div>
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
                                            </Card>

                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='w-[70%] min-w-[70%]'>
                                            <AlertDialogHeader>
                                                <AlertDialogDescription className='grid grid-cols-2 AccordionContent '>
                                                    {/* content dialog */}
                                                    <div>
                                                        <img src={cloneResult?.pro?.path} alt="123" className="w-full" />
                                                        <div className="mt-4">
                                                            <Swiper watchSlidesProgress={true} spaceBetween={'10px'} slidesPerView={3} className="mySwiper">
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                                <SwiperSlide className="border-2 border-black">
                                                                    <img src={cloneResult?.pro?.path} alt="" className="w-full" />
                                                                </SwiperSlide>
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <div className=" p-2 ml-2 rounded-md">
                                                            <div className="flex items-center">
                                                                <div className="pr-4">Thương hiệu : <span className="text-blue-300">moriance</span></div>
                                                            </div>
                                                            <div className="my-2 text-red-400"><Label className=" text-xl font-medium ">{cloneResult?.pro?.Name}</Label></div>
                                                            <div className="flex items-center">
                                                                <div className='flex items-center'>
                                                                    <div className="pr-2">5.0 </div>
                                                                    <div className="pr-2 flex items-center">
                                                                        <Star className='text-sm w-[20px] text-yellow-300' />
                                                                        <Star className='text-sm w-[20px] text-yellow-300' />
                                                                        <Star className='text-sm w-[20px] text-yellow-300' />
                                                                        <Star className='text-sm w-[20px] text-yellow-300' />
                                                                        <Star className='text-sm w-[20px] text-yellow-300' />

                                                                    </div>

                                                                    <div className="pr-2">(140)</div>
                                                                    <div className="pr-2">|</div>
                                                                    <div className="pr-2">Đã bán</div>
                                                                </div>
                                                                <div>
                                                                    Sản xuất tại :   Japan
                                                                </div>
                                                            </div>

                                                            <div className="flex">
                                                                <div className="pr-2 text-xl font-bold">{formatToVND(cloneResult?.pro?.price)}</div>
                                                            </div>
                                                            <div>{cloneResult?.pro?.Description}</div>
                                                            <div className='text-end my-4'><Button>Order now</Button></div>
                                                        </div>

                                                    </div>

                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </SwiperSlide>
                                // end


                            ))}



                        </Swiper>
                    </div>
                    <div className="ms-3 my-2"><Label className="font-bold text-xl text-[#1e293b] ">Các nhà cung cấp khác</Label></div>
                    <div className="grid">
                        <Swiper watchSlidesProgress={true} slidesPerView={4} className="mySwiper">
                            {suppliersWithImages.map((value, index) => (
                                <SwiperSlide key={value.id}>
                                    <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300">
                                        <Link href={`/supplier/${value.id}`} onClick={() => handlegetInforSupplier(index)}>
                                            <CardHeader className="p-0 h-[60%]">
                                                <img
                                                    className="rounded-t-md h-[200px]"
                                                    src={value.imageUrl}
                                                    alt=""
                                                />
                                            </CardHeader>
                                            <CardContent className="mt-2">
                                                <CardTitle className="mb-1 font-semibold text-lg truncate text-left">
                                                    {value.Name}
                                                </CardTitle>
                                                <CardDescription className="text-sm mt-2 text-left">
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
                                </SwiperSlide>
                            ))}



                        </Swiper>
                    </div>

                </div>
            </div>
        </div>
    );
}
