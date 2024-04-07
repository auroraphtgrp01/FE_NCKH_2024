'use client'
import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CalendarPicker } from "@/components/ui/calendar-picker"

export default function Page() {
    // useState
    const [city, setCity] = useState('__');
    const [date, setDate] = React.useState<Date>()
    const [titleContract, settitleContract] = useState('Tiêu đề hợp đồng');
    const [numberContract, setNumberContract] = useState('__');
    const [law, setLaw] = useState('Lorem ipsum, dolor sit amet consectetur adipisicing elit.Fuga quam nobis perspiciatis ratione similique in quis rem fugiat doloremque.Magnam tempore quo doloremque hic a unde consequatur reiciendis nulla recusandae!');
    const [signingDate, setSigningDate] = useState('00-00-2024');
    const [endDate, setEndDate] = useState('00-00-2024');
    const [content, setContent] = useState('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam aliquam vitae corporis consequuntur soluta explicabo praesentium quos sapiente tenetur laborum harum et accusantium pariatur ipsa, ut quo fugit amet natus.');

    // supplier
    const [supplierName, setSupplierName] = useState('');
    const [supplierCitizenID, setSupplierCitizenID] = useState('');
    const [supplierSurrogate, setSupplierSurrogate] = useState('');
    const [supplierAddress, setSupplierAddress] = useState('');
    const [supplierPhoneNumber, setSupplierPhoneNumber] = useState('');
    const [supplierFax, setSupplierFax] = useState('');
    const [supplierAccountNumber, setSupplierAccountNumber] = useState('');
    const [supplierTreasury, setSupplierTreasury] = useState('');
    const [supplierSignature, setSupplierSignature] = useState('ExampleA');
    //customer
    const [customerName, setCustomerName] = useState('');
    const [customerCitizenID, setCustomerCitizenID] = useState('');
    const [customerSurrogate, setCustomerSurrogate] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [customerAccountNumber, setCustomerAccountNumber] = useState('');
    const [customerSignature, setCustomerSignature] = useState('ExampleA');
    // Sử dụng mảng để lưu trữ các giá trị của ô input
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [inputs, setInputs] = useState([{ value: '' }]);

    const addInput = () => {
        const newInputs = [...inputs, { value: '' }];
        setInputs(newInputs);
    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);
        console.log(inputs);
    };

    const handleDates = () => {
        console.log(date);
        
    }

    // function handleState
    const handleChangeCity = (event: any) => {
        setCity(event.target.value);
    };

    const handleChangeTitleContract = (event: any) => {
        settitleContract(event.target.value);
    };
    const handleChangeNumberContract = (event: any) => {
        setNumberContract(event.target.value);
    };
    const handleChangeLaw = (event: any) => {
        setLaw(event.target.value);
    };

    // config
    const handleChangSigningDate = (event: any) => {
        setSigningDate(event.target.value);
    };

    const handleChangeEndDate = (event: any) => {
        setEndDate(event.target.value);
    };
    const handleChangContent = (event: any) => {
        setContent(event.target.value);
    };
    const handleChangeSupplierName = (event: any) => {
        setSupplierName(event.target.value);
    };
    const handleChangeSupplierCitizenID = (event: any) => {
        setSupplierCitizenID(event.target.value);
    };
    const handleChangeSupplierSurrogate = (event: any) => {
        setSupplierSurrogate(event.target.value);
    };
    const handleChangeSupplierAddress = (event: any) => {
        setSupplierAddress(event.target.value);
    };
    const handleChangeSupplierPhoneNumber = (event: any) => {
        setSupplierPhoneNumber(event.target.value);
    };
    const handleChangeSupplierFax = (event: any) => {
        setSupplierFax(event.target.value);
    };
    const handleChangeSupplierAccountNumber = (event: any) => {
        setSupplierAccountNumber(event.target.value);
    };
    const handleChangeSupplierTreasury = (event: any) => {
        setSupplierTreasury(event.target.value);
    };
    const handleChangeCustomerName = (event: any) => {
        setCustomerName(event.target.value);
    };
    const handleChangeCustomerCitizenID = (event: any) => {
        setCustomerCitizenID(event.target.value);
    };
    const handleChangeCustomerSurrogate = (event: any) => {
        setCustomerSurrogate(event.target.value);
    };
    const handleChangeCustomerAddress = (event: any) => {
        setCustomerAddress(event.target.value);
    };
    const handleChangeCustomerPhoneNumber = (event: any) => {
        setCustomerPhoneNumber(event.target.value);
    };
    const handleChangeCustomerAccountNumber = (event: any) => {
        setCustomerAccountNumber(event.target.value);
    };
    const handleChangeSupplierSignature = (event: any) => {
        setSupplierSignature(event.target.value);
    };
    const handleChangeCustomerSignature = (event: any) => {
        setCustomerSignature(event.target.value);
    };
    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )
    
    return (
        <div className='mt-4'>
            <div className='flex justify-between'>
                {/* form data */}
                <div className="p-4">
                    <ScrollArea className="h-[600px] rounded-md border">
                        <div className='max-w-[100%]  border shadow-2xl p-16 text-sm w-[100%]'>
                            <div id="main">
                                <div id="application">
                                    <div className="">
                                        <h5 className="text-center">
                                            <b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>
                                            <div>
                                                <b>Độc lập - Tự do - Hạnh phúc</b>
                                            </div>
                                            <div>
                                                -------------------------------
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <Input type="text" name="" className="ml-2 mt-2 border-b w-24" onBlur={handleChangeCity}></Input>
                                                <div className='pt-2'>, Ngày hợp đồng</div>
                                                <CalendarPicker  onDateChange={setDate} selectedDate={date} />
                                                {/* <Input type="date" name="" className="ml-2 mt-2 border-b w-40" onBlur={handleDates}></Input> */}
                                                {/* <div className='pt-2'>Tháng</div>
                                                <Input type="text" name="" className="ml-2 mt-2 border-b w-10" onBlur={handleChangeMonth}></Input>
                                                <div className='pt-2'>Năm</div>
                                                <Input type="text" name="" className="ml-2 mt-2 border-b w-16" onBlur={handleChangeYear}></Input> */}
                                            </div>

                                        </h5>
                                        <h5 className="my-3 flex items-center justify-center ">
                                            <Textarea name="" id="" placeholder='Nhập tiêu đề' className=' w-[70%] h-5' onBlur={handleChangeTitleContract} ></Textarea>
                                        </h5>

                                        {/* <div className="flex items-center justify-center font-bold flex-wrap">
                                    <div className='pt-2'>Số:</div>
                                    <Input type="text" placeholder='Nhập số hợp đồng' name="" id="contractNumber" className="w-50 ml-3 mr-3 font-bold border " onBlur={handleChangeNumberContract}></Input>
                                    <div className='pt-2'>/HD</div>
                                </div> */}

                                        {/* <div className="law-title">
                                    <textarea name="" id="" placeholder='Nhập luật ......' className=' 'onBlur={handleChangeLaw}></textarea>
                                </div> */}
                                        <div className="">
                                            <div className="my-3">
                                                <div className="font-bold">BÊN NHÀ CUNG CẤP ( sau đây gọi tắt là Nhà cung cấp ):</div>
                                                <div className="">
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Tên doanh nghiệp: </span>
                                                        <Input placeholder='Nhập tên doanh nghiệp' id="supplierName" type="text" className="mt-2 ml-2 " onBlur={handleChangeSupplierName} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Số CCCD: </span>
                                                        <Input placeholder='Nhập CCCD' id="citizenIdentificationSupplier" type="text" className="mt-2 ml-2 " onBlur={handleChangeSupplierCitizenID} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Người đại diện:</span>
                                                        <Input placeholder='Nhập tên người đại diện' id="supplierRepresentative" type="text" className="mt-2 ml-2 " onBlur={handleChangeSupplierSurrogate} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Địa chỉ cơ quan:</span>
                                                        <Input placeholder='Nhập địa chỉ cơ quan' id="supplierAddress" type="text" className="mt-2 ml-2 " onBlur={handleChangeSupplierAddress} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Điện thoại:</span>
                                                        <Input placeholder='Nhập số điện thoại' id="supplierPhone" type="number" className="mr-2 mt-2 ml-2 " onBlur={handleChangeSupplierPhoneNumber} ></Input>
                                                        <span className="text-nowrap pt-2"> Fax:</span>
                                                        <Input placeholder='Nhập số Fax' id="supplierFax" type="number" className="mt-2 ml-2 " onBlur={handleChangeSupplierFax} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Số tài khoản:</span>
                                                        <Input placeholder='Nhập số tài khoản' id="supplierAccountNumber" type="number" className="mr-2 mt-2 ml-2 " onBlur={handleChangeSupplierAccountNumber} ></Input>
                                                        <span className="text-nowrap pt-2"> tại Kho bạc:</span>
                                                        <Input placeholder='Nhập địa chỉ Kho Bạc' id="treasurySupplier" type="text" className="mt-2 mr-2 ml-2 " onBlur={handleChangeSupplierTreasury} ></Input>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="my-3">
                                                <div className="font-bold">BÊN THUÊ DỊCH VỤ ( sau đây gọi tắt khách hàng ):</div>
                                                <div className="">
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Tên doanh nghiệp: </span>
                                                        <Input placeholder='Nhập tên doanh nghiệp' id="supplierName" type="text" className="mt-2 ml-2 border-2" onBlur={handleChangeCustomerName} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Số CCCD: </span>
                                                        <Input placeholder='Nhập CCCD' id="citizenIdentificationSupplier" type="text" className="mt-2 ml-2 " onBlur={handleChangeCustomerCitizenID} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Người đại diện:</span>
                                                        <Input placeholder='Nhập tên người đại diện' id="supplierRepresentative" type="text" className="mt-2 ml-2 " onBlur={handleChangeCustomerSurrogate} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Địa chỉ cơ quan:</span>
                                                        <Input placeholder='Nhập địa chỉ cơ quan' id="supplierAddress" type="text" className="mt-2 ml-2 " onBlur={handleChangeCustomerAddress} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Điện thoại:</span>
                                                        <Input placeholder='Nhập số điện thoại' id="supplierPhone" type="number" className="mr-2 mt-2 ml-2 " onBlur={handleChangeCustomerPhoneNumber} ></Input>
                                                        <span className="text-nowrap pt-2"> Số tài khoản</span>
                                                        <Input placeholder='Nhập số tài khoản' id="supplierFax" type="number" className="mt-2 ml-2 " onBlur={handleChangeCustomerAccountNumber} ></Input>
                                                    </div>

                                                </div>


                                            </div>
                                            <div className="flex items-center my-2">
                                                <span className="text-nowrap pt-2">Thỏa thuận cung cấp này Thỏa thuận được ký kết vào
                                                    ngày</span>
                                                <Input id="startedAt" type="date" className="mt-2 ml-2 " onBlur={handleChangSigningDate} ></Input>

                                            </div>
                                            <div className="flex items-center my-2">
                                                <span className="text-nowrap pt-2"> Ngày có hiệu lực, Và được kết thúc
                                                    vào ngày
                                                </span>
                                                <Input id="endedAt" type="date" className="mt-2 ml-2 " onBlur={handleChangeEndDate} ></Input>

                                            </div>

                                            <div className="flex items-center my-2">
                                                <div className="text-nowrap"> Hai bên thống nhất ký kết hợp đồng
                                                    với các nội dung sau đây:
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="my-2">
                                                <b>CÁC ĐIỀU KHOẢN CHÍNH</b>
                                            </div>
                                            <div className="">
                                                {inputs.map((input, index) => (
                                                    <div key={index} className='mt-2'>
                                                        {/* CBB */}
                                                        <ComboboxDemo />
                                                        {index === inputs.length - 1 && (
                                                            <Button type="button" className='ml-2 ' onClick={addInput}>
                                                                Thêm mới
                                                            </Button>
                                                        )}
                                                        {/* Nếu là input cuối cùng thì hiển thị nút thêm mới */}
                                                        <Textarea name="" id="" placeholder='Nhập nội dung điều khoản' className=' mt-2' defaultValue={input.value}
                                                            onBlur={(e) => handleInputChange(index, e.target.value)} ></Textarea>

                                                    </div>
                                                ))}

                                            </div>
                                            <div className="grid grid-cols-2 text-center">
                                                <div className="mr-10">
                                                    <b className="">BÊN MUA</b>
                                                    <div><i>(Chữ ký, họ tên)</i></div>
                                                    <Textarea name="" id="" className=' h-[130px]' onBlur={handleChangeSupplierSignature} ></Textarea>
                                                </div>
                                                <div className="">
                                                    <b className="">BÊN BÁN</b>
                                                    <div><i>(Chữ ký, họ tên)</i></div>
                                                    <Textarea name="" id="" className=' h-[130px]' onBlur={handleChangeCustomerSignature} ></Textarea>

                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>



                {/* Preview form */}
                <div className="p-4">
                    <ScrollArea className="h-[600px] rounded-md border">
                        <form className='max-w-[100%] p-16 text-sm border shadow-2xl w-[100%]' >
                            <div id="main">
                                <div id="application">
                                    <div className="introduce">
                                        <h5 className="title text-center">
                                            <b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>
                                            <div>
                                                <b>Độc lập - Tự do - Hạnh phúc</b>
                                            </div>
                                            <div>
                                                -------------------------------
                                            </div>
                                            <div className="flex justify-center items-center">
                                                {city}
                                                {/* &nbsp;, ngày&nbsp;
                                                {day}
                                                &nbsp;tháng&nbsp;
                                                {month}
                                                &nbsp;năm&nbsp;
                                                {year} */}
                                            </div>
                                        </h5>
                                        <h5 className="font-bold my-3 text-center uppercase">
                                            {titleContract}
                                        </h5>

                                        {/* <div className="items-center justify-center text-center font-bold">
                                    Số:&nbsp;
                                    {numberContract}
                                    /HĐ
                                </div> */}

                                        {/* <div className="law-title">
                                   
                                </div> */}
                                        <div className="wrapper-content">
                                            <div className="contentA  my-3">
                                                <div className="font-bold">BÊN NHÀ CUNG CẤP ( sau đây gọi tắt là Nhà cung cấp ):</div>
                                                <div className="information-A">
                                                    <div className="flex items-cente mt-2 text-nowrap">
                                                        <span className=" name">- Tên doanh nghiệp:&nbsp;</span>
                                                        {supplierName }
                                                    </div>
                                                    <div className="flex items-center mt-2 text-nowrap">
                                                        <span className=" name">- Số CCCD:&nbsp;</span>
                                                        {supplierCitizenID }
                                                    </div>
                                                    <div className="flex items-center mt-2 text-nowrap">
                                                        <span className=" name"> - Người đại diện:&nbsp;</span>
                                                        {supplierSurrogate}
                                                    </div>
                                                    <div className="flex items-center mt-2 text-nowrap">
                                                        <span className=" name"> - Địa chỉ cơ quan:&nbsp;</span>
                                                        {supplierAddress}
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2 text-nowrap">
                                                        <span className=" name"> - Điện thoại:&nbsp;
                                                        </span>
                                                        {supplierPhoneNumber}

                                                        <span className=" name"> Fax:&nbsp;
                                                        </span>
                                                        {supplierFax}

                                                    </div>
                                                    <div className="flex justify-between items-center mt-2 text-nowrap">
                                                        <span className=" name"> - Số tài khoản:&nbsp;
                                                        </span>
                                                        {supplierAccountNumber}

                                                        <span className=" name"> tại Kho bạc:&nbsp;
                                                        </span>
                                                        {supplierTreasury}

                                                    </div>
                                                </div>


                                            </div>
                                            <div className="contentB  my-3">
                                                <div className="font-bold">BÊN THUÊ DỊCH VỤ ( sau đây gọi tắt khách hàng ):</div>
                                                <div className="information-A">
                                                    <div className="flex items-center mt-2 text-nowrap">
                                                        <span className=" name">- Tên doanh nghiệp:&nbsp; </span>
                                                        {customerName}
                                                    </div>
                                                    <div className="flex items-center mt-2 text-nowrap">
                                                        <span className=" name">- Số CCCD:&nbsp; </span>
                                                        {customerCitizenID}

                                                    </div>
                                                    <div className="flex items-center mt-2 text-nowrap">
                                                        <span className=" name"> - Người đại diện:&nbsp;</span>
                                                        {customerSurrogate}
                                                    </div>
                                                    <div className="flex items-center mt-2 text-nowrap">
                                                        <span className=" name"> - Địa chỉ cơ quan:&nbsp;</span>
                                                        {customerAddress}
                                                    </div>
                                                    <div className="flex items-center justify-between text-nowrap mt-2">
                                                        <span className=" name"> - Điện thoại:&nbsp;
                                                        </span>
                                                        {customerPhoneNumber}

                                                        <span className=" name"> Số tài khoản:&nbsp;
                                                        </span>
                                                        {customerAccountNumber}

                                                    </div>

                                                </div>


                                            </div>
                                            <div className="flex items-center my-2">
                                                Thỏa thuận cung cấp này Thỏa thuận được ký kết vào
                                                ngày&nbsp;
                                                {formatDate(signingDate)}

                                            </div>
                                            <div className="flex items-center my-2">
                                                <span> Ngày có hiệu lực, Và được kết thúc
                                                    vào ngày&nbsp;
                                                </span>
                                                {formatDate(endDate)}

                                            </div>

                                            <div className="flex items-center my-2">
                                                <div> Hai bên thống nhất ký kết hợp đồng

                                                    với các nội dung sau đây:
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="my-2">
                                                <b>CÁC ĐIỀU KHOẢN CHÍNH</b>
                                            </div>
                                            <div className="my-2">

                                                <div>
                                                    {/* {inputs.map((input, index) => (
                                                        <><b>Điều 1. Đối tượng Hợp đồng</b>
                                                            <div key={index}>{input.value}</div></>
                                                    ))} */} 

                                                </div>
                                            </div>


                                            <div>
                                                <div className='grid grid-cols-2 text-center'>
                                                    <div>
                                                        <b>BÊN MUA</b>
                                                        <div><i>(Chữ ký, họ tên)</i></div>
                                                        <div className='text-center'>{supplierSignature}</div>
                                                    </div>
                                                    <div>
                                                        <b>BÊN BÁN</b>
                                                        <div><i>(Chữ ký, họ tên)</i></div>
                                                        {customerSignature}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form >
                    </ScrollArea>
                </div>
            </div >
        </div >
    )
}
export function ComboboxDemo() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const frameworks = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


function formatDate(inputDate: any) {
    const parts = inputDate.split('-'); // Tách chuỗi thành các phần riêng biệt
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
}

