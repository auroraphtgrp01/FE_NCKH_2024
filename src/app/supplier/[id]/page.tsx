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
import { ArrowRight, Heart, Info, Star, X } from "lucide-react";
import { useRouter } from 'next/router'
import { undefined } from "zod";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../assets/style.css';
import { Navigation } from 'swiper/modules';
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
export default function page({ params }: { params: { id: string } }) {
    function formatToVND(price: string): string {
        return parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
    }

    return (
        <div className="mb-14 z-0">
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
                <div className="w-[40%] ">
                    <div className='border-2'>
                        <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="123" className="w-full" />
                        <div className=' p-4'>
                            <div className="mt-2 text-center font-bold text-xl">Nhà cung cấp Orace</div>
                            <div className="mt-2 text-justify"><strong>Email: </strong>orace@gmail.com</div>
                            <div className="mt-2 text-justify"><strong>Số điện thoại: </strong>0357407264</div>
                            <div className="mt-2 text-justify"><strong>Địa chỉ: </strong>117 Quảng trường - Ba Đình - Hà Nội</div>
                            <div className="mt-2 text-justify"><strong>Mô tả: </strong>Đây là nhà cung cấp logistic số 1 thế giới chuyên cung cấp các dịch vụ liên quan đến logistic như vận chuyển hàng hóa , cho thuê các nhà kho trong lĩnh vực thương mại , xuất khẩu hàng qua amazon ,...</div>
                        </div>
                    </div>
                </div>

                <div className=" w-[100%]">
                    <div className=""><Label className="font-bold text-xl text-[#1e293b] ">Các sản phẩm nổi bật của nhà cung cấp</Label></div>
                    <div className="grid">
                        <Swiper watchSlidesProgress={true} slidesPerView={5} className="mySwiper" spaceBetween={'5px'}>
                            {(() => {
                                const cards = [];
                                for (let i = 0; i < 20; i++) {
                                    cards.push(
                                        <SwiperSlide>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Card className="mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300 w-full cursor-pointer">
                                                        <CardHeader className="p-0">
                                                            <img
                                                                className="rounded-t-md w-full h-[128px]"
                                                                src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg"
                                                                alt="Supplier image"
                                                            />
                                                        </CardHeader>
                                                        <CardContent className="mt-2 p-3">
                                                            <CardTitle className="mb-1 font-semibold text-lg truncate">
                                                                Máy bán nước mía tự động
                                                            </CardTitle>
                                                            <CardDescription className="text-sm mt-2 line-clamp-2 text-justify">
                                                                Mô tả về nhà cung cấp. Đây có thể là một mô tả ngắn về các sản phẩm hoặc dịch vụ mà nhà cung cấp cung cấp.
                                                            </CardDescription>
                                                        </CardContent>
                                                        <CardFooter className="p-3 pt-0">
                                                            <div className="flex justify-between items-center basis-full">
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
                                                    </Card>

                                                </AlertDialogTrigger>
                                                <AlertDialogContent className='w-[70%] min-w-[70%]'>
                                                    <AlertDialogHeader>

                                                        <AlertDialogDescription className='grid grid-cols-2 AccordionContent '>
                                                            {/* content dialog */}
                                                            <div>
                                                                <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="123" className="w-full" />
                                                                <div className="mt-4">
                                                                    <Swiper watchSlidesProgress={true} spaceBetween={10} slidesPerView={3} className="mySwiper">
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                    </Swiper>
                                                                </div>

                                                            </div>
                                                            <div className="ml-4 rounded-md">
                                                                <AlertDialogCancel className='ml-auto outline-none border-none focus-visible:ring-transparent flex justify-end '>
                                                                    <X className='outline-none border-none ' />
                                                                </AlertDialogCancel>
                                                                <div className="flex items-center">
                                                                    <div className="pr-4">Thương hiệu : <span className="text-blue-300">moriance</span></div>
                                                                </div>
                                                                <div className="my-2 text-red-400"><Label className=" text-xl font-medium ">Máy bán nước hoa quả tự động</Label></div>
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
                                                                    <div className="pr-2 text-xl font-bold">{formatToVND("200000")}</div>
                                                                </div>
                                                                <div>Áo thun nam kiểu dáng thời trang là một món đồ không thể thiếu trong tủ đồ của mọi quý ông hiện đại. Với thiết kế đơn giản nhưng đầy phong cách, chiếc áo này mang lại sự thoải mái và tự tin cho người mặc. Với chất liệu vải cotton cao cấp,
                                                                    <div className='text-end my-4'>
                                                                        <Button className='mr-2'>Thêm vào giỏ hàng</Button>
                                                                        <Button className='bg-red-500 hover:bg-red-600'>Mua ngay</Button>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </SwiperSlide>
                                    )
                                }
                                return cards;
                            })()}
                        </Swiper>
                    </div>
                    <div className="ms-3 my-2"><Label className="font-bold text-xl text-[#1e293b] ">Các nhà cung cấp khác</Label></div>
                    <div className="grid -z-0">
                        <Swiper watchSlidesProgress={true} slidesPerView={5} className="mySwiper" spaceBetween={'5px'}>
                            {(() => {
                                const cards = [];
                                for (let i = 0; i < 20; i++) {
                                    cards.push(
                                        <SwiperSlide>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Card className="mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300 w-full cursor-pointer">
                                                        <CardHeader className="p-0">
                                                            <img
                                                                className="rounded-t-md w-full h-[128px]"
                                                                src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg"
                                                                alt="Supplier image"
                                                            />
                                                        </CardHeader>
                                                        <CardContent className="mt-2 p-3">
                                                            <CardTitle className="mb-1 font-semibold text-lg truncate">
                                                                Máy bán nước mía tự động
                                                            </CardTitle>
                                                            <CardDescription className="text-sm mt-2 line-clamp-2 text-justify">
                                                                Mô tả về nhà cung cấp. Đây có thể là một mô tả ngắn về các sản phẩm hoặc dịch vụ mà nhà cung cấp cung cấp.
                                                            </CardDescription>
                                                        </CardContent>
                                                        <CardFooter className="p-3 pt-0">
                                                            <div className="flex justify-between items-center basis-full">
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
                                                    </Card>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className='w-[70%] min-w-[70%]'>
                                                    <AlertDialogHeader>
                                                        <AlertDialogDescription className='grid grid-cols-2 AccordionContent '>
                                                            <div>
                                                                <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="123" className="w-full" />
                                                                <div className="mt-4">
                                                                    <Swiper watchSlidesProgress={true} spaceBetween={10} slidesPerView={3} className="mySwiper">
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide className="border-2 border-black cursor-pointer">
                                                                            <img src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg" alt="" className="w-full" />
                                                                            <div className='active'></div>
                                                                        </SwiperSlide>
                                                                    </Swiper>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4 rounded-md">
                                                                <AlertDialogCancel className='ml-auto outline-none border-none focus-visible:ring-transparent flex justify-end '>
                                                                    <X className='outline-none border-none ' />
                                                                </AlertDialogCancel>
                                                                <div className="flex items-center">
                                                                    <div className="pr-4">Thương hiệu : <span className="text-blue-300">moriance</span></div>
                                                                </div>
                                                                <div className="my-2 text-red-400"><Label className=" text-xl font-medium ">Máy bán nước hoa quả tự động</Label></div>
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
                                                                    <div className="pr-2 text-xl font-bold">{formatToVND("200000")}</div>
                                                                </div>
                                                                <div>Áo thun nam kiểu dáng thời trang là một món đồ không thể thiếu trong tủ đồ của mọi quý ông hiện đại. Với thiết kế đơn giản nhưng đầy phong cách, chiếc áo này mang lại sự thoải mái và tự tin cho người mặc. Với chất liệu vải cotton cao cấp,
                                                                    <div className='text-end my-4'>
                                                                        <Button className='mr-2'>Thêm vào giỏ hàng</Button>
                                                                        <Button className='bg-red-500 hover:bg-red-600'>Mua ngay</Button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </SwiperSlide>
                                    )
                                }
                                return cards;
                            })()}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}
