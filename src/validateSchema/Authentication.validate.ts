import z from 'zod'

export const RegisterBody = z
  .object({
    addressWallet: z.optional(z.string()),
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    indentifyNumber: z.string().min(12).max(12),
    phoneNumber: z.string().min(10).max(11),
    gender: z.string(),
    dateOfBirth: z.optional(z.string()),
    role: z.string()
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
    addressWallet: z.string().length(42),
    PIN: z.string().length(6)
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>
export const RefreshSessionBody = z.object({}).strict()

export type RefreshSessionBodyType = z.TypeOf<typeof RefreshSessionBody>
export const RefreshSessionRes = RegisterRes

export type RefreshSessionResType = z.TypeOf<typeof RefreshSessionRes>

export const PIN = z
  .object({
    PIN: z.string().min(6).max(6)
  })
  .strict()

export type PINType = z.TypeOf<typeof PIN>
