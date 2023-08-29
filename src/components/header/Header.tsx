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

function Header() {

   const [showModal, setShowModal] = useState({ show: false, type: '' })

   return (
      <>
         <header className='z-30 fixed top-0 left-0 right-0 bg-white p-2 border-b-[1px] border-slate-300 flex items-center justify-between'>
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
                  <Create headerType={''} setShowModal={setShowModal} />
               </div>
               <div className='items-center justify-start md:flex hidden'>
                  <Workspaces headerType={''} />
                  <Recent headerType={''} />
                  <Starred headerType={''} />
                  <Templates headerType={''} />
                  <Create headerType={''} setShowModal={setShowModal} />
               </div>
            </div>
            <div className='flex items-center justify-end'>
               <Search headerType={''} />
               <Avatar headerType={''} />
            </div>
         </header>
         {showModal.show && showModal.type === 'workspace' &&
            <>
               <WorkspaceModal setShowModal={setShowModal} />
            </>
         }
      </>
   )
}

export default Header