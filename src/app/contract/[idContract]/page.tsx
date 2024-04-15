"use client";
import React, { useEffect, useRef, useState } from "react";
import { format, parse } from "date-fns";
import { State } from "./state";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";

import {
  Check,
  FilePen,
  FileSliders,
  MessagesSquare,
  SendHorizontal,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CalendarPicker } from "@/components/ui/calendar-picker";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Page() {
  const [inputValue, setInputvalue] = useState("");
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
  ];
  const {
    city,
    setCity,
    date,
    setDate,
    titleContract,
    setTitleContract,
    numberContract,
    setNumberContract,
    law,
    setLaw,
    signingDate,
    setSigningDate,
    endDate,
    setEndDate,
    content,
    setContent,
    supplierName,
    setSupplierName,
    supplierCitizenID,
    setSupplierCitizenID,
    supplierSurrogate,
    setSupplierSurrogate,
    supplierAddress,
    setSupplierAddress,
    supplierPhoneNumber,
    setSupplierPhoneNumber,
    supplierFax,
    setSupplierFax,
    supplierAccountNumber,
    setSupplierAccountNumber,
    supplierTreasury,
    setSupplierTreasury,
    supplierSignature,
    setSupplierSignature,
    customerName,
    setCustomerName,
    customerCitizenID,
    setCustomerCitizenID,
    customerSurrogate,
    setCustomerSurrogate,
    customerAddress,
    setCustomerAddress,
    customerPhoneNumber,
    setCustomerPhoneNumber,
    customerAccountNumber,
    setCustomerAccountNumber,
    customerSignature,
    setCustomerSignature,
    inputs,
    setInputs,
    open,
    setOpen,
    values,
    setValues,
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
    const newInputs = [...inputs, { value: "" }];
    const newCBB = [...values, { value: "Select framework..." }];
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
    setDate(newDate);
  };

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
    PreviewAddRef: useRef<HTMLDivElement>(null),
  };

  function handleInputChangePosition(
    inputId: keyof typeof inputRefs,
    e: any,
    previewRefName: keyof typeof previewRefs
  ) {
    const inputElement = inputRefs[inputId].current;
    const previewContainerRef = previewRefs[previewRefName].current;

    if (previewContainerRef && inputElement) {
      previewContainerRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Ngăn chặn sự kiện cuộn được lan truyền lên phần tử cha
      // e.preventDefault();
    }
  }

  return (
    <div className="mt-2 overflow-hidden">
      <div className="flex justify-between w-full ">
        {/* edit form */}
        <div className="p-4 h-[772px] md:min-w-[250px]">
          {/* <div className="mt-4 w-[30%] max-w-[50%]"> */}
          <Card className="rounded-2xl border bg-grey-50 text-card-foreground">
            <div className="flex flex-col p-6 space-y-1">
              <h3 className="font-semibold tracking-tight text-2xl">
                Information
              </h3>
            </div>
            <div className="p-6 pt-0 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">AddressWallet</Label>
                <Input
                  className="flex h-10 w-full border border-input rounded-xl"
                  id="name"
                  placeholder="m@example.com"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Your Party</Label>
                <Input
                  className="flex h-10 w-full border border-input rounded-xl"
                  id="name"
                  placeholder="Your Party"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Contract Status</Label>
                <Input
                  className="flex h-10 w-full border border-input rounded-xl"
                  id="name"
                  placeholder="Contract Status"
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center p-6 pt-0 justify-between space-x-2">
              <Button className="text-sm bg-green-500 hover:bg-green-500/90 dark:text-white outline-none border-none py-2 px-4 border rounded-md shadow flex">
                <Check size={17} strokeWidth={2.5} className="mr-1" />
                Accept
              </Button>
              <Button className=" text-sm bg-gradient-to-r  bg-red-500 hover:bg-red-500/90 dark:text-white outline-none border-none py-2 px-4 border rounded-md shadow flex">
                <X size={17} strokeWidth={2.5} className="mr-1" />
                Refuse the invition
              </Button>
              <Button className="text-sm  bg-orange-500 hover:bg-orange-500/90 dark:text-white outline-none border-none py-2 px-4 border rounded-md shadow flex">
                <MessagesSquare size={17} strokeWidth={2.5} className="mr-1" />
                Chat with parties
              </Button>
            </div>
            <div className="flex items-center p-6 pt-0 mx-8 space-x-2">
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="text-white text-sm bg-gray-500 hover:bg-gray-500/90 dark:text-white outline-none border-none py-2 px-4 border rounded-md shadow">
                      <FileSliders
                        size={17}
                        strokeWidth={2.5}
                        className="mr-1"
                      />
                      Request edit permission
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn có muốn tiếp tục ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className=" dark:text-white">
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div>
                <Button className="text-white text-sm bg-blue-500 hover:bg-blue-500/90 dark:text-white outline-none border-none py-2 px-4 border rounded-md shadow">
                  <FilePen size={17} strokeWidth={2.5} className="mr-1" />
                  Sign a contract
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2"></div>
          </Card>
        </div>

        {/* Preview form  */}
        <div className="p-4 w-[60%]">
          <ScrollArea className="h-[772px] rounded-xl border w-[100%]">
            <form className="max-w-[100%] border shadow-2xl p-16 text-sm w-[100%]">
              <div id="main">
                <div id="application">
                  <div className="introduce">
                    <h5 className="title text-center">
                      <b>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>
                      <div>
                        <b>Độc lập - Tự do - Hạnh phúc</b>
                      </div>
                      <div>-------------------------------</div>
                      <div
                        className="flex justify-center items-center"
                        ref={previewRefs.PreviewDateRef}
                      >
                        {city}
                        &nbsp;, ngày&nbsp;
                        {date && (
                          <span>
                            {extractDatePart(
                              convertToDateVN(date.toString()),
                              "day"
                            )}
                          </span>
                        )}
                        &nbsp;tháng&nbsp;
                        {date && (
                          <span>
                            {extractDatePart(
                              convertToDateVN(date.toString()),
                              "month"
                            )}
                          </span>
                        )}
                        &nbsp;năm&nbsp;
                        {date && (
                          <span>
                            {extractDatePart(
                              convertToDateVN(date.toString()),
                              "year"
                            )}
                          </span>
                        )}
                      </div>
                    </h5>
                    <h5
                      className="font-bold my-3 text-center uppercase text-lg"
                      ref={previewRefs.PreviewTitleContractRef}
                    >
                      {titleContract}
                    </h5>

                    <div
                      className="items-center justify-center text-center font-bold"
                      ref={previewRefs.PreviewNumberContractRef}
                    >
                      Số:&nbsp;
                      {numberContract}
                      /HĐ
                    </div>

                    <div className="law-title" ref={previewRefs.PreviewLawRef}>
                      {law}
                    </div>
                    <div className="wrapper-content">
                      <div className="contentA  my-3">
                        <div className="font-bold">
                          BÊN NHÀ CUNG CẤP ( sau đây gọi tắt là Nhà cung cấp ):
                        </div>
                        <div className="information-A">
                          <div className="flex items-cente mt-2">
                            <span ref={previewRefs.PreviewSupplierNameRef}>
                              - Tên doanh nghiệp:&nbsp;
                            </span>
                            {supplierName}
                          </div>
                          <div className="flex items-center mt-2">
                            <span ref={previewRefs.PreviewSupplierCitizenIDRef}>
                              - Số CCCD:&nbsp;
                            </span>
                            {supplierCitizenID}
                          </div>
                          <div className="flex items-center mt-2">
                            <span ref={previewRefs.PreviewSupplierSurrogateRef}>
                              {" "}
                              - Người đại diện:&nbsp;
                            </span>
                            {supplierSurrogate}
                          </div>
                          <div className="flex items-center mt-2">
                            <span ref={previewRefs.PreviewSupplierAddressRef}>
                              {" "}
                              - Địa chỉ cơ quan:&nbsp;
                            </span>
                            {supplierAddress}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span
                              ref={previewRefs.PreviewSupplierPhoneNumberRef}
                            >
                              {" "}
                              - Điện thoại:&nbsp; {supplierPhoneNumber}
                            </span>
                            <span ref={previewRefs.PreviewSupplierFaxRef}>
                              {" "}
                              Fax:&nbsp; {supplierFax}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span
                              ref={previewRefs.PreviewSupplierAccountNumberRef}
                            >
                              {" "}
                              - Số tài khoản:&nbsp; {supplierAccountNumber}
                            </span>
                            <span ref={previewRefs.PreviewSupplierTreasuryRef}>
                              {" "}
                              tại Kho bạc:&nbsp; {supplierTreasury}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="contentB  my-3">
                        <div className="font-bold">
                          BÊN THUÊ DỊCH VỤ ( sau đây gọi tắt khách hàng ):
                        </div>
                        <div className="information-A">
                          <div className="mt-2 text-wrap">
                            <span ref={previewRefs.PreviewCustomerNameRef}>
                              - Tên doanh nghiệp:&nbsp;{customerName}
                            </span>
                          </div>
                          <div className="mt-2 text-wrap">
                            <span ref={previewRefs.PreviewCustomerCitizenIDRef}>
                              - Số CCCD:&nbsp;{" "}
                            </span>{" "}
                            {customerCitizenID}
                          </div>
                          <div className="mt-2 text-wrap">
                            <span ref={previewRefs.PreviewCustomerSurrogateRef}>
                              {" "}
                              - Người đại diện:&nbsp;
                            </span>{" "}
                            {customerSurrogate}
                          </div>
                          <div className="mt-2 text-wrap">
                            <span ref={previewRefs.PreviewCustomerAddressRef}>
                              {" "}
                              - Địa chỉ cơ quan:&nbsp;
                            </span>{" "}
                            {customerAddress}
                          </div>
                          <div className="flex justify-between mt-2">
                            <span
                              ref={previewRefs.PreviewCustomerPhoneNumberRef}
                            >
                              {" "}
                              - Điện thoại:&nbsp; {customerPhoneNumber}
                            </span>
                            <span
                              ref={previewRefs.PreviewCustomerAccountNumberRef}
                            >
                              {" "}
                              Số tài khoản:&nbsp; {customerAccountNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="my-2">
                        <span ref={previewRefs.PreviewSigningDateRef}>
                          Thỏa thuận cung cấp này Thỏa thuận được ký kết vào
                          ngày&nbsp;
                          {formatDate(signingDate)}
                        </span>
                      </div>
                      <div className="my-2">
                        <span ref={previewRefs.PreviewEndDateRef}>
                          {" "}
                          Ngày có hiệu lực, Và được kết thúc vào ngày&nbsp;{" "}
                          {formatDate(endDate)}
                        </span>
                      </div>

                      <div className="my-2">
                        <div>
                          {" "}
                          Hai bên thống nhất ký kết hợp đồng với các nội dung
                          sau đây:
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="my-2">
                        <b>CÁC ĐIỀU KHOẢN CHÍNH</b>
                      </div>
                      <div className="my-2">
                        <div>{renderContent(values, inputs, previewRefs)}</div>
                      </div>

                      <div>
                        <div className="grid grid-cols-2 text-center mt-3">
                          <div>
                            <b>BÊN MUA</b>
                            <div>
                              <i>(Chữ ký, họ tên)</i>
                            </div>
                            <div
                              className="text-center"
                              ref={previewRefs.PreviewSupplierSignatureRef}
                            >
                              {supplierSignature}
                            </div>
                          </div>
                          <div>
                            <b>BÊN BÁN</b>
                            <div>
                              <i>(Chữ ký, họ tên)</i>
                            </div>
                            <div
                              className="text-center"
                              ref={previewRefs.PreviewCustomerSignatureRef}
                            >
                              {customerSignature}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </ScrollArea>
        </div>
      </div>

      {/* Message */}

      <div className="mt-5 w-[25%] justify-between rounded-2xl border bg-card text-card-foreground shadow-sm">
        <div className="space-y-1.5 p-6 flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                alt=""
              />
            </span>
            <div>
              <p className="text-sm font-medium leading-none">Meta Mask</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          {/* <Button className="inline-flex items-center justify-center text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto rounded-full">
            <p className="text-gray-500">
              <svg
                className="w-[20px] h-[20px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </p>
          </Button> */}
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-3xl px-3 py-2 text-sm bg-muted dark:#303030">
              Hi, how can I help you today?
            </div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-3xl px-3 py-2 text-sm ml-auto bg-orange-400 text-white">
              Hey, I'm having trouble with my account.
            </div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-3xl px-3 py-2 text-sm bg-muted dark:#303030">
              What seems to be the problem?
            </div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-3xl px-3 py-2 text-sm ml-auto bg-orange-400 text-white">
              I can't log in.
            </div>
          </div>
        </div>
        <div className="flex items-center mt-1 mb-2 p-6 pt-0">
          <Input
            className="rounded-xl mr-2 h-10 "
            placeholder="Type your message..."
          ></Input>
          <Button className="bg-orange-500 outline-gray-600 inline-flex items-center justify-center text-sm font-medium border border-input hover:bg-orange-500/90 h-10 w-10 ml-auto rounded-xl">
            <p className="text-xl">
              <SendHorizontal size={15} strokeWidth={2} />
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

const formatDate = (inputDate: any) => {
  const parts = inputDate.split("-"); // Tách chuỗi thành các phần riêng biệt
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${day}/${month}/${year}`;
};
const getDate = (inputDate: any) => {
  const parts = inputDate.split("-"); // Tách chuỗi thành các phần riêng biệt
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${day}/${month}/${year}`;
};

const convertToDateVN = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  }
  const formattedDate = format(date, "dd-MM-yyyy");

  return formattedDate;
};

const extractDatePart = (
  dateString: string,
  part: "day" | "month" | "year"
): number => {
  const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());
  switch (part) {
    case "day":
      return parsedDate.getDate();
    case "month":
      return parsedDate.getMonth() + 1;
    case "year":
      return parsedDate.getFullYear();
    default:
      throw new Error("Tham số không hợp lệ");
  }
};

const renderContent = (values: any, inputs: any, previewRefs: any) => {
  const renderArray = [];
  for (let i = 0; i < Math.max(values.length, inputs.length); i++) {
    if (i < values.length) {
      renderArray.push(
        <div key={`value-${i}`} ref={previewRefs.PreviewAddRef}>
          <div className="font-bold">
            {i + 1}. {values[i].value}
          </div>
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
};
