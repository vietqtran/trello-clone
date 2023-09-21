import React, { useEffect, useState } from 'react'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'
import { GrClose } from 'react-icons/gr'
import WorkspaceItem from './WorkspaceItem'
import RecentItem from './RecentItem'
import Starred from './Starred'
import StarredItem from './StarredItem'
import TemplateItem from './TemplateItem'
import { collection, getDocs, addDoc, doc } from '@firebase/firestore'
import { db } from '@/firebase'
import { Board, User } from '@/types'
import { useAppSelector } from '@/app/redux/store'
import { useRouter } from 'next/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {
   showDropdown: { show: boolean, tab: string },
   setShowDropdown: Function,
}

function MoreDropdown(props: Props) {
   const [starredBoards, setStarredBoards] = useState<Board[]>([])
   const workspaceCollectionRef = collection(db, "workspaces")
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
         try {
            const data = await AsyncStorage.getItem('USER')
            if (data) {
               setUser(JSON.parse(data))
            } else {
               router.push('/')
            }

         } catch (error) {

         }
      }
      getUser()
   }, [])
   useEffect(() => {
      getStarredBoards()
   }, [])
   const getStarredBoards = async () => {
      await getDocs(workspaceCollectionRef).then((dataRef) => {
         const newStarredBoards: Board[] = []
         dataRef.docs.forEach((doc) => {
            if (doc.data().userId === user.id) {
               doc.data().boards?.forEach((board: Board) => {
                  if (board.star) {
                     newStarredBoards.push({
                        id: board.id,
                        workspaceId: board.workspaceId,
                        title: board.title,
                        columns: [...board.columns],
                        star: board.star,
                        background: { ...board.background }
                     })
                  }
               })
            }
         })
         setStarredBoards(newStarredBoards)
      }).catch((err) => { })
   }
   return (
      <div>
         {props.showDropdown &&
            <div
               className='bg-white text-black absolute top-[calc(100%+10px)] left-[-80px] drop-menu-shadow rounded-md min-w-[300px]'>
               {props.showDropdown.show && props.showDropdown.tab === '' &&
                  <div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({ show: true, tab: 'workspace' })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'>
                        <h1>Workspaces</h1>
                        <span><SlArrowRight /></span>
                     </div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({ show: true, tab: 'recent' })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'>
                        <h1>Recent boards</h1>
                        <span><SlArrowRight /></span>
                     </div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({ show: true, tab: 'starred' })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'>
                        <h1>Starred boards</h1>
                        <span><SlArrowRight /></span>
                     </div>
                     <div
                        onClick={() => {
                           props.setShowDropdown({ show: true, tab: 'template' })
                        }}
                        className='flex items-center justify-between p-2 hover:bg-slate-100'>
                        <h1>Templates</h1>
                        <span><SlArrowRight /></span>
                     </div>
                  </div>
               }
               {props.showDropdown.tab === 'workspace' &&
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: '' })
                           }}
                           className='p-3'>
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>Workspaces</h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: '' })
                           }}
                           className='p-3'>
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'>
                        <WorkspaceItem workspace={{ id: '', name: '', type: '', boards: [], description: '', userId: '' }} />
                     </div>
                  </div>
               }
               {props.showDropdown.tab === 'recent' &&
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: '' })
                           }}
                           className='p-3'>
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>Recent boards</h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: '' })
                           }}
                           className='p-3'>
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'>
                        {starredBoards.map((board) => {
                           return <RecentItem key={board.id} board={board} />
                        })}
                     </div>
                  </div>
               }
               {props.showDropdown.tab === 'starred' &&
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: '' })
                           }}
                           className='p-3'>
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>Starred boards</h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: '' })
                           }}
                           className='p-3'>
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'>
                        {starredBoards.map((board) => {
                           return <StarredItem key={board.id} board={board} />
                        })}
                     </div>
                  </div>
               }
               {props.showDropdown.tab === 'template' &&
                  <div>
                     <div className='flex items-center justify-between'>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: true, tab: '' })
                           }}
                           className='p-3'>
                           <SlArrowLeft />
                        </span>
                        <h1 className='font-semibold text-sm'>Templates</h1>
                        <span
                           onClick={() => {
                              props.setShowDropdown({ show: false, tab: '' })
                           }}
                           className='p-3'>
                           <GrClose />
                        </span>
                     </div>
                     <div className='p-2'>
                        {starredBoards.map((board) => {
                           return <TemplateItem key={board.id} />
                        })}
                     </div>
                  </div>
               }
            </div>
         }
      </div>
   )
}

export default MoreDropdown