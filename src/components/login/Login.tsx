'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import SideImage from '../SideImage'
import Image from 'next/image'
import AuthButton from '../AuthButton'
import Link from 'next/link'
import { PiDotOutlineFill } from 'react-icons/pi'
import Eye from '../Eye'
import { useState } from 'react'


type Inputs = {
   email: string,
   password: string
}

function Login() {

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<Inputs>()
   const onSubmit: SubmitHandler<Inputs> = (data) => { }

   const [show, setShow] = useState(false)

   return (
      <div className="flex items-center flex-col justify-start w-full h-full lg:bg-white bg-slate-50 min-h-[100vh]">
         {/* Left Image  */}
         <div className="fixed left-0 bottom-0 lg:block hidden">
            <SideImage src='/assets/login-left.jpg' />
         </div>
         {/* Right Image  */}
         <div className="fixed right-0 bottom-0 lg:block hidden">
            <SideImage src='/assets/login-right.jpg' />
         </div>

         {/* Logo  */}
         <div className="flex items-center justify-center py-10">
            <Image src={'/assets/trello-logo-blue.svg'} alt="logo" width={200} height={200} />
         </div>

         <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-start mb-10 bg-white rounded-md form-shadow p-10'>
               <h2 className='font-bold text-slate-600 mb-8'>Log in to Trello</h2>
               <div>
                  <input defaultValue="" {...register("email", { required: true })}
                     className='p-2 leading-none w-[300px] bg-slate-100 mb-3 font-thin rounded-md outline-none border-2 border-slate-300 focus:border-blue-400 ease-out duration-300'
                     placeholder='Enter email' type='email' />
               </div>
               <div className='relative'>
                  <input type={show ? 'text' : 'password'} defaultValue="" {...register("password", { required: true })}
                     className='p-2 leading-none w-[300px] bg-slate-100 pr-10 font-thin rounded-md outline-none border-2 border-slate-300 focus:border-blue-400 ease-out duration-300'
                     placeholder='Enter password' />
                  <div className='absolute right-0 top-[50%] translate-y-[-50%]'>
                     <Eye setShow={setShow} show={show} />
                  </div>
               </div>
               <button type='submit' className='w-[300px] text-sm text-white font-bold py-2 rounded-md mt-5 bg-[#5AAC44] hover:bg-[#61BD4F]'>Continue</button>
               <span className='font-light text-xs my-5'>OR</span>
               {/* Authentication Button  */}
               <AuthButton name='Google'>
                  <Image src={'/assets/google-icon.svg'} alt='google-icon' width={20} height={20} />
               </AuthButton>
               <AuthButton name='Microsoft'>
                  <Image src={'/assets/microsoft-icon.svg'} alt='google-icon' width={20} height={20} />
               </AuthButton>
               <AuthButton name='Apple'>
                  <Image src={'/assets/apple-icon.svg'} alt='google-icon' width={20} height={20} />
               </AuthButton>
               <AuthButton name='Slack'>
                  <Image src={'/assets/slack-icon.svg'} alt='google-icon' width={20} height={20} />
               </AuthButton>
               <hr className='w-[300px] mt-3' />
               <div className='flex items-center justify-center mt-4'>
                  <Link className='text-blue-500 text-sm hover:underline' href={'#'}>{`Can't log in?`}</Link>
                  <PiDotOutlineFill className='text-slate-600' />
                  <Link className='text-blue-500 text-sm hover:underline' href={'/signup'}>Sign up for an account</Link>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Login