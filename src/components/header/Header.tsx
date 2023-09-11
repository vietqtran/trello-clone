'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import Workspaces from './left/Workspaces'
import Recent from './left/Recent'
import Starred from './left/Starred'
import Templates from './left/Templates'
import Create from './left/Create'
import Search from './right/Search'
import Avatar from './right/Avatar'
import More from './left/More'
import WorkspaceModal from './left/WorkspaceModal'
import { Board, User, WorkspaceType } from '@/types'
import { useRouter } from 'next/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '@/firebase'
type Props = {
   workspaces: WorkspaceType[],
   starredBoards: Board[]
}

function Header(props: Props) {

   const [showModal, setShowModal] = useState({ show: false, type: '' })

   const [user, setUser] = useState<User>({
      id: '123',
      email: 'viet',
      password: '',
      recentBoard: [],
      auth: ''
   })
   const router = useRouter()

   useEffect(() => {
      const getUser = async () => {
         const data = await AsyncStorage.getItem('USER')
         if (data) {
            setUser(JSON.parse(data))
         } else {
            router.push('/')
         }
      }
      getUser()
   }, [])

   return (
      <>
         <div className='z-30 sticky top-0 left-0 right-0 bg-white p-2 border-b-[1px] border-slate-300 flex items-center justify-between'>
            <div className='flex items-center justify-start'>
               <div className='logo hover:bg-slate-200 rounded-md w-fit'>
                  <Link href={'/boards'}>
                     <Image
                        className='p-2'
                        src={'/assets/trello-logo-blue.svg'} width={100} height={100} alt='logo' />
                  </Link>
               </div>
               <div className='items-center justify-start md:hidden flex'>
                  <More headerType={''} />
                  <Create workspaces={props.workspaces} headerType={''} setShowModal={setShowModal} />
               </div>
               <div className='items-center justify-start md:flex hidden'>
                  <Workspaces workspaces={props.workspaces} headerType={''} />
                  <Recent recentBoards={user.recentBoard} headerType={''} />
                  <Starred starredBoards={props.starredBoards} headerType={''} />
                  <Templates headerType={''} />
                  <Create workspaces={props.workspaces} headerType={''} setShowModal={setShowModal} />
               </div>
            </div>
            <div className='flex items-center justify-end'>
               <Search headerType={''} />
               <Avatar user={user} headerType={''} />
            </div>
         </div>
         {showModal.show && showModal.type === 'workspace' &&
            <WorkspaceModal setShowModal={setShowModal} />
         }
      </>
   )
}

export default Header