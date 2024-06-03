import z from 'zod';

export const GetSmartContract = z
  .object({
    addressContract: z.string(),
    abi: z.optional(z.string()),
    typeContract: z.string(),
    addressWallet: z.optional(z.string()),
    methodCall: z.optional(z.string()),
  })
  .strict();

export type GetContractBodyType = z.TypeOf<typeof GetSmartContract>;
