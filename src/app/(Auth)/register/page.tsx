import RegisterForm from '@/app/(Auth)/register/registerForm';
import React from 'react';

export default function page() {
   return (
      <div>
         <h1 className='mt-3 text-center text-3xl font-semibold'></h1>
         <div className='flex justify-center'>
            <RegisterForm />
         </div>
      </div>
   );
}
