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
import { products, images, supplierList } from '../../../data'
import { undefined } from "zod";
import Link from "next/link";
// swipper
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../../../../../assets/style.css';

// import required modules
import { Navigation } from 'swiper/modules';
export default function page({ params }: { params: { id: string, slug: number } }) {
    console.log(params);

    const findSupplier = supplierList.find((supplier) => supplier.id === parseInt(params.id));
    var result: any[] = [];
    var fullProducts: any[] = [];

    var filterProduct: any[] = [];
    var filterProductFull: any[] = [];
    if (findSupplier) {
        const image = images.find((img) => img.id === findSupplier.IdImage);
        filterProduct = products.filter((product) => product.SupplierId === findSupplier.id);
        filterProductFull = [...filterProduct]
        filterProduct = [filterProduct[params.slug]]

        if (filterProduct) {
            fullProducts = filterProductFull.map((product) => {
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
        // const value = result[index]
        // const payLoad = {
        //     name: value.pro.Name,
        //     price: value.pro.price,
        //     description: value.pro.Description,
        //     suppliersId: value.id
        // }
        // console.log("information product : ");
        // console.log(payLoad);
    }
    console.log('nè');
    // console.log(result);
    console.log(fullProducts);


    return (
        <div className="mb-14">
            <div className="grid grid-cols-4  gap-4 ">
                <div>
                    <img src={result[0].pro.path} alt="123" className="w-full" />
                    <div className="mt-4">
                        <Swiper watchSlidesProgress={true} spaceBetween={'10px'} slidesPerView={3} className="mySwiper">
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                            <SwiperSlide className="border-2 border-black">
                                <img src={result[0].pro.path} alt="" className="w-full" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="mt-4">
                        <div className="font-semibold text-xl text-center">{result[0].pro.Name}</div>
                    </div>
                    <div className="mt-4">
                        <div className="font-semibold">Đặc điểm nổi bật</div>
                        <div className="flex">
                            <span className="mr-2">icon</span>
                            <span>Sữa Morinaga Số 2 Chilmil cung cấp chất dinh dưỡng cân bằng, tương đương sữa mẹ.</span>
                        </div>
                        <div className="flex">
                            <span className="mr-2">icon</span>
                            <span>Bổ sung Lactoferrin và tiền lợi khuẩn Bifidus tăng cường hệ miễn dịch và tiêu hóa.</span>
                        </div>
                        <div className="flex">
                            <span className="mr-2">icon</span>
                            <span>Cung cấp DHA/ARA hỗ trợ phát triển trí não và chức năng thị giác.</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="border p-2 mb-4 rounded-md">
                        <div className="flex items-center">
                            <div className="pr-4">icon</div>
                            <div className="pr-4">icon</div>
                            <div className="pr-4">icon</div>
                            <div className="pr-4">Thương hiệu : <span className="text-blue-300">moriance</span></div>
                        </div>
                        <div className="my-2"><Label className=" text-xl font-medium ">{result[0].Name}</Label></div>
                        <div className="flex">
                            <div className="pr-2">5.0 </div>
                            <div className="pr-2">icon</div>
                            <div className="pr-2">(140)</div>
                            <div className="pr-2">|</div>
                            <div className="pr-2">Đã bán</div>
                        </div>
                        <div>
                            Japan
                        </div>
                        <div className="flex">
                            <div className="pr-2 text-xl font-bold">Giá</div>
                            <div className="pr-2">icon</div>
                        </div>
                    </div>
                    <div className="border p-2 mb-4 rounded-md">
                        <div className="my-2"><Label className=" text-xl font-medium ">Thông tin vận chuyển</Label></div>
                        <div className="flex items-center justify-between">
                            <div>Giao đến Q. Hải Châu, P. Hải Châu I, Đà Nẵng</div>
                            <div className="font-bold text-blue-400">Đổi</div>
                        </div>
                        <div className="flex">
                            <div className="pr-2">Icon</div>
                            <div>
                                <div className="font-bold ">Giao thứ ba</div>

                            </div>
                        </div>
                        <div>Trước 19h, 07/05: 20.000</div>
                    </div>
                    <div className="border p-2 mb-4 rounded-md">
                        <div className="my-2"><Label className=" text-xl font-medium ">Dịch vụ bổ sung</Label></div>
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="mr-2">icon</div>
                                <div>Ưu đãi đến 600k với thẻ TikiCard</div>
                            </div>
                            <div className="text-blue-400 font-bold">Đăng ký</div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="mr-2">icon</div>
                                <div>Ưu đãi đến 600k với thẻ TikiCard</div>
                            </div>
                            <div className="text-blue-400 font-bold">Đăng ký</div>
                        </div>
                    </div>

                </div>
                <div className="">
                    <div className="border p-2 mb-4 rounded-md">
                        <div className="flex flex-auto">
                            <div className="mr-2">icon</div>
                            <div>
                                <div className="font-semibold">
                                    Tiki traing
                                </div>
                                <div className="flex items-center justify-around">
                                    <div className="mr-2">icon </div>
                                    <div>4.7 </div>
                                    <div className="mr-2">icon </div>
                                    <div>(5.4+ đánh giá) </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="font-semibold my-2">
                            Số lượng
                        </div>
                        <div className="flex items-center mr-4">
                            <Button className="mr-2">-</Button>
                            <Button className="mr-2">1</Button>
                            <Button className="mr-2">+</Button>
                        </div>
                        <div className="font-semibold my-2">
                            Tạm tính
                        </div>
                        <div className="flex">
                            <div className="pr-2 text-xl font-bold">Giá</div>
                            <div className="pr-2">icon</div>
                        </div>
                        <div className="w-full my-2">
                            <Button className="bg-white border-blue-500 text-blue-500 border w-full hover:text-white ">Mua ngay</Button>
                        </div>
                        <div className="w-full my-2">
                            <Button className="bg-white border-blue-500 text-blue-500 border w-full hover:text-white ">Thêm vào giỏ</Button>
                        </div>
                        <div className="w-full my-2">
                            <Button className="bg-white border-blue-500 text-blue-500 border w-full hover:text-white ">Mua trước trả sau</Button>
                        </div>
                    </div>
                </div>


            </div>
            <div>
                <div className="ms-3 my-2"><Label className="font-bold text-xl  ">Các sản phẩm nổi bật của {result[0].Name}</Label></div>
                <div className="grid grid-cols-5">
                    {fullProducts.map((value, index) => (
                        <SwiperSlide key={index} className=''>
                            <Card className="w-[260px] h-[350px] mb-4 rounded-md hover:scale-105 hover:delay-250 duration-300 cursor-pointer" onClick={(e) => { handleChangeBuy(index) }}>
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
                        </SwiperSlide>

                    ))}



                </div>
            </div>
        </div >
    );
}
