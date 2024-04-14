import { useState } from 'react';
import { State } from './state'; // Import custom hook State
import { format, parse } from 'date-fns';
export function FunctionHandle() {
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
    } = State();

    const addInput = () => {
        const newInputs = [...inputs, { value: '' }];
        setInputs(newInputs);


    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index].value = value;
        setInputs(newInputs);
        // console.log(inputs);
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
    function formatDate(inputDate: any) {
        const parts = inputDate.split('-'); // Tách chuỗi thành các phần riêng biệt
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        return `${day}/${month}/${year}`;
    }
    function getDate(inputDate: any) {
        const parts = inputDate.split('-'); // Tách chuỗi thành các phần riêng biệt
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        return `${day}/${month}/${year}`;
    }



    function convertToDateVN(dateString: string): string {
        // Tạo đối tượng Date từ chuỗi
        const date = new Date(dateString);

        // Kiểm tra nếu date là NaN hoặc không hợp lệ
        if (isNaN(date.getTime())) {
            return 'Ngày không hợp lệ';
        }

        // Chuyển đổi ngày thành định dạng "ngày - tháng - năm" của Việt Nam
        const formattedDate = format(date, 'dd-MM-yyyy');

        return formattedDate;
    }

    function extractDatePart(dateString: string, part: 'day' | 'month' | 'year'): number {
        const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
        switch (part) {
            case 'day':
                return parsedDate.getDate();
            case 'month':
                return parsedDate.getMonth() + 1; // Tháng bắt đầu từ 0
            case 'year':
                return parsedDate.getFullYear();
            default:
                throw new Error('Tham số không hợp lệ');
        }
    }
    return {
        addInput,
        handleInputChange,
        handleDates,
        handleChangeCity,
        handleChangeTitleContract,
        handleChangeNumberContract,
        handleChangeLaw,
        handleChangSigningDate,
        handleChangeEndDate,
        handleChangContent,
        handleChangeSupplierName,
        handleChangeSupplierCitizenID,
        handleChangeSupplierSurrogate,
        handleChangeSupplierAddress,
        handleChangeSupplierPhoneNumber,
        handleChangeSupplierFax,
        handleChangeSupplierAccountNumber,
        handleChangeSupplierTreasury,
        handleChangeCustomerName,
        handleChangeCustomerCitizenID,
        handleChangeCustomerSurrogate,
        handleChangeCustomerAddress,
        handleChangeCustomerPhoneNumber,
        handleChangeCustomerAccountNumber,
        handleChangeSupplierSignature,
        handleChangeCustomerSignature,
        formatDate,
        getDate,
        convertToDateVN,
        extractDatePart
    };
}
