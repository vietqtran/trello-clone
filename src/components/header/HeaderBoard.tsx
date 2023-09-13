'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
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
import Header from './Header'
var uniqid = require('uniqid');

type Props = {
   workspaces: WorkspaceType[],
   starredBoards: Board[],
   addBoard: Function
}

function HeaderBoard(props: Props) {

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
            // router.push('/')
         }
      }
      getUser()
   }, [])

   const addBoard = async (selectBg: { ntn: number, type: string }, title: string, workspace: string) => {
      const boardCreate: Board = {
         id: uniqid(),
         background: { ...selectBg },
         columns: [],
         star: false,
         title: title,
         workspaceId: workspace
      }
      return (
         <main>
            <Header addBoard={addBoard} starredBoards={[]} workspaces={[]} />
            <Search headerType='' />
         </main>
      )
   }

   return (
      <div className='z-30 w-full bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-b-[1px] border-slate-400 flex items-center justify-between'>
         <div className=' w-full text-white p-2 flex items-center justify-between'>
            <div className='flex items-center justify-start'>
               <div className='logo rounded-md w-fit bg-black bg-clip-padding backdrop-filter hover:backdrop-blur-sm bg-opacity-0 hover:bg-opacity-10'>
                  <Link href={'/boards'}>
                     <Image
                        className='px-2 fill-white'
                        src={'/assets/other/trello-logo-gradient-white.svg'} width={100} height={100} alt='logo' />
                  </Link>
               </div>
               <div className='items-center justify-start md:hidden flex'>
                  <More headerType={'board'} />
                  <Create addBoard={props.addBoard} workspaces={props.workspaces} headerType={''} setShowModal={setShowModal} />
               </div>
               <div className='items-center justify-start md:flex hidden'>
                  <Workspaces workspaces={props.workspaces} headerType={'board'} />
                  <Recent recentBoards={user.recentBoard} headerType={'board'} />
                  <Starred starredBoards={props.starredBoards} headerType={'board'} />
                  <Templates headerType={'board'} />
                  <Create addBoard={props.addBoard} workspaces={props.workspaces} headerType={'board'} setShowModal={setShowModal} />
               </div>
            </div>
            <div className='flex items-center justify-end'>
               <Search headerType={'board'} />
               <Avatar user={user} headerType={'board'} />
            </div>
         </div>
         {showModal.show && showModal.type === 'workspace' &&
            <WorkspaceModal setShowModal={setShowModal} />
         }
      </div>
   )
}

export default HeaderBoard