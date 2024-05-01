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

]