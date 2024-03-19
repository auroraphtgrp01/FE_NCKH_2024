import z from 'zod'

export const RegisterBody = z
    .object({
        addressWallet: z.string().min(42).max(42),
        name: z.string().trim().min(2).max(256),
        email: z.string().email(),
        indentifyCard: z.string().min(9).max(12),
        phoneNumber: z.string().min(10).max(11),
        gender: z.boolean(),
        dateOfBirth: z.date(),
    })
    .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
    data: z.object({
        token: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string()
        })
    }),
    message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
    .object({
        email: z.string().email(),
        password: z.string().min(6).max(100)
    })
    .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>
export const RefreshSessionBody = z.object({}).strict()

export type RefreshSessionBodyType = z.TypeOf<typeof RefreshSessionBody>
export const RefreshSessionRes = RegisterRes

export type RefreshSessionResType = z.TypeOf<typeof RefreshSessionRes>
