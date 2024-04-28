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
}

export enum EContractAttributeTypeAdditional {
	CONTRACT_TEXT = "Contract Text",
	CONTRACT_HEADING_1 = "Contract Heading 1",
	CONTRACT_HEADING_2 = "Contract Heading 2",
	CONTRACT_ATTRIBUTE = "Contract Attribute",
	CONTRACT_SIGNATURE = "Contract Signature",
}

export interface IContractAttribute {
    id: string
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