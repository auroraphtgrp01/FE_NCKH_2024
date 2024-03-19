import RegisterForm from '@/app/(Auth)/register/registerForm'
import React from 'react'

export default function page() {
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center mt-3'></h1>
      <div className='flex justify-center'>
        <RegisterForm />
      </div>
    </div>
  )
}
