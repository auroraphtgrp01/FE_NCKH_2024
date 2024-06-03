/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { fetchAPI } from '@/utils/fetchAPI';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { DataWithName, OrderDetail } from './[id]/page';

export function getColumns(
  data: DataWithName,
  setData: React.Dispatch<React.SetStateAction<DataWithName>>,
  getDataOrders: () => void
): ColumnDef<OrderDetail>[] {
  const { toast } = useToast();
  const userInfoString = localStorage.getItem('user-info');
  const user_info = userInfoString ? JSON.parse(userInfoString) : null;
  const isCustomer = user_info && user_info.data.role === 'Customer';
  const updateOrder = async (e: any, index: number, type: string) => {
    const products = data.orderDetails.map((value: any) => {
      return { ...value };
    });
    type == 'quantity'
      ? (products[index].quantity = Number(e.target.value))
      : (products[index].discount = Number(e.target.value));
    const payload = {
      id: data.orderDetails[0].idOrder,
      products: products,
    };
    await fetchAPI('/orders', 'PATCH', payload)
      .then((res) => {
        toast({
          title: `Update thành công`,
          variant: 'success',
        });
        getDataOrders();
      })
      .catch((err) => {
        toast({
          title: `Update không thành công`,
          variant: 'destructive',
        });
      });
  };
  return [
    {
      accessorKey: 'name',
      header: () => <div className='font-semibold'>Products</div>,
      cell: ({ row }) => (
        <div className='text-start'>{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: () => <div className='font-semibold'>Price</div>,
      cell: ({ row }) => (
        <div className='text-start'>{row.getValue('price')}</div>
      ),
    },
    {
      accessorKey: 'image',
      header: () => <div className='font-semibold'>Image</div>,
      cell: ({ row }) => (
        <img
          className='hover:delay-250 w-14 duration-300 hover:scale-[2]'
          src={row.getValue('image')}
          alt='Product Image'
        />
      ),
    },
    {
      accessorKey: 'taxPrice',
      header: () => <div className='font-semibold'>Tax Price</div>,
      cell: ({ row }) => (
        <div className='text-start'>{row.getValue('taxPrice')}</div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: () => <div className='font-semibold'>Quantity</div>,
      cell: ({ row }) => {
        return (
          <div className='text-start'>
            {isCustomer && data.status === 'Pending' ? (
              <Input
                className='w-16'
                type='text'
                onBlur={(e) => {
                  updateOrder(e, row.index, 'quantity');
                }}
                defaultValue={row.getValue('quantity')}
              />
            ) : (
              <span>{row.getValue('quantity')}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'discount',
      header: () => <div className='font-semibold'>Discount</div>,
      cell: ({ row }) => (
        <div className='text-start'>
          {data.status === 'Pending' || data.status === 'In Progress' ? (
            <Input
              className='w-16'
              type='text'
              defaultValue={row.getValue('discount')}
              onBlur={(e) => {
                updateOrder(e, row.index, 'discount');
              }}
            />
          ) : (
            <span>{row.getValue('discount')}</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'priceWithoutTax',
      header: () => <div className='font-semibold'>Price without tax</div>,
      cell: ({ row }) => (
        <div className='text-start'>{row.getValue('priceWithoutTax')}</div>
      ),
    },
    {
      accessorKey: 'unit',
      header: () => <div className='font-semibold'>Unit</div>,
      cell: ({ row }) => (
        <div className='text-start'>{row.getValue('unit')}</div>
      ),
    },
  ];
}
