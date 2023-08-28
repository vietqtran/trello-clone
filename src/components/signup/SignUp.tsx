'use client'

import React from 'react'
import SideImage from '../SideImage'
import Image from 'next/image'
import AuthButton from '../AuthButton'
import Link from 'next/link'
import Eye from '../Eye'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { collection, addDoc, getDocs } from '@firebase/firestore'
import { db } from '@/firebase'
import { setUser } from '@/redux/features/userSlice'
import { useAppDispatch } from '@/redux/hooks'

function SignUp() {

   const [password, setPassword] = useState('')
   const [confirm, setConfirm] = useState('')
   const [show, setShow] = useState(false)
   const [error, setError] = useState({ show: false, message: '' })
   const userCollectionRef = collection(db, "users")
   const searchParams = useSearchParams()
   const email = searchParams.get('email')
   const [emailInput, setEmailInput] = useState(email ? email : '')
   const dispatch = useAppDispatch()

   const router = useRouter()
   const addUser = async () => {
      const data = await getDocs(userCollectionRef)
      for (let i = 0; i < data.docs.length; i++) {
         if (data.docs[i].data().email === emailInput) {
            setError({ show: true, message: 'This address is ready used' })
            break;
         } else {
            if (emailInput && password && confirm && password === confirm) {
               await addDoc(userCollectionRef, { email: emailInput, password: password }).then((docRef) => {
                  dispatch(setUser({ id: docRef.id, email: emailInput, password: password, recentBoard: [] }))
                  router.push('/boards')
               })
            }
         }
      }
   }

   const emailValid = (e: string) => {
      const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      return emailRegex.test(e);
   }

   return (
      <div className="flex items-center flex-col justify-start w-full h-full lg:bg-white bg-slate-50 min-h-[100vh]">
         <div className="fixed left-0 bottom-0 lg:block hidden">
            <SideImage src='/assets/login-left.jpg' />
         </div>
         <div className="fixed right-0 bottom-0 lg:block hidden">
            <SideImage src='/assets/login-right.jpg' />
         </div>

         <div className="flex items-center justify-center py-10">
            <Image src={'/assets/trello-logo-blue.svg'} alt="logo" width={200} height={200} />
         </div>

         <div>
            <div className='flex flex-col items-center justify-start mb-10 bg-white rounded-md form-shadow p-10'>
               <h2 className='font-bold text-slate-600 mb-8'>Sign up for your account</h2>
               <div>
                  <input required
                     className='p-2 leading-none w-[300px] bg-slate-100 font-thin rounded-md outline-none border-2 border-slate-300 focus:border-blue-400 ease-out duration-300'
                     placeholder='Enter email'
                     type='email'
                     value={emailInput}
                     onChange={(e) => {
                        setEmailInput(e.target.value)
                     }}
                  />
               </div>
               {!error.show ?
                  <div className='w-full mt-1 mb-3'>
                     <div className={`flex text-sm font-semibold items-center justify-start w-full  ${emailValid(emailInput) ? 'text-green-500' : 'text-red-500'}`}>
                        {emailValid(emailInput) ?
                           <span className=''><AiFillCheckCircle /></span>
                           :
                           <span><AiFillCloseCircle /></span>
                        }
                        <span className='ml-2'>Email matched</span>
                     </div>
                  </div>
                  :
                  <span className='w-full text-left text-sm font-semibold mt-2 text-red-500'>{error.message}</span>
               }
               <div className='relative w-full'>
                  <input
                     type={show ? 'text' : 'password'}
                     required
                     className='p-2 leading-none w-[300px] bg-slate-100 pr-10 font-thin rounded-md outline-none border-2 border-slate-300 focus:border-blue-400 ease-out duration-300'
                     placeholder='Enter password'
                     value={password}
                     onChange={(e) => {
                        setPassword(e.target.value)
                     }}
                  />
                  <div className='absolute right-0 top-[50%] translate-y-[-50%]'>
                     <Eye setShow={setShow} show={show} />
                  </div>
               </div>
               <div className='w-full mt-1'>
                  <div className={`flex text-sm font-semibold items-center justify-start w-full  ${password && password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
                     {(password && password.length >= 8) ?
                        <span className=''><AiFillCheckCircle /></span>
                        :
                        <span><AiFillCloseCircle /></span>
                     }
                     <span className='ml-2'>At least 8 characters</span>
                  </div>
               </div>
               <div className='mt-3'>
                  <input type='password'
                     required
                     className='p-2 leading-none w-[300px] bg-slate-100 pr-10 font-thin rounded-md outline-none border-2 border-slate-300 focus:border-blue-400 ease-out duration-300'
                     placeholder='Confirm password'
                     value={confirm}
                     onChange={(e) => {
                        setConfirm(e.target.value)
                     }}
                  />
               </div>
               <div className='w-full mt-1'>
                  <div className={`flex text-sm font-semibold items-center justify-start w-full  ${(password && confirm && password === confirm) ? 'text-green-500' : 'text-red-500'}`}>
                     {(password && confirm && password === confirm) ?
                        <span className=''><AiFillCheckCircle /></span>
                        :
                        <span><AiFillCloseCircle /></span>
                     }
                     <span className='ml-2'>Matched</span>
                  </div>
               </div>
               <button
                  onClick={addUser}
                  className='w-[300px] text-sm text-white font-bold py-2 rounded-md mt-5 bg-[#5AAC44] hover:bg-[#61BD4F]'>
                  Continue
               </button>
               <span className='font-light text-xs my-5'>OR</span>
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
                  <Link className='text-blue-500 text-sm hover:underline' href={'/login'}>Already have an account? Log In</Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SignUp