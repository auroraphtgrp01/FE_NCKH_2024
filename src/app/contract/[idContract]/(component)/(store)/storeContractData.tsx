'use client'

import { EContractAttributeType, IContractAttribute } from "@/interface/contract.i";
import { useState } from "react";

export const ContractState = () => {

    const [contractAttribute, setContractAttribute] = useState(initContractAttribute);
    return {
        contractAttribute, setContractAttribute
    }
}


export const initContractAttribute: IContractAttribute[] = [
    {
        id: '1',
        type: EContractAttributeType.CONTRACT_HEADER,
        value: 'Cộng Hoà Xã Hội Chủ Nghĩa Việt Nam'
    },
    {
        id: '2',
        type: EContractAttributeType.CONTRACT_HEADER,
        value: 'Độc Lập - Tự Do - Hạnh Phúc'
    },
    {
        id: '2',
        type: EContractAttributeType.CONTRACT_HEADER,
        value: '-------------------------------'
    },
    {
        id: '4',
        type: EContractAttributeType.CONTRACT_HEADER_DATE,
        value: 'Hà Nội, ngày 01 tháng 01 năm 2021'
    },
    {
        id: '5',
        type: EContractAttributeType.CONTRACT_TITLE,
        value: 'Hợp Đồng Lao Động'
    },
    {
        id: '6',
        type: EContractAttributeType.CONTRACT_NUMBER,
        value: 'Số: 01/2021/HĐLĐ'
    },
    {
        id: '7',
        type: EContractAttributeType.CONTRACT_TEXT,
        value: 'Hôm nay, ngày 01 tháng 01 năm 2021, chúng tôi gồm có:'
    },
    {
        id: '8',
        type: EContractAttributeType.CONTRACT_HEADING_1,
        value: 'CÁC BÊN ĐẠI DIỆN'
    },
    {
        id: '9',
        type: EContractAttributeType.CONTRACT_HEADING_2,
        value: 'BÊN A: CÔNG TY TNHH ABC XYZ'
    },
    {
        id: '10',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        value: 'Đại diện ',
        property: 'Ông Nguyễn Văn A'
    },
    {
        id: '11',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        value: '0889001505',
        property: 'Số Điện Thoại'
    },
    {
        id: '13',
        type: EContractAttributeType.CONTRACT_HEADING_2,
        value: 'BÊN B: CÔNG TY FPT SOFTWARE',
    },
    {
        id: '14',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        value: 'Đại diện ',
        property: 'Ông Nguyễn Văn A'
    },
    {
        id: '15',
        type: EContractAttributeType.CONTRACT_ATTRIBUTE,
        value: '0889001505',
        property: 'Số Điện Thoại'
    },
]