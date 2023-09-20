import React, { memo, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import { User } from '@/types'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/app/redux/store'
import { logOut } from '@/app/redux/features/user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {
   headerType: string,
   user: User
}

function Avatar(props: Props) {

   const [show, setShow] = useState(false)
   const router = useRouter()
   const dispatch = useDispatch()

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShow(false)
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   const removeUser = async () => {
      await AsyncStorage.removeItem('USER')
   }

   const handleLogOut = () => {
      dispatch(logOut())
      removeUser()
      router.push('/')
   }

   return (
      <div
         onClick={handleClickInside}
         ref={ref}
         className='bg-inherit relative'>
         <div className='p-1 hover:bg-slate-200 rounded-full cursor-pointer ml-1'>
            <div
               onClick={() => {
                  setShow(!show)
               }}
               className='p-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full relative'>
               <span className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white text-xs'>{props.user?.email?.toUpperCase().charAt(0)}</span>
            </div>
         </div>

         {show && <div className='text-black bg-white min-w-[240px] drop-menu-shadow right-0 top-[45px] absolute rounded-md'>
            <h1 className='text-sm font-semibold p-4'>Account</h1>
            <div className='flex items-center justify-start px-4 mb-2'>
               <div>
                  <div className='relative p-5 w-fit bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full'>
                     <span className=' font-semibold text-2xl text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>{props.user?.email?.toUpperCase().charAt(0)}</span>
                  </div>
               </div>
               <div className='w-[170px] ml-1 flex flex-col items-start justify-center'>
                  <p className='text-sm w-full truncate whitespace-nowrap'>{props.user.email}</p>
               </div>
            </div>
            <div
               onClick={handleLogOut}
               className='p-4 py-2 my-1 border-t-2 cursor-pointer hover:bg-slate-200'>Log out</div>
         </div>}
      </div>
   )
}

export default memo(Avatar)