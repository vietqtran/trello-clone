'use client'

import React, { use, useEffect } from 'react'
import SideImage from '../SideImage'
import Image from 'next/image'
import AuthButton from '../AuthButton'
import Link from 'next/link'
import { PiDotOutlineFill } from 'react-icons/pi'
import Eye from '../Eye'
import { useState } from 'react'
import { collection, getDocs, addDoc, doc } from '@firebase/firestore'
import { auth, db, googleProvider } from '@/firebase'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { User } from '@/types'
import { signInWithPopup } from 'firebase/auth'
import type { AppDispatch } from '@/app/redux/store'
import { useDispatch } from 'react-redux'
import { logIn, logOut } from '@/app/redux/features/user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
var generator = require('generate-password')
var passwordGenerate = generator.generate({
   length: 8,
   numbers: true
});

function Login() {

   const [show, setShow] = useState(false)
   const [emailInput, setEmailInput] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState({ show: false, message: '' })
   const [users, setUsers] = useState<User[]>([])
   const userCollectionRef = collection(db, "users")
   const workspaceCollectionRef = collection(db, "workspaces")
   const router = useRouter()
   const dispatch = useDispatch<AppDispatch>()

   useEffect(() => {
      getUsers()
      console.log(users)
   }, [])

   const getUsers = async () => {
      await getDocs(userCollectionRef).then((dataRef) => {
         setUsers(dataRef.docs.map((doc) => {
            return {
               id: doc.id,
               email: doc.data().email,
               password: doc.data().password,
               recentBoard: doc.data().recentBoard,
               auth: doc.data().auth
            }
         }))
      }).catch((err) => { })
   }

   const addUser = async (email: any) => {
      const setUser = async(user: any)=>{
         await AsyncStorage.setItem('USER', JSON.stringify(user));
      }

      const addWorkspace = async(userId:string)=>{
         await addDoc(workspaceCollectionRef, {
            userId: userId,
            name: 'My Workspace',
            boards: [],
            type: '',
            description: 'Frist Workspace'
         })
      }
      const passwordCreate = passwordGenerate
      await addDoc(userCollectionRef, {
         email: email,
         password: passwordCreate,
         recentBoard: [],
         auth: 'google'
      }).then((dataCreate) => {
         const userCreate = {
            id: dataCreate.id,
            email: email,
            password: passwordCreate,
            recentBoard: [],
            auth: 'google'
         }
         setUser(userCreate)
         dispatch(logIn(userCreate))
         addWorkspace(userCreate.id)
         return userCreate
      }).then((userCreate) => {
         router.push('/boards')
      })
   }

   const googleSignIn = () => {
      const setUser = async(user: any)=>{
         await AsyncStorage.setItem('USER', JSON.stringify(user));
      }
       signInWithPopup(auth, googleProvider).then((result) => {
         let check = false
         users.forEach((user) => {
            if (user.auth === 'google') {
               if (user.email === result.user.email) {
                  check = true
                  setUser(user)
                  dispatch(logIn(user))
               }
            }
         })
         if (check === false) {
            addUser(result.user.email)
         } else {
            router.push('/boards')
            setError({ show: false, message: '' })
         }
      }).catch((err) => {
      })
   }

   const handleLogin = async () => {
      let check = false
      let userLocal = {}
      users.forEach((user) => {
         if (user.email === emailInput) {
            check = true
            if (password === user.password) {
               userLocal = { ...user }
               console.log(user)
               dispatch(logIn(user))
            } else {
               setError({ show: true, message: 'Password is incorrect!' })
            }
            return
         }
      })
      if (check === false) {
         setError({ show: true, message: 'This address is not exist!' })
      } else {
         await AsyncStorage.setItem('USER', JSON.stringify(userLocal));
         router.push('/boards')
      }
   }
   console.log(users)


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
               <h2 className='font-bold text-slate-600 mb-8'>Log in to Trello</h2>
               <div>
                  <input
                     value={emailInput}
                     onChange={(e) => {
                        setEmailInput(e.target.value)
                     }}
                     className='p-2 leading-none w-[300px] mb-3 bg-slate-100 font-thin rounded-md outline-none border-2 border-slate-300 focus:border-blue-400 ease-out duration-300'
                     placeholder='Enter email' type='email' />
               </div>
               <div className='relative'>
                  <input type={show ? 'text' : 'password'}
                     value={password}
                     onChange={(e) => {
                        setPassword(e.target.value)
                     }}
                     className='p-2 leading-none w-[300px] bg-slate-100 pr-10 font-thin rounded-md outline-none border-2 border-slate-300 focus:border-blue-400 ease-out duration-300'
                     placeholder='Enter password' />
                  <div className='absolute right-0 top-[50%] translate-y-[-50%]'>
                     <Eye setShow={setShow} show={show} />
                  </div>
               </div>
               {error.show &&
                  <span className='w-full text-left text-sm font-semibold mt-2 text-red-500'>{error.message}</span>
               }
               <button
                  onClick={handleLogin}
                  type='button' className='w-[300px] text-sm text-white font-bold py-2 rounded-md mt-5 bg-[#5AAC44] hover:bg-[#61BD4F]'>Continue</button>
               <span className='font-light text-xs my-5'>OR</span>
               {/* Authentication Button  */}
               <div onClick={googleSignIn}>
                  <AuthButton name='Google'>
                     <Image src={'/assets/google-icon.svg'} alt='google-icon' width={20} height={20} />
                  </AuthButton>
               </div>
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
            </div>
         </div>
      </div>
   )
}

export default dynamic(() => Promise.resolve(Login), { ssr: false })
