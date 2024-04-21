"use client";
import React from "react";
import { State } from "../state";
import { FunctionHandle } from "../func";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useContractContext } from "@/context/ContractProvider";
import { ContractState } from "@/app/contract/[idContract]/(component)/(store)/storeContractData";

export default function PreviewContract() {
  const { inputRefs, previewRefs } = State();
  const { contractAttribute, setContractAttribute } = ContractState();
  const {
    formatDate,
    getDate,
    convertToDateVN,
    extractDatePart,
    renderContent,
    handleInputChangePosition,
  } = FunctionHandle();
  return (
    <div>
      <ScrollArea className="h-[772px] rounded-md border w-[100%]">
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

                <div className="law-title" ref={previewRefs.PreviewLawRef}>
                  {contractAttribute.law}
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
                        {contractAttribute.supplierName}
                      </div>
                      <div className="flex items-center mt-2">
                        <span ref={previewRefs.PreviewSupplierCitizenIDRef}>
                          - Số CCCD:&nbsp;
                        </span>
                        {contractAttribute.supplierCitizenID}
                      </div>
                      <div className="flex items-center mt-2">
                        <span ref={previewRefs.PreviewSupplierSurrogateRef}>
                          {" "}
                          - Người đại diện:&nbsp;
                        </span>
                        {contractAttribute.supplierSurrogate}
                      </div>
                      <div className="flex items-center mt-2">
                        <span ref={previewRefs.PreviewSupplierAddressRef}>
                          {" "}
                          - Địa chỉ cơ quan:&nbsp;
                        </span>
                        {contractAttribute.supplierAddress}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span ref={previewRefs.PreviewSupplierPhoneNumberRef}>
                          {" "}
                          - Điện thoại:&nbsp;{" "}
                          {contractAttribute.supplierPhoneNumber}
                        </span>
                        <span ref={previewRefs.PreviewSupplierFaxRef}>
                          {" "}
                          Fax:&nbsp; {contractAttribute.supplierFax}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span ref={previewRefs.PreviewSupplierAccountNumberRef}>
                          {" "}
                          - Số tài khoản:&nbsp;{" "}
                          {contractAttribute.supplierAccountNumber}
                        </span>
                        <span ref={previewRefs.PreviewSupplierTreasuryRef}>
                          {" "}
                          tại Kho bạc:&nbsp;{" "}
                          {contractAttribute.supplierTreasury}
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
                          - Tên doanh nghiệp:&nbsp;
                          {contractAttribute.customerName}
                        </span>
                      </div>
                      <div className="mt-2 text-wrap">
                        <span ref={previewRefs.PreviewCustomerCitizenIDRef}>
                          - Số CCCD:&nbsp;{" "}
                        </span>{" "}
                        {contractAttribute.customerCitizenID}
                      </div>
                      <div className="mt-2 text-wrap">
                        <span ref={previewRefs.PreviewCustomerSurrogateRef}>
                          {" "}
                          - Người đại diện:&nbsp;
                        </span>{" "}
                        {contractAttribute.customerSurrogate}
                      </div>
                      <div className="mt-2 text-wrap">
                        <span ref={previewRefs.PreviewCustomerAddressRef}>
                          {" "}
                          - Địa chỉ cơ quan:&nbsp;
                        </span>{" "}
                        {contractAttribute.customerAddress}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span ref={previewRefs.PreviewCustomerPhoneNumberRef}>
                          {" "}
                          - Điện thoại:&nbsp;{" "}
                          {contractAttribute.customerPhoneNumber}
                        </span>
                        <span ref={previewRefs.PreviewCustomerAccountNumberRef}>
                          {" "}
                          Số tài khoản:&nbsp;{" "}
                          {contractAttribute.customerAccountNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="my-2">
                    <span ref={previewRefs.PreviewSigningDateRef}>
                      Thỏa thuận cung cấp này Thỏa thuận được ký kết vào
                      ngày&nbsp;
                      {formatDate(contractAttribute.signingDate)}
                    </span>
                  </div>
                  <div className="my-2">
                    <span ref={previewRefs.PreviewEndDateRef}>
                      {" "}
                      Ngày có hiệu lực, Và được kết thúc vào ngày&nbsp;{" "}
                      {formatDate(contractAttribute.endDate)}
                    </span>
                  </div>

                  <div className="my-2">
                    <div>
                      {" "}
                      Hai bên thống nhất ký kết hợp đồng với các nội dung sau
                      đây:
                    </div>
                  </div>
                </div>
                <div>
                  <div className="my-2">
                    <b>CÁC ĐIỀU KHOẢN CHÍNH</b>
                  </div>
                  <div className="my-2"></div>

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
                          ref={previewRefs.PreviewCustomerSignatureRef}
                        >
                          {contractAttribute.customerSignature}
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
  );
}
