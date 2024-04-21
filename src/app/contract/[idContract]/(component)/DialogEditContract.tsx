"use client";
import React from "react";
import { State } from "../state";
import { FunctionHandle } from "../func";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    FileSliders,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarPicker } from "@/components/ui/calendar-picker";
import { useContractContext } from "@/context/ContractProvider";

export default function DialogEditContract() {
    const { inputRefs, previewRefs } = State()
    const { contractAttribute, setContractAttribute }: any = useContractContext();
    const {
        formatDate,
        getDate,
        convertToDateVN,
        extractDatePart,
        renderContent,
        handleInputChangePosition
    } = FunctionHandle();

    const handleChangInput = (key: any, event: any) => {
        setContractAttribute({ ...contractAttribute, [key]: event.target.value });
    };
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="text-white text-sm bg-gray-500 hover:bg-gray-500/90 dark:text-white outline-none border-none py-2 px-2 border rounded-md shadow">
                        <FileSliders
                            size={17}
                            strokeWidth={2.5}
                            className="mr-1"
                        />
                        Request edit permission
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full h-[95%] max-w-[98%]">
                    {/* dau x  */}
                    <div className="">
                        <AlertDialogCancel className="border-none w-[40px] p-0 hover:bg-white text-gray-500 absolute right-1 top-0">
                            <X />
                        </AlertDialogCancel>
                    </div>
                    <div className="overflow-hidden">
                        <div className="flex justify-between h-[100%]">
                            {/* edit form dialog*/}
                            <div className="px-4 w-[50%]">
                                <ScrollArea className="h-[100%] rounded-md border w-[100%]">
                                    <form className="max-w-[100%] border shadow-2xl p-16 text-sm w-[100%]">
                                        <div id="main">
                                            <div id="application">
                                                <div className="">
                                                    <h5 className="text-center">
                                                        <b>
                                                            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM 2
                                                        </b>
                                                        <div>
                                                            <b>Độc lập - Tự do - Hạnh phúc</b>
                                                        </div>
                                                        <div>-------------------------------</div>
                                                        <div
                                                            className="flex justify-center items-center"
                                                            ref={inputRefs.date}
                                                        >
                                                            <Input
                                                                type="text"
                                                                name=""
                                                                className="ml-2 mt-2 border-b w-24"
                                                                onBlur={(e) => {
                                                                    handleChangInput('city', e),
                                                                        handleInputChangePosition(
                                                                            "date",
                                                                            e,
                                                                            "PreviewDateRef"
                                                                        );
                                                                }}
                                                            ></Input>
                                                            &nbsp;{" "}
                                                            <span className="text-nowrap">
                                                                Ngày hợp đồng
                                                            </span>
                                                            &nbsp;
                                                            <CalendarPicker
                                                                onDateChange={(e) => {
                                                                    handleChangInput('date', e);
                                                                    handleInputChangePosition(
                                                                        "date",
                                                                        e,
                                                                        "PreviewDateRef"
                                                                    );
                                                                }}
                                                                selectedDate={contractAttribute.date}
                                                            />
                                                        </div>
                                                    </h5>
                                                    <h5
                                                        className="my-3 flex items-center justify-center "
                                                        ref={inputRefs.titleContract}
                                                    >
                                                        <Textarea
                                                            name=""
                                                            id=""
                                                            placeholder="Nhập tiêu đề"
                                                            className=" w-[70%] h-5"
                                                            onBlur={(e) => {
                                                                handleChangInput('titleContract', e);
                                                                handleInputChangePosition(
                                                                    "titleContract",
                                                                    e,
                                                                    "PreviewTitleContractRef"
                                                                );
                                                            }}
                                                        ></Textarea>
                                                    </h5>

                                                    <div
                                                        className="flex items-center justify-center font-bold flex-wrap"
                                                        ref={inputRefs.numberContract}
                                                    >
                                                        <div className="pt-2">Số:</div>
                                                        <Input
                                                            type="text"
                                                            placeholder="Nhập số hợp đồng"
                                                            name=""
                                                            id="contractNumber"
                                                            className="w-50 ml-3 mr-3 font-bold border "
                                                            onBlur={(e) => {
                                                                handleChangInput('numberContract', e),
                                                                    handleInputChangePosition(
                                                                        "numberContract",
                                                                        e,
                                                                        "PreviewNumberContractRef"
                                                                    );
                                                            }}
                                                        ></Input>
                                                        <div className="pt-2">/HD</div>
                                                    </div>

                                                    <div
                                                        className="law-title"
                                                        ref={inputRefs.law}
                                                    >
                                                        <Textarea
                                                            name=""
                                                            id=""
                                                            placeholder="Nhập luật"
                                                            className=" w-[100%] h-5 mt-2"
                                                            onBlur={(e) => {
                                                                handleChangInput('law', e)
                                                                handleInputChangePosition(
                                                                    "law",
                                                                    e,
                                                                    "PreviewLawRef"
                                                                );
                                                            }}
                                                        ></Textarea>
                                                    </div>
                                                    <div className="">
                                                        <div className="my-3">
                                                            <div className="font-bold">
                                                                BÊN NHÀ CUNG CẤP ( sau đây gọi tắt là
                                                                Nhà cung cấp ):
                                                            </div>
                                                            <div className="">
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        - Tên doanh nghiệp:{" "}
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập tên doanh nghiệp"
                                                                        id="supplierName"
                                                                        type="text"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierName', e)
                                                                            handleInputChangePosition(
                                                                                "supplierName",
                                                                                e,
                                                                                "PreviewSupplierNameRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.supplierName}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        - Số CCCD:{" "}
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập CCCD"
                                                                        id="citizenIdentificationSupplier"
                                                                        type="text"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierCitizenID', e);
                                                                            handleInputChangePosition(
                                                                                "supplierCitizenID",
                                                                                e,
                                                                                "PreviewSupplierCitizenIDRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.supplierCitizenID}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        - Người đại diện:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập tên người đại diện"
                                                                        id="supplierRepresentative"
                                                                        type="text"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierSurrogate',
                                                                                e
                                                                            );
                                                                            handleInputChangePosition(
                                                                                "supplierSurrogate",
                                                                                e,
                                                                                "PreviewSupplierSurrogateRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.supplierSurrogate}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        - Địa chỉ cơ quan:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập địa chỉ cơ quan"
                                                                        id="supplierAddress"
                                                                        type="text"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierAddress', e);
                                                                            handleInputChangePosition(
                                                                                "supplierAddress",
                                                                                e,
                                                                                "PreviewSupplierAddressRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.supplierAddress}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        - Điện thoại:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập số điện thoại"
                                                                        id="supplierPhone"
                                                                        type="number"
                                                                        className="mr-2 mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierPhoneNumber',
                                                                                e
                                                                            );
                                                                            handleInputChangePosition(
                                                                                "supplierPhoneNumber",
                                                                                e,
                                                                                "PreviewSupplierPhoneNumberRef"
                                                                            );
                                                                        }}
                                                                        ref={
                                                                            inputRefs.supplierPhoneNumber
                                                                        }
                                                                    ></Input>
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        Fax:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập số Fax"
                                                                        id="supplierFax"
                                                                        type="number"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierFax', e);
                                                                            handleInputChangePosition(
                                                                                "supplierFax",
                                                                                e,
                                                                                "PreviewSupplierFaxRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.supplierFax}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        - Số tài khoản:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập số tài khoản"
                                                                        id="supplierAccountNumber"
                                                                        type="number"
                                                                        className="mr-2 mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierAccountNumber',
                                                                                e
                                                                            );
                                                                            handleInputChangePosition(
                                                                                "supplierAccountNumber",
                                                                                e,
                                                                                "PreviewSupplierAccountNumberRef"
                                                                            );
                                                                        }}
                                                                        ref={
                                                                            inputRefs.supplierAccountNumber
                                                                        }
                                                                    ></Input>
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        tại Kho bạc:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập địa chỉ Kho Bạc"
                                                                        id="treasurySupplier"
                                                                        type="text"
                                                                        className="mt-2 mr-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierTreasury', e);
                                                                            handleInputChangePosition(
                                                                                "supplierTreasury",
                                                                                e,
                                                                                "PreviewSupplierTreasuryRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.supplierTreasury}
                                                                    ></Input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-3">
                                                            <div className="font-bold">
                                                                BÊN THUÊ DỊCH VỤ ( sau đây gọi tắt
                                                                khách hàng ):
                                                            </div>
                                                            <div className="">
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        - Tên doanh nghiệp:{" "}
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập tên doanh nghiệp"
                                                                        id="supplierName"
                                                                        type="text"
                                                                        className="mt-2 ml-2 border-2"
                                                                        onBlur={(e) => {
                                                                            handleChangInput('customerName', e);
                                                                            handleInputChangePosition(
                                                                                "customerName",
                                                                                e,
                                                                                "PreviewCustomerNameRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.customerName}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        - Số CCCD:{" "}
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập CCCD"
                                                                        id="citizenIdentificationSupplier"
                                                                        type="text"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('customerCitizenID',
                                                                                e
                                                                            );
                                                                            handleInputChangePosition(
                                                                                "customerCitizenID",
                                                                                e,
                                                                                "PreviewCustomerCitizenIDRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.customerCitizenID}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        - Người đại diện:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập tên người đại diện"
                                                                        id="supplierRepresentative"
                                                                        type="text"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('customerSurrogate',
                                                                                e
                                                                            );
                                                                            handleInputChangePosition(
                                                                                "customerSurrogate",
                                                                                e,
                                                                                "PreviewCustomerSurrogateRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.customerSurrogate}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        - Địa chỉ cơ quan:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập địa chỉ cơ quan"
                                                                        id="supplierAddress"
                                                                        type="text"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('customerAddress', e);
                                                                            handleInputChangePosition(
                                                                                "customerAddress",
                                                                                e,
                                                                                "PreviewCustomerAddressRef"
                                                                            );
                                                                        }}
                                                                        ref={inputRefs.customerAddress}
                                                                    ></Input>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        - Điện thoại:
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập số điện thoại"
                                                                        id="supplierPhone"
                                                                        type="number"
                                                                        className="mr-2 mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('customerPhoneNumber',
                                                                                e
                                                                            );
                                                                            handleInputChangePosition(
                                                                                "customerPhoneNumber",
                                                                                e,
                                                                                "PreviewCustomerPhoneNumberRef"
                                                                            );
                                                                        }}
                                                                        ref={
                                                                            inputRefs.customerPhoneNumber
                                                                        }
                                                                    ></Input>
                                                                    <span className="text-nowrap pt-2">
                                                                        {" "}
                                                                        Số tài khoản
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Nhập số tài khoản"
                                                                        id="supplierFax"
                                                                        type="number"
                                                                        className="mt-2 ml-2 "
                                                                        onBlur={(e) => {
                                                                            handleChangInput('customerAccountNumber',
                                                                                e
                                                                            );
                                                                            handleInputChangePosition(
                                                                                "customerAccountNumber",
                                                                                e,
                                                                                "PreviewCustomerAccountNumberRef"
                                                                            );
                                                                        }}
                                                                        ref={
                                                                            inputRefs.customerAccountNumber
                                                                        }
                                                                    ></Input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center my-2">
                                                            <span className="text-nowrap pt-2">
                                                                Thỏa thuận cung cấp này Thỏa thuận
                                                                được ký kết vào ngày
                                                            </span>
                                                            <Input
                                                                id="startedAt"
                                                                type="date"
                                                                className="mt-2 ml-2 "
                                                                onBlur={(e) => {
                                                                    handleChangInput('signingDate', e),
                                                                        handleInputChangePosition(
                                                                            "signingDate",
                                                                            e,
                                                                            "PreviewSigningDateRef"
                                                                        );
                                                                }}
                                                                ref={inputRefs.signingDate}
                                                            ></Input>
                                                        </div>
                                                        <div className="flex items-center my-2">
                                                            <span className="text-nowrap pt-2">
                                                                {" "}
                                                                Ngày có hiệu lực, Và được kết thúc vào
                                                                ngày
                                                            </span>
                                                            <Input
                                                                id="endedAt"
                                                                type="date"
                                                                className="mt-2 ml-2 "
                                                                onBlur={(e) => {
                                                                    handleChangInput('endDate', e),
                                                                        handleInputChangePosition(
                                                                            "endDate",
                                                                            e,
                                                                            "PreviewEndDateRef"
                                                                        );
                                                                }}
                                                                ref={inputRefs.endDate}
                                                            ></Input>
                                                        </div>

                                                        <div className="flex items-center my-2">
                                                            <div className="text-nowrap">
                                                                {" "}
                                                                Hai bên thống nhất ký kết hợp đồng với
                                                                các nội dung sau đây:
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="my-2">
                                                            <b>CÁC ĐIỀU KHOẢN CHÍNH</b>
                                                        </div>
                                                        <div>
                                                            {/* CBB */}
                                                        </div>
                                                        <div className="grid grid-cols-2 text-center mt-3">
                                                            <div className="mr-10">
                                                                <b className="">BÊN MUA</b>
                                                                <div className="mb-2">
                                                                    <i>(Chữ ký, họ tên)</i>
                                                                </div>
                                                                <span
                                                                    ref={inputRefs.supplierSignature}
                                                                >
                                                                    {" "}
                                                                    <Textarea
                                                                        name=""
                                                                        id=""
                                                                        className=" h-[130px]"
                                                                        onBlur={(e) => {
                                                                            handleChangInput('supplierSignature',
                                                                                e
                                                                            ),
                                                                                handleInputChangePosition(
                                                                                    "supplierSignature",
                                                                                    e,
                                                                                    "PreviewSupplierSignatureRef"
                                                                                );
                                                                        }}
                                                                    ></Textarea>
                                                                </span>
                                                            </div>
                                                            <div className="">
                                                                <b className="">BÊN BÁN</b>
                                                                <div className="mb-2">
                                                                    <i>(Chữ ký, họ tên)</i>
                                                                </div>
                                                                <span
                                                                    ref={inputRefs.customerSignature}
                                                                >
                                                                    {" "}
                                                                    <Textarea
                                                                        name=""
                                                                        id=""
                                                                        className=" h-[130px]"
                                                                        onBlur={async (e) => {
                                                                            handleChangInput('customerSignature',
                                                                                e
                                                                            ),
                                                                                handleInputChangePosition(
                                                                                    "customerSignature",
                                                                                    e,
                                                                                    "PreviewCustomerSignatureRef"
                                                                                );
                                                                        }}
                                                                    ></Textarea>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="w-full h-[100px]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </ScrollArea>
                            </div>

                            {/* Preview form  */}
                            <div className="px-4 w-[50%]">
                                <ScrollArea className="h-[100%] rounded-md border w-[100%]">
                                    <form className="max-w-[100%] border shadow-2xl p-16 text-sm w-[100%]">
                                        <div id="main">
                                            <div id="application">
                                                <div className="introduce">
                                                    <h5 className="title text-center">
                                                        <b>
                                                            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM 3
                                                        </b>
                                                        <div>
                                                            <b>Độc lập - Tự do - Hạnh phúc</b>
                                                        </div>
                                                        <div>-------------------------------</div>
                                                        <div
                                                            className="flex justify-center items-center"
                                                            ref={previewRefs.PreviewDateRef}
                                                        >
                                                            {contractAttribute.city}
                                                            &nbsp;, ngày&nbsp;
                                                            {contractAttribute.date && (
                                                                <span>
                                                                    {extractDatePart(
                                                                        convertToDateVN(contractAttribute.date.toString()),
                                                                        "day"
                                                                    )}
                                                                </span>
                                                            )}
                                                            &nbsp;tháng&nbsp;
                                                            {contractAttribute.date && (
                                                                <span>
                                                                    {extractDatePart(
                                                                        convertToDateVN(contractAttribute.date.toString()),
                                                                        "month"
                                                                    )}
                                                                </span>
                                                            )}
                                                            &nbsp;năm&nbsp;
                                                            {contractAttribute.date && (
                                                                <span>
                                                                    {extractDatePart(
                                                                        convertToDateVN(contractAttribute.date.toString()),
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
                                                        {contractAttribute.titleContract}
                                                    </h5>

                                                    <div
                                                        className="items-center justify-center text-center font-bold"
                                                        ref={previewRefs.PreviewNumberContractRef}
                                                    >
                                                        Số:&nbsp;
                                                        {contractAttribute.numberContract}
                                                        /HĐ
                                                    </div>

                                                    <div
                                                        className="law-title"
                                                        ref={previewRefs.PreviewLawRef}
                                                    >
                                                        {contractAttribute.law}
                                                    </div>
                                                    <div className="wrapper-content">
                                                        <div className="contentA  my-3">
                                                            <div className="font-bold">
                                                                BÊN NHÀ CUNG CẤP ( sau đây gọi tắt là
                                                                Nhà cung cấp ):
                                                            </div>
                                                            <div className="information-A">
                                                                <div className="flex items-cente mt-2">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierNameRef
                                                                        }
                                                                    >
                                                                        - Tên doanh nghiệp:&nbsp;
                                                                    </span>
                                                                    {contractAttribute.supplierName}
                                                                </div>
                                                                <div className="flex items-center mt-2">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierCitizenIDRef
                                                                        }
                                                                    >
                                                                        - Số CCCD:&nbsp;
                                                                    </span>
                                                                    {contractAttribute.supplierCitizenID}
                                                                </div>
                                                                <div className="flex items-center mt-2">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierSurrogateRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        - Người đại diện:&nbsp;
                                                                    </span>
                                                                    {contractAttribute.supplierSurrogate}
                                                                </div>
                                                                <div className="flex items-center mt-2">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierAddressRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        - Địa chỉ cơ quan:&nbsp;
                                                                    </span>
                                                                    {contractAttribute.supplierAddress}
                                                                </div>
                                                                <div className="flex justify-between items-center mt-2">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierPhoneNumberRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        - Điện thoại:&nbsp;{" "}
                                                                        {contractAttribute.supplierPhoneNumber}
                                                                    </span>
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierFaxRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        Fax:&nbsp; {contractAttribute.supplierFax}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between items-center mt-2">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierAccountNumberRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        - Số tài khoản:&nbsp;{" "}
                                                                        {contractAttribute.supplierAccountNumber}
                                                                    </span>
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewSupplierTreasuryRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        tại Kho bạc:&nbsp;{" "}
                                                                        {contractAttribute.supplierTreasury}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="contentB  my-3">
                                                            <div className="font-bold">
                                                                BÊN THUÊ DỊCH VỤ ( sau đây gọi tắt
                                                                khách hàng ):
                                                            </div>
                                                            <div className="information-A">
                                                                <div className="mt-2 text-wrap">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewCustomerNameRef
                                                                        }
                                                                    >
                                                                        - Tên doanh nghiệp:&nbsp;
                                                                        {contractAttribute.customerName}
                                                                    </span>
                                                                </div>
                                                                <div className="mt-2 text-wrap">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewCustomerCitizenIDRef
                                                                        }
                                                                    >
                                                                        - Số CCCD:&nbsp;{" "}
                                                                    </span>{" "}
                                                                    {contractAttribute.customerCitizenID}
                                                                </div>
                                                                <div className="mt-2 text-wrap">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewCustomerSurrogateRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        - Người đại diện:&nbsp;
                                                                    </span>{" "}
                                                                    {contractAttribute.customerSurrogate}
                                                                </div>
                                                                <div className="mt-2 text-wrap">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewCustomerAddressRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        - Địa chỉ cơ quan:&nbsp;
                                                                    </span>{" "}
                                                                    {contractAttribute.customerAddress}
                                                                </div>
                                                                <div className="flex justify-between mt-2">
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewCustomerPhoneNumberRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        - Điện thoại:&nbsp;{" "}
                                                                        {contractAttribute.customerPhoneNumber}
                                                                    </span>
                                                                    <span
                                                                        ref={
                                                                            previewRefs.PreviewCustomerAccountNumberRef
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        Số tài khoản:&nbsp;{" "}
                                                                        {contractAttribute.customerAccountNumber}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-2">
                                                            <span
                                                                ref={
                                                                    previewRefs.PreviewSigningDateRef
                                                                }
                                                            >
                                                                Thỏa thuận cung cấp này Thỏa thuận
                                                                được ký kết vào ngày&nbsp;
                                                                {formatDate(contractAttribute.signingDate)}
                                                            </span>
                                                        </div>
                                                        <div className="my-2">
                                                            <span
                                                                ref={previewRefs.PreviewEndDateRef}
                                                            >
                                                                {" "}
                                                                Ngày có hiệu lực, Và được kết thúc vào
                                                                ngày&nbsp; {formatDate(contractAttribute.endDate)}
                                                            </span>
                                                        </div>

                                                        <div className="my-2">
                                                            <div>
                                                                {" "}
                                                                Hai bên thống nhất ký kết hợp đồng với
                                                                các nội dung sau đây:
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="my-2">
                                                            <b>CÁC ĐIỀU KHOẢN CHÍNH</b>
                                                        </div>
                                                        <div className="my-2">
                                                            <div>
                                                                {/* {contractAttribute.} */}
                                                            </div>
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
                                                                        ref={
                                                                            previewRefs.PreviewSupplierSignatureRef
                                                                        }
                                                                    >
                                                                        {contractAttribute.supplierSignature}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <b>BÊN BÁN</b>
                                                                    <div>
                                                                        <i>(Chữ ký, họ tên)</i>
                                                                    </div>
                                                                    <div
                                                                        className="text-center"
                                                                        ref={
                                                                            previewRefs.PreviewCustomerSignatureRef
                                                                        }
                                                                    >
                                                                        {contractAttribute.customerSignature}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-full h-[100px]"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="dark:text-white">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="text-white">
                            Accept
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

