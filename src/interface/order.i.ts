import { Executor, ISupplier, User, UserPermission } from '@/interface/base.i'
import { Axios } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export type TData = {
  id: string
  name: string
  unit: string
  image: string
  price: number
  discount: number
  quantity: number
  taxPrice: number
  description: string
  idSupplier: string
  idOrder: string // Thuộc tính idOrder cần phải có
  dataOrder: any
}

export interface IOrderDetail {
  id: string
  name: string
  description?: string
  quantity?: number
  price: number
  image: string
  taxPrice?: number
  discount?: number
  taxExclude?: number
  unit: string
  idOrder: string
  idSupplier: string
  orderStatus: string
}

export interface DataWithName {
  id: string
  orderCode: string
  userId: string
  products: IOrderDetail[]
  status: string
  suppliersId: string
}

export interface IDataOrder {
  order: DataWithName
  supplier: ISupplier
}
