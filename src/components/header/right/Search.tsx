import Link from 'next/link'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

type Props = {
   headerType: string
}

function Search(props: Props) {
   return (
      <Link href={'/search'}>
         <div>
            <div className={`md:flex hidden items-center cursor-text justify-center p-1 pr-32 border-[1px] rounded-md overflow-hidden
               ${props.headerType === 'board' ? 'bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 hover:bg-opacity-40' : 'hover:bg-slate-100'}
            `}>
               <span className='mx-2'><FiSearch /></span>
               <div>Search</div>
            </div>
            <div className={`p-1 md:hidden block hover:bg-slate-200 rounded-full cursor-pointer ml-1
               ${props.headerType === 'board' ? 'bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 hover:bg-opacity-40' : 'hover:bg-slate-100'}`
            }>
               <div className='p-1 rounded-full relative'>
                  <FiSearch />
               </div>
            </div>
         </div>
      </Link >
   )
}

export default Search