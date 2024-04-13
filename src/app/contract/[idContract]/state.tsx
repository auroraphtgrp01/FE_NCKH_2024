import { useState } from 'react';

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
    const [values, setValues] = useState<{ value: string }[]>([{ value: 'Select framework...' }])
    const [disabledInputs, setDisabledInputs] = useState<boolean[]>([]);
    const [disabledValues, setDisabledValues] = useState<boolean[]>([]);
    const [defaultLabel, setDefaultLabel] = useState<string>("Select framework");
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
        defaultLabel, setDefaultLabel
    };
}
