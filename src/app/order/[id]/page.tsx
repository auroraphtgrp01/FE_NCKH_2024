/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DataTable } from '../data-table'
import { fetchAPI } from '@/utils/fetchAPI'
import { useParams } from 'next/navigation'
import { useAppContext } from '@/components/ThemeProvider'
import { DataWithName, IDataOrder } from '@/interface/order.i'
import { useRouter } from 'next/navigation'

export interface DataTableProps<TData extends DataWithName> {
  data: TData
  getDataOrders: () => void
  setData: React.Dispatch<React.SetStateAction<TData>>
}
export interface Product {
  id: string
  name: string
  description: string
  idSupplier: string
}

export default function Page() {
  const Router = useRouter()
  const { toast } = useToast()
  const [dataOrder, setDataOrder] = useState<IDataOrder | null>(null)
  const [data, setData] = useState<DataWithName>({
    id: '',
    orderCode: '',
    userId: '',
    products: [],
    status: '',
    suppliersId: ''
  })
  const { id } = useParams<{ id: string }>()
  const [isDisableButton, setIsDisableButton] = useState({
    isDisableButtonSendRq: false,
    isDisableButtonResendRq: false,
    isDisableButtonDeleteSurvey: false,
    isDisableButtonCreateContract: false,
    isDisableButtonRefuseSurvey: false
  })
  const [isCustomer, setIsCustomer] = useState(false)
  const { userInfo }: any = useAppContext()

  useEffect(() => {
    getDataOrders()
    if (userInfo.data.role === 'Customer') setIsCustomer(true)
  }, [])

  async function sendRequestToSupplier() {
    if (!dataOrder) return

    try {
      const res = await fetchAPI(`/orders/send-request/${dataOrder.order.id}`, 'GET')
      toast({
        title: res.data.message,
        variant: 'success'
      })

      setIsDisableButton((prevState) => ({
        ...prevState,
        isDisableButtonSendRq: true
      }))
      getDataOrders()
    } catch (err) {
      console.log(err)
    }
  }

  async function resendSurveyToCustomer() {
    if (!dataOrder) {
      return
    }

    try {
      const res = await fetchAPI(`/orders/resend-request/${dataOrder.order.id}`, 'GET')
      toast({
        title: res.data.message,
        variant: 'success'
      })

      setIsDisableButton((prevState) => ({
        ...prevState,
        isDisableButtonResendRq: true
      }))
      getDataOrders()
    } catch (err) {
      console.log(err)
    }
  }

  async function getDataOrders() {
    try {
      const res = await fetchAPI(`/orders/${id}`, 'GET')
      const orderData = res.data.order
      orderData.products = orderData.products.map((product: any) => ({
        ...product,
        priceWithoutTax: product.price * product.quantity - product.discount,
        total: (product.price + product.taxPrice) * product.quantity - product.discount
      }))
      setData(orderData)
      setDataOrder(res.data)

      setIsDisableButton({
        isDisableButtonSendRq: orderData.status !== 'Pending',
        isDisableButtonResendRq: orderData.status === 'Completed' || orderData.status === 'Cancelled',
        isDisableButtonCreateContract: orderData.status !== 'Completed',
        isDisableButtonRefuseSurvey: orderData.status !== 'In Progress',
        isDisableButtonDeleteSurvey: orderData.status !== 'Pending'
      })
    } catch (err) {
      console.log('Error : ' + err)
    }
  }

  async function handleCreateContract() {
    await fetchAPI(`/contracts/create-by-survey`, 'POST', {
      surveyId: dataOrder?.order.id
    })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          toast({
            title: `Tạo hợp đồng thành công`,
            variant: 'success'
          })
          Router.push(`/contract/${res.data.contract.id}`)
        }
      })
      .catch((err) => {
        toast({
          title: err.toString(),
          variant: 'destructive'
        })
      })
  }

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='mb-5 text-lg font-semibold tracking-tight'>Request a quote</h2>
        <Breadcrumb className='mt-2'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <div className='cursor-default font-bold text-green-500'>Confirm</div>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-green-500' />
            <BreadcrumbItem>
              <div className='cursor-default'>Send</div>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className='cursor-default text-gray-500'>Purchase Order</div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className='mb-5 grid grid-cols-2'>
        <div className='flex'>
          <div className='mt-2 w-28 text-sm font-semibold'>Supplier</div>
          <Input
            className='ml-4 w-[50%]'
            placeholder='Tên, Email, hoặc Tham chiếu'
            defaultValue={dataOrder?.supplier?.name}
            disabled
          />
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='flex'>
          <div className='mt-2 w-28 text-sm font-semibold'>Supplier code</div>
          <Input
            className='ml-4 w-[50.5%]'
            placeholder='xxxx-xxxx-xxxx'
            defaultValue={dataOrder?.supplier?.taxCode}
            disabled
          />
        </div>
      </div>
      <Tabs defaultValue='products' className='mb-5 w-full'>
        <TabsContent value='products'>
          <DataTable data={data} setData={setData} getDataOrders={getDataOrders} />
        </TabsContent>
      </Tabs>
      <div className='flex justify-end'>
        {!isCustomer ? (
          <div>
            <Button
              className='mr-1 px-2 py-2'
              variant={'default'}
              disabled={isDisableButton.isDisableButtonResendRq}
              onClick={() => resendSurveyToCustomer()}
            >
              Resend to customer
            </Button>
            <Button
              className='px-2 py-2'
              variant={'destructive'}
              disabled={isDisableButton.isDisableButtonRefuseSurvey}
            >
              Refuse
            </Button>
          </div>
        ) : (
          <div>
            <Button className='mr-1 px-2 py-2' variant={'outline'} onClick={() => handleCreateContract()}>
              Create contract
            </Button>
            <Button
              className='mr-1 px-2 py-2'
              variant={'default'}
              disabled={isDisableButton.isDisableButtonSendRq}
              onClick={() => sendRequestToSupplier()}
            >
              Send request to supplier
            </Button>
            <Button
              className='px-2 py-2'
              variant={'destructive'}
              disabled={isDisableButton.isDisableButtonDeleteSurvey}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
