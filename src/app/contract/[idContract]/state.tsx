import { useRef, useState } from 'react';

export function State() {
    const [city, setCity] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [titleContract, setTitleContract] = useState('Tiêu đề hợp đồng');
    const [numberContract, setNumberContract] = useState<string>('__');
    const [law, setLaw] = useState('Lorem ipsum, dolor sit amet consectetur adipisicing elit.Fuga quam nobis perspiciatis ratione similique in quis rem fugiat doloremque.Magnam tempore quo doloremque hic a unde consequatur reiciendis nulla recusandae!');
    const [signingDate, setSigningDate] = useState('00-00-2024');
    const [endDate, setEndDate] = useState('00-00-2024');
    const [content, setContent] = useState('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam aliquam vitae corporis consequuntur soluta explicabo praesentium quos sapiente tenetur laborum harum et accusantium pariatur ipsa, ut quo fugit amet natus.');
    const [supplierName, setSupplierName] = useState('');
    const [supplierCitizenID, setSupplierCitizenID] = useState('');
    const [supplierSurrogate, setSupplierSurrogate] = useState('');
    const [supplierAddress, setSupplierAddress] = useState('');
    const [supplierPhoneNumber, setSupplierPhoneNumber] = useState('');
    const [supplierFax, setSupplierFax] = useState('');
    const [supplierAccountNumber, setSupplierAccountNumber] = useState('');
    const [supplierTreasury, setSupplierTreasury] = useState('');
    const [supplierSignature, setSupplierSignature] = useState('ExampleA');
    const [customerName, setCustomerName] = useState('');
    const [customerCitizenID, setCustomerCitizenID] = useState('');
    const [customerSurrogate, setCustomerSurrogate] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [customerAccountNumber, setCustomerAccountNumber] = useState('');
    const [customerSignature, setCustomerSignature] = useState('ExampleB');
    const [inputs, setInputs] = useState<{ value: string }[]>([{ value: '' }]);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<{ value: string, label: string }[]>([{ value: 'Select framework...', label: 'Select framework...' }])
    const [disabledInputs, setDisabledInputs] = useState<boolean[]>([]);
    const [disabledValues, setDisabledValues] = useState<boolean[]>([]);
    const [defaultLabel, setDefaultLabel] = useState<string>("Select framework");
    const [showChat, setShowChat] = useState(false)
    const [inputValue, setInputvalue] = useState("");
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
    return {
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
        disabledInputs, setDisabledInputs,
        disabledValues, setDisabledValues,
        defaultLabel, setDefaultLabel,
        showChat, setShowChat,
        inputValue, setInputvalue,
        inputRefs, previewRefs
    };
}
