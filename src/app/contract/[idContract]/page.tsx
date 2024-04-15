'use client'
import React, { useEffect, useRef, useState } from 'react'
import { format, parse } from 'date-fns';
import { State } from './state';
dfsfđsds
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

import { Check, ChevronsUpDown, Key } from "lucide-react"

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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

export default function Page() {
    const [inputValue, setInputvalue] = useState('')
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
    const {
        city, setCity,
        date, setDate,
        titleContract, setTitleContract,
        numberContract, setNumberContract,
        law, setLaw,
        signingDate, setSigningDate,
        endDate, setEndDate,
        content, setContent,
        supplierName, setSupplierName,
        supplierCitizenID, setSupplierCitizenID,
        supplierSurrogate, setSupplierSurrogate,
        supplierAddress, setSupplierAddress,
        supplierPhoneNumber, setSupplierPhoneNumber,
        supplierFax, setSupplierFax,
        supplierAccountNumber, setSupplierAccountNumber,
        supplierTreasury, setSupplierTreasury,
        supplierSignature, setSupplierSignature,
        customerName, setCustomerName,
        customerCitizenID, setCustomerCitizenID,
        customerSurrogate, setCustomerSurrogate,
        customerAddress, setCustomerAddress,
        customerPhoneNumber, setCustomerPhoneNumber,
        customerAccountNumber, setCustomerAccountNumber,
        customerSignature, setCustomerSignature,
        inputs, setInputs,
        open, setOpen,
        values, setValues,
        // disabledInputs, setDisabledInputs,
        // disabledValues, setDisabledValues,
    } = State();
    const handleComboboxChange = async (index: number, e: any) => {
        const newCombobox = [...values];
        newCombobox[index].value = e;
        setValues(newCombobox);
        console.log(values);
    };

    const addInput = () => {
        const newInputs = [...inputs, { value: '' }];
        const newCBB = [...values, { value: 'Select framework...' }];
        setInputs(newInputs);
        setValues(newCBB);
        // setDisabledInputs([...disabledInputs, true]); // set input trước cái input tạo ra
        // setDisabledValues([...disabledValues, true]); // set input trước cái input tạo ra


    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);
        console.log(inputs);

    };

    const handleDates = (newDate: Date) => {
        console.log(newDate);
        setDate(newDate)
    }

    // function handleState
    const handleChangeCity = (event: any) => {
        setCity(event.target.value);
    };

    const handleChangeTitleContract = (event: any) => {
        setTitleContract(event.target.value);
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

    // Position
    const inputRefs = {
        city: useRef<HTMLInputElement>(null),
        date: useRef<HTMLInputElement>(null),
        titleContract: useRef<HTMLInputElement>(null),
        numberContract: useRef<HTMLInputElement>(null),
        law: useRef<HTMLInputElement>(null),
        signingDate: useRef<HTMLInputElement>(null),
        endDate: useRef<HTMLInputElement>(null),
        content: useRef<HTMLInputElement>(null),
        add: useRef<HTMLInputElement>(null),
        supplierName: useRef<HTMLInputElement>(null),
        supplierCitizenID: useRef<HTMLInputElement>(null),
        supplierSurrogate: useRef<HTMLInputElement>(null),
        supplierAddress: useRef<HTMLInputElement>(null),
        supplierPhoneNumber: useRef<HTMLInputElement>(null),
        supplierFax: useRef<HTMLInputElement>(null),
        supplierAccountNumber: useRef<HTMLInputElement>(null),
        supplierTreasury: useRef<HTMLInputElement>(null),
        supplierSignature: useRef<HTMLInputElement>(null),
        customerName: useRef<HTMLInputElement>(null),
        customerCitizenID: useRef<HTMLInputElement>(null),
        customerSurrogate: useRef<HTMLInputElement>(null),
        customerAddress: useRef<HTMLInputElement>(null),
        customerPhoneNumber: useRef<HTMLInputElement>(null),
        customerAccountNumber: useRef<HTMLInputElement>(null),
        customerSignature: useRef<HTMLInputElement>(null),
    };

    // Tạo Ref
    const previewRefs = {
        PreviewSupplierNameRef: useRef<HTMLDivElement>(null),
        PreviewSupplierCitizenIDRef: useRef<HTMLDivElement>(null),
        PreviewSupplierSurrogateRef: useRef<HTMLDivElement>(null),
        PreviewSupplierAddressRef: useRef<HTMLDivElement>(null),
        PreviewSupplierPhoneNumberRef: useRef<HTMLDivElement>(null),
        PreviewSupplierFaxRef: useRef<HTMLDivElement>(null),
        PreviewSupplierAccountNumberRef: useRef<HTMLDivElement>(null),
        PreviewSupplierTreasuryRef: useRef<HTMLDivElement>(null),
        PreviewCustomerNameRef: useRef<HTMLDivElement>(null),
        PreviewCustomerCitizenIDRef: useRef<HTMLDivElement>(null),
        PreviewCustomerSurrogateRef: useRef<HTMLDivElement>(null),
        PreviewCustomerAddressRef: useRef<HTMLDivElement>(null),
        PreviewCustomerPhoneNumberRef: useRef<HTMLDivElement>(null),
        PreviewCustomerAccountNumberRef: useRef<HTMLDivElement>(null),
        PreviewSigningDateRef: useRef<HTMLDivElement>(null),
        PreviewEndDateRef: useRef<HTMLDivElement>(null),
        PreviewSupplierSignatureRef: useRef<HTMLDivElement>(null),
        PreviewCustomerSignatureRef: useRef<HTMLDivElement>(null),
        PreviewTitleContractRef: useRef<HTMLDivElement>(null),
        PreviewDateRef: useRef<HTMLDivElement>(null),
        PreviewNumberContractRef: useRef<HTMLDivElement>(null),
        PreviewLawRef: useRef<HTMLDivElement>(null),
        PreviewAddRef: useRef<HTMLDivElement>(null)
    }


    function handleInputChangePosition(inputId: keyof typeof inputRefs, e: any, previewRefName: keyof typeof previewRefs) {
        const inputElement = inputRefs[inputId].current;
        const previewContainerRef = previewRefs[previewRefName].current;

        if (previewContainerRef && inputElement) {
            previewContainerRef.scrollIntoView({ behavior: "smooth", block: "center" });

            // Ngăn chặn sự kiện cuộn được lan truyền lên phần tử cha
            // e.preventDefault();
        }
    }



    return (
        <div className='mt-2 overflow-hidden'>
            <div className='flex justify-between'>
                {/* edit form */}
                <div className="p-4 w-[50%] h-[772px]">
                    <ScrollArea className="h-[772px] rounded-md border w-[100%]">
                        <form className='max-w-[100%] border shadow-2xl p-16 text-sm w-[100%]'>
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
                                            <div className="flex justify-center items-center" ref={inputRefs.date} >
                                                <Input type="text" name="" className="ml-2 mt-2 border-b w-24" onBlur={(e) => { handleChangeCity(e), handleInputChangePosition("date", e, 'PreviewDateRef') }}></Input>
                                                &nbsp; <span className='text-nowrap'>Ngày hợp đồng</span>&nbsp;
                                                <CalendarPicker onDateChange={(e) => { handleDates(e); handleInputChangePosition("date", e, 'PreviewDateRef') }} selectedDate={date} />
                                            </div>

                                        </h5>
                                        <h5 className="my-3 flex items-center justify-center " ref={inputRefs.titleContract}>
                                            <Textarea name="" id="" placeholder='Nhập tiêu đề' className=' w-[70%] h-5' onBlur={(e) => { handleChangeTitleContract(e); handleInputChangePosition("titleContract", e, 'PreviewTitleContractRef') }} ></Textarea>
                                        </h5>

                                        <div className="flex items-center justify-center font-bold flex-wrap" ref={inputRefs.numberContract}>
                                            <div className='pt-2'>Số:</div>
                                            <Input type="text" placeholder='Nhập số hợp đồng' name="" id="contractNumber" className="w-50 ml-3 mr-3 font-bold border " onBlur={(e) => { handleChangeNumberContract(e), handleInputChangePosition("numberContract", e, 'PreviewNumberContractRef') }}></Input>
                                            <div className='pt-2'>/HD</div>
                                        </div>

                                        <div className="law-title" ref={inputRefs.law}>
                                            <Textarea name="" id="" placeholder='Nhập luật' className=' w-[100%] h-5 mt-2' onBlur={(e) => { handleChangeLaw(e); handleInputChangePosition("law", e, 'PreviewLawRef') }} ></Textarea>
                                        </div>
                                        <div className="">
                                            <div className="my-3">
                                                <div className="font-bold">BÊN NHÀ CUNG CẤP ( sau đây gọi tắt là Nhà cung cấp ):</div>
                                                <div className="">
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Tên doanh nghiệp: </span>
                                                        <Input placeholder='Nhập tên doanh nghiệp' id="supplierName" type="text" className="mt-2 ml-2 " onBlur={(e) => { handleChangeSupplierName(e); handleInputChangePosition("supplierName", e, 'PreviewSupplierNameRef') }} ref={inputRefs.supplierName} ></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Số CCCD: </span>
                                                        <Input placeholder='Nhập CCCD' id="citizenIdentificationSupplier" type="text" className="mt-2 ml-2 " onBlur={(e) => { handleChangeSupplierCitizenID(e); handleInputChangePosition("supplierCitizenID", e, 'PreviewSupplierCitizenIDRef') }} ref={inputRefs.supplierCitizenID}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Người đại diện:</span>
                                                        <Input placeholder='Nhập tên người đại diện' id="supplierRepresentative" type="text" className="mt-2 ml-2 " onBlur={(e) => { handleChangeSupplierSurrogate(e); handleInputChangePosition("supplierSurrogate", e, 'PreviewSupplierSurrogateRef') }} ref={inputRefs.supplierSurrogate}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Địa chỉ cơ quan:</span>
                                                        <Input placeholder='Nhập địa chỉ cơ quan' id="supplierAddress" type="text" className="mt-2 ml-2 " onBlur={(e) => { handleChangeSupplierAddress(e); handleInputChangePosition("supplierAddress", e, 'PreviewSupplierAddressRef') }} ref={inputRefs.supplierAddress}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Điện thoại:</span>
                                                        <Input placeholder='Nhập số điện thoại' id="supplierPhone" type="number" className="mr-2 mt-2 ml-2 " onBlur={(e) => { handleChangeSupplierPhoneNumber(e); handleInputChangePosition("supplierPhoneNumber", e, 'PreviewSupplierPhoneNumberRef') }} ref={inputRefs.supplierPhoneNumber}></Input>
                                                        <span className="text-nowrap pt-2"> Fax:</span>
                                                        <Input placeholder='Nhập số Fax' id="supplierFax" type="number" className="mt-2 ml-2 " onBlur={(e) => { handleChangeSupplierFax(e); handleInputChangePosition("supplierFax", e, 'PreviewSupplierFaxRef') }} ref={inputRefs.supplierFax}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Số tài khoản:</span>
                                                        <Input placeholder='Nhập số tài khoản' id="supplierAccountNumber" type="number" className="mr-2 mt-2 ml-2 " onBlur={(e) => { handleChangeSupplierAccountNumber(e); handleInputChangePosition("supplierAccountNumber", e, 'PreviewSupplierAccountNumberRef') }} ref={inputRefs.supplierAccountNumber}></Input>
                                                        <span className="text-nowrap pt-2"> tại Kho bạc:</span>
                                                        <Input placeholder='Nhập địa chỉ Kho Bạc' id="treasurySupplier" type="text" className="mt-2 mr-2 ml-2 " onBlur={(e) => { handleChangeSupplierTreasury(e); handleInputChangePosition("supplierTreasury", e, 'PreviewSupplierTreasuryRef') }} ref={inputRefs.supplierTreasury}></Input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <div className="font-bold">BÊN THUÊ DỊCH VỤ ( sau đây gọi tắt khách hàng ):</div>
                                                <div className="">
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Tên doanh nghiệp: </span>
                                                        <Input placeholder='Nhập tên doanh nghiệp' id="supplierName" type="text" className="mt-2 ml-2 border-2" onBlur={(e) => { handleChangeCustomerName(e); handleInputChangePosition("customerName", e, 'PreviewCustomerNameRef') }} ref={inputRefs.customerName}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2">- Số CCCD: </span>
                                                        <Input placeholder='Nhập CCCD' id="citizenIdentificationSupplier" type="text" className="mt-2 ml-2 " onBlur={(e) => { handleChangeCustomerCitizenID(e); handleInputChangePosition("customerCitizenID", e, 'PreviewCustomerCitizenIDRef') }} ref={inputRefs.customerCitizenID}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Người đại diện:</span>
                                                        <Input placeholder='Nhập tên người đại diện' id="supplierRepresentative" type="text" className="mt-2 ml-2 " onBlur={(e) => { handleChangeCustomerSurrogate(e); handleInputChangePosition("customerSurrogate", e, 'PreviewCustomerSurrogateRef') }} ref={inputRefs.customerSurrogate}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Địa chỉ cơ quan:</span>
                                                        <Input placeholder='Nhập địa chỉ cơ quan' id="supplierAddress" type="text" className="mt-2 ml-2 " onBlur={(e) => { handleChangeCustomerAddress(e); handleInputChangePosition("customerAddress", e, 'PreviewCustomerAddressRef') }} ref={inputRefs.customerAddress}></Input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-nowrap pt-2"> - Điện thoại:</span>
                                                        <Input placeholder='Nhập số điện thoại' id="supplierPhone" type="number" className="mr-2 mt-2 ml-2 " onBlur={(e) => { handleChangeCustomerPhoneNumber(e); handleInputChangePosition("customerPhoneNumber", e, 'PreviewCustomerPhoneNumberRef') }} ref={inputRefs.customerPhoneNumber}></Input>
                                                        <span className="text-nowrap pt-2"> Số tài khoản</span>
                                                        <Input placeholder='Nhập số tài khoản' id="supplierFax" type="number" className="mt-2 ml-2 " onBlur={(e) => { handleChangeCustomerAccountNumber(e); handleInputChangePosition("customerAccountNumber", e, 'PreviewCustomerAccountNumberRef') }} ref={inputRefs.customerAccountNumber}></Input>
                                                    </div>

                                                </div>


                                            </div>
                                            <div className="flex items-center my-2">
                                                <span className="text-nowrap pt-2">Thỏa thuận cung cấp này Thỏa thuận được ký kết vào
                                                    ngày</span>
                                                <Input id="startedAt" type="date" className="mt-2 ml-2 " onBlur={(e) => { handleChangSigningDate(e), handleInputChangePosition("signingDate", e, 'PreviewSigningDateRef') }} ref={inputRefs.signingDate}></Input>

                                            </div>
                                            <div className="flex items-center my-2">
                                                <span className="text-nowrap pt-2"> Ngày có hiệu lực, Và được kết thúc
                                                    vào ngày
                                                </span>
                                                <Input id="endedAt" type="date" className="mt-2 ml-2 " onBlur={(e) => { handleChangeEndDate(e), handleInputChangePosition("endDate", e, 'PreviewEndDateRef') }} ref={inputRefs.endDate}></Input>

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
                                            <div>
                                                {inputs.map((input, index) => (
                                                    <div key={index} className='mt-3' >
                                                        {/* CBB */}
                                                        {/* open={open} onOpenChange={setOpen} */}
                                                        <span className='font-bold'> {index + 1} . </span>
                                                        <Popover >
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    aria-expanded={open}
                                                                    className="w-[200px] justify-between"
                                                                // disabled={disabledValues[index] ? true : false}
                                                                >
                                                                    {values.length > 0 ?
                                                                        frameworks.find(framework => framework.value === values[index].value)?.label || inputValue || "Select framework..."
                                                                        : "Select framework..."}
                                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search framework..." className="h-9" onBlur={(e) => setInputvalue(e.target.value)} />
                                                                    <CommandEmpty>
                                                                        {/*  */}
                                                                        <Button type="button" className='w-[80%]' onClick={(e) => { handleComboboxChange(index, inputValue) }}>
                                                                            Thêm mới
                                                                        </Button>
                                                                    </CommandEmpty>
                                                                    <CommandList>
                                                                        <CommandGroup>
                                                                            {frameworks.map((framework) => (
                                                                                <CommandItem className='cursor-pointer' style={{ pointerEvents: 'auto' }}
                                                                                    key={framework.value}
                                                                                    value={framework.value}
                                                                                    onSelect={(currentValue) => {
                                                                                        // setValue(currentValue === value ? "" : currentValue)
                                                                                        // setOpen(false)
                                                                                        handleComboboxChange(index, currentValue)
                                                                                    }}
                                                                                >
                                                                                    {framework.label}
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            values.toString() === framework.value ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        {/* ttx */}
                                                        {index === inputs.length - 1 && (
                                                            <span ref={inputRefs.add}>
                                                                <Button type="button" className='ml-2 ' onClick={(e) => { addInput() }} >
                                                                    Add
                                                                </Button>
                                                            </span>
                                                        )}
                                                        {/* Nếu là input cuối cùng thì hiển thị nút thêm mới */}
                                                        <Textarea name="" id="" placeholder='Nhập nội dung điều khoản' className=' mt-3' defaultValue={input.value}
                                                            onBlur={(e) => { handleInputChange(index, e.target.value); handleInputChangePosition("add", e, 'PreviewAddRef') }}
                                                        ></Textarea>

                                                    </div>
                                                ))}

                                            </div>
                                            <div className="grid grid-cols-2 text-center mt-3">
                                                <div className="mr-10">
                                                    <b className="">BÊN MUA</b>
                                                    <div className='mb-2'><i>(Chữ ký, họ tên)</i></div>
                                                    <span ref={inputRefs.supplierSignature}> <Textarea name="" id="" className=' h-[130px]' onBlur={(e) => { handleChangeSupplierSignature(e), handleInputChangePosition("supplierSignature", e, 'PreviewSupplierSignatureRef') }} ></Textarea></span>
                                                </div>
                                                <div className="">
                                                    <b className="">BÊN BÁN</b>
                                                    <div className='mb-2'><i>(Chữ ký, họ tên)</i></div>
                                                    <span ref={inputRefs.customerSignature}> <Textarea name="" id="" className=' h-[130px]' onBlur={async (e) => { handleChangeCustomerSignature(e), handleInputChangePosition("customerSignature", e, 'PreviewCustomerSignatureRef') }} ></Textarea></span>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </ScrollArea>
                </div>

                {/* Preview form  */}
                <div className="p-4 w-[50%]">
                    <ScrollArea className="h-[772px] rounded-md border w-[100%]">
                        <form className='max-w-[100%] border shadow-2xl p-16 text-sm w-[100%]'>
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
                                            <div className="flex justify-center items-center" ref={previewRefs.PreviewDateRef}>
                                                {city}
                                                &nbsp;, ngày&nbsp;
                                                {date && <span>{extractDatePart(convertToDateVN(date.toString()), 'day')}</span>}
                                                &nbsp;tháng&nbsp;
                                                {date && <span>{extractDatePart(convertToDateVN(date.toString()), 'month')}</span>}
                                                &nbsp;năm&nbsp;
                                                {date && <span>{extractDatePart(convertToDateVN(date.toString()), 'year')}</span>}
                                            </div>
                                        </h5>
                                        <h5 className="font-bold my-3 text-center uppercase text-lg" ref={previewRefs.PreviewTitleContractRef}>
                                            {titleContract}
                                        </h5>

                                        <div className="items-center justify-center text-center font-bold" ref={previewRefs.PreviewNumberContractRef}>
                                            Số:&nbsp;
                                            {numberContract}
                                            /HĐ
                                        </div>

                                        <div className="law-title" ref={previewRefs.PreviewLawRef}>
                                            {law}
                                        </div>
                                        <div className="wrapper-content">
                                            <div className="contentA  my-3">
                                                <div className="font-bold">BÊN NHÀ CUNG CẤP ( sau đây gọi tắt là Nhà cung cấp ):</div>
                                                <div className="information-A">
                                                    <div className="flex items-cente mt-2">
                                                        <span ref={previewRefs.PreviewSupplierNameRef}>- Tên doanh nghiệp:&nbsp;</span>
                                                        {supplierName}
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <span ref={previewRefs.PreviewSupplierCitizenIDRef}>- Số CCCD:&nbsp;</span>
                                                        {supplierCitizenID}
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <span ref={previewRefs.PreviewSupplierSurrogateRef}> - Người đại diện:&nbsp;</span>
                                                        {supplierSurrogate}
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <span ref={previewRefs.PreviewSupplierAddressRef}> - Địa chỉ cơ quan:&nbsp;</span>
                                                        {supplierAddress}
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2" >
                                                        <span ref={previewRefs.PreviewSupplierPhoneNumberRef}> - Điện thoại:&nbsp;      {supplierPhoneNumber}
                                                        </span>
                                                        <span ref={previewRefs.PreviewSupplierFaxRef}> Fax:&nbsp;          {supplierFax}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span ref={previewRefs.PreviewSupplierAccountNumberRef}> - Số tài khoản:&nbsp;  {supplierAccountNumber}
                                                        </span>
                                                        <span ref={previewRefs.PreviewSupplierTreasuryRef}> tại Kho bạc:&nbsp;     {supplierTreasury}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="contentB  my-3">
                                                <div className="font-bold">BÊN THUÊ DỊCH VỤ ( sau đây gọi tắt khách hàng ):</div>
                                                <div className="information-A">
                                                    <div className="mt-2 text-wrap" >
                                                        <span ref={previewRefs.PreviewCustomerNameRef}>- Tên doanh nghiệp:&nbsp;{customerName}</span>

                                                    </div>
                                                    <div className="mt-2 text-wrap">
                                                        <span ref={previewRefs.PreviewCustomerCitizenIDRef}>- Số CCCD:&nbsp; </span>                           {customerCitizenID}


                                                    </div>
                                                    <div className="mt-2 text-wrap">
                                                        <span ref={previewRefs.PreviewCustomerSurrogateRef}> - Người đại diện:&nbsp;</span>            {customerSurrogate}
                                                    </div>
                                                    <div className="mt-2 text-wrap">
                                                        <span ref={previewRefs.PreviewCustomerAddressRef}> - Địa chỉ cơ quan:&nbsp;</span>                  {customerAddress}

                                                    </div>
                                                    <div className="flex justify-between mt-2">
                                                        <span ref={previewRefs.PreviewCustomerPhoneNumberRef}> - Điện thoại:&nbsp;      {customerPhoneNumber}
                                                        </span>
                                                        <span ref={previewRefs.PreviewCustomerAccountNumberRef}> Số tài khoản:&nbsp;       {customerAccountNumber}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-2">
                                                <span ref={previewRefs.PreviewSigningDateRef}>Thỏa thuận cung cấp này Thỏa thuận được ký kết vào
                                                    ngày&nbsp;
                                                    {formatDate(signingDate)}</span>
                                            </div>
                                            <div className="my-2">
                                                <span ref={previewRefs.PreviewEndDateRef}> Ngày có hiệu lực, Và được kết thúc
                                                    vào ngày&nbsp;    {formatDate(endDate)}
                                                </span>
                                            </div>

                                            <div className="my-2">
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
                                                    {renderContent(values, inputs, previewRefs)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className='grid grid-cols-2 text-center mt-3'>
                                                    <div>
                                                        <b>BÊN MUA</b>
                                                        <div><i>(Chữ ký, họ tên)</i></div>
                                                        <div className='text-center' ref={previewRefs.PreviewSupplierSignatureRef}>{supplierSignature}</div>
                                                    </div>
                                                    <div>
                                                        <b>BÊN BÁN</b>
                                                        <div><i>(Chữ ký, họ tên)</i></div>
                                                        <div className='text-center' ref={previewRefs.PreviewCustomerSignatureRef}>{customerSignature}</div>
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

const formatDate = (inputDate: any) => {
    const parts = inputDate.split('-'); // Tách chuỗi thành các phần riêng biệt
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
}
const getDate = (inputDate: any) => {
    const parts = inputDate.split('-'); // Tách chuỗi thành các phần riêng biệt
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
}



const convertToDateVN = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Ngày không hợp lệ';
    }
    const formattedDate = format(date, 'dd-MM-yyyy');

    return formattedDate;
}

const extractDatePart = (dateString: string, part: 'day' | 'month' | 'year'): number => {
    const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
    switch (part) {
        case 'day':
            return parsedDate.getDate();
        case 'month':
            return parsedDate.getMonth() + 1;
        case 'year':
            return parsedDate.getFullYear();
        default:
            throw new Error('Tham số không hợp lệ');
    }
}

const renderContent = (values: any, inputs: any, previewRefs: any) => {
    const renderArray = [];
    for (let i = 0; i < Math.max(values.length, inputs.length); i++) {
        if (i < values.length) {
            renderArray.push(
                <div key={`value-${i}`} ref={previewRefs.PreviewAddRef}>
                    <div className='font-bold'>{i + 1}. {values[i].value}</div>
                </div>
            );
        }

        if (i < inputs.length) {
            renderArray.push(
                <div key={`input-${i}`} ref={previewRefs.PreviewAddRef}>
                    <div>{inputs[i].value}</div>
                </div>
            );
        }
    }
    return renderArray;
}