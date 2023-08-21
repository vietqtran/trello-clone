import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Workspaces from './left/Workspaces'
import Recent from './left/Recent'
import Starred from './left/Starred'
import Templates from './left/Templates'
import Create from './left/Create'
import Search from './right/Search'
import Notifications from './right/Notifications'
import Theme from './right/Theme'
import Avatar from './right/Avatar'
import More from './left/More'

function Header() {
   return (
      <header className='sticky top-0 left-0 right-0 bg-white p-2 border-b-[1px] border-slate-300 flex items-center justify-between'>
         <div className='flex items-center justify-start'>
            <div className='logo hover:bg-slate-200 rounded-md w-fit'>
               <Link href={'/boards'}>
                  <Image
                     className='p-2'
                     src={'/assets/trello-logo-blue.svg'} width={100} height={100} alt='logo' />
               </Link>
            </div>
            <div className='items-center justify-start md:hidden flex'>
               <More />
               <Create />
            </div>
            <div className='items-center justify-start md:flex hidden'>
               <Workspaces />
               <Recent />
               <Starred />
               <Templates />
               <Create />
            </div>
         </div>
         <div className='flex items-center justify-end'>
            <Search />
            <div className='flex items-center justify-end'>
               <Notifications />
               <Theme />
               <Avatar />
            </div>
         </div>
      </header>
   )
}

export default Header