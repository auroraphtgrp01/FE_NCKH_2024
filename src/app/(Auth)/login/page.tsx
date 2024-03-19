import LoginForm from '@/app/(Auth)/login/loginForm'
import React from 'react'

export default function page() {
  return (
    <div className='mt-6'>
      <h1 className='text-3xl font-semibold text-center'>LOGIN</h1>
      <div className='flex justify-center'>
      <LoginForm />
      </div>
    </div>
  )
}
