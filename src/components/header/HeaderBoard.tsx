'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import Workspaces from './left/Workspaces'
import Recent from './left/Recent'
import Starred from './left/Starred'
import Templates from './left/Templates'
import Create from './left/Create'
import Search from './right/Search'
import Avatar from './right/Avatar'
import More from './left/More'
import WorkspaceModal from './left/WorkspaceModal'

function HeaderBoard() {

   const [showModal, setShowModal] = useState({ show: false, type: '' })

   return (
      <>
         <div className='z-30 w-full bg-black text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-2 border-b-[1px] border-slate-400 flex items-center justify-between'>
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
                  <Create headerType={'board'} setShowModal={setShowModal} />
               </div>
               <div className='items-center justify-start md:flex hidden'>
                  <Workspaces workspaces={[]} headerType={'board'} />
                  <Recent headerType={'board'} />
                  <Starred headerType={'board'} />
                  <Templates headerType={'board'} />
                  <Create headerType={'board'} setShowModal={setShowModal} />
               </div>
            </div>
            <div className='flex items-center justify-end'>
               <Search headerType={'board'} />
               <Avatar headerType={'board'} />
            </div>
         </div>
         {showModal.show && showModal.type === 'workspace' &&
            <>
               <WorkspaceModal setShowModal={setShowModal} />
            </>
         }
      </>
   )
}

export default HeaderBoard