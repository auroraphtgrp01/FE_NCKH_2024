export enum EContractAttributeType { 
        CONTRACT_HEADER = "Contract Header",
		CONTRACT_HEADER_DATE = "Contract Header Date",
		CONTRACT_TITLE = "Contract Title",
		CONTRACT_NUMBER = "Contract Number",
		CONTRACT_TEXT = "Contract Text",
		CONTRACT_HEADING_1 = "Contract Heading 1",
		CONTRACT_HEADING_2 = "Contract Heading 2",
		CONTRACT_ATTRIBUTE = "Contract Attribute",
		CONTRACT_SIGNATURE = "Contract Signature",
		CONTRACT_ATTRIBUTE_PARTY_ADDRESS_WALLET = "Contract Attribute Party Address Wallet",
		CONTRACT_ATTRIBUTE_ADDRESS_WALLET_RECEIVE = "Contract Attribute Address Wallet Receive",
}

export enum EContractAttributeTypeAdditional {
	CONTRACT_NUMBER = "Contract Number",
	CONTRACT_TEXT = "Contract Text",
	CONTRACT_HEADING_1 = "Contract Heading 1",
	CONTRACT_HEADING_2 = "Contract Heading 2",
	CONTRACT_ATTRIBUTE = "Contract Attribute",
	CONTRACT_SIGNATURE = "Contract Signature",
}

export enum EContractAttributeTypeAdditionalHeader {
	CONTRACT_HEADER = "Contract Header",
	CONTRACT_HEADER_DATE = "Contract Header Date",
	CONTRACT_TITLE = "Contract Title",
}


export interface IContractAttribute {
    id?: string
	index?: number
    type?: EContractAttributeType
    value?: string
    property?: string
	createdBy?: string
	updatedBy?: string
	isCreate?: boolean
	statusAttribute?: EStatusAttribute
}

export enum EStatusAttribute {
	CREATE = "Create",
	UPDATE = "Update",
	PREPARE = "Prepare",
	NOT_CHANGE = "Not Change",
}

export interface IDefinitionContractAttribute extends Omit<IContractAttribute, 'id' | 'value' | 'property'> {
}

export interface IContractParticipant {
	id: string
	address: string
	name: string
	email: string
	status: string
}
