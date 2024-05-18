'use client'
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
const image = [
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720TPB/cong-ty-cp-xi-mang-ha-tien-1-651515.jpg",
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720Ymu/cong-ty-co-phan-go-an-cuong-651470.jpg",
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720GWy/magis-stone-1176889.jpg",
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473720ztl/cong-ty-tnhh-siam-city-cement-viet-nam-651497.jpg"
]
const dataSupplier = {
    name: "Công ty TNHH Siam City Cement Việt Nam",
    description: "Tổng công ty Viglacera - CTCP - Ngôi sao sáng trong ngành vật liệu xây dựng Việt Nam. Với 47 năm kinh nghiệm, Viglacera cung cấp đa dạng sản phẩm chất lượng cao như sứ vệ sinh, gạch ốp lát granite, kính xây dựng, gạch ngói đất sét nung, tấm panel,... Định hình là doanh nghiệp đa quốc gia, Viglacera không chỉ sản xuất vật liệu hàng đầu mà còn đầu tư bất động sản, phát triển hạ tầng, đóng góp vào sự phồn thịnh của thị trường thế giới. ",
    address: "Khu công nghiệp Yên Mỹ, Hưng Yên",
    email: "minhtuanledng@gmail.com",
    phone: "0987654321"
}
export default function page() {
    const [isSelectImg, setIsSelectImg] = useState(0)
    function StarIcon(props: any) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        )
    }
    return (
        <div>
            <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background">
                <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
                    <div className='flex'>
                        <BreadCrumbHeader />
                    </div>
                </div>
            </header>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
                <div className="grid gap-4">
                    <div className="grid md:grid-cols-5 gap-3 items-start">
                        <div className="hidden md:flex flex-col gap-3 items-start">
                            {image.map((item, index) => (
                                <button onClick={() => {
                                    setIsSelectImg(index)
                                }}
                                    className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                                    <img
                                        alt="Preview thumbnail"
                                        className="aspect-square object-cover"
                                        height={100}
                                        src={item}
                                        width={100}
                                    />
                                    <span className="sr-only">View Image 1</span>
                                </button>
                            ))}
                        </div>
                        <div className="md:col-span-4">
                            <img
                                alt="Product Image"
                                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                                height={600}
                                src={image[isSelectImg]}
                                width={600}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid gap-4 md:gap-10 items-start">
                    <div className="grid gap-4">
                        <h1 className="font-bold text-3xl lg:text-4xl">{dataSupplier.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-black" />
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                            </div>
                            <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">4.5</span>
                            </div>
                        </div>
                        <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                            <p>
                                {dataSupplier.description}
                            </p>
                            <div>
                                <b className="font-bold text-black">Address: </b> {dataSupplier.address}
                            </div>
                            <div>
                                <b className="font-bold text-black">Email: </b> {dataSupplier.email}
                            </div>
                            <div>
                                <b className="font-bold text-black">Phone: </b> {dataSupplier.phone}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
