import z from 'zod'

export const GetSmartContract = z
    .object({
        addressContract: z.string().min(42).max(42),
        abi: z.string()
    })
    .strict()

export type GetContractBodyType = z.TypeOf<typeof GetSmartContract>
