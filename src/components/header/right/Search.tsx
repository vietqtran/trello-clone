import React from 'react'
import { FiSearch } from 'react-icons/fi'

function Search() {
   return (
      <>
         <div className='md:flex hidden items-center cursor-text justify-center p-1 pr-32 border-[1px] hover:bg-slate-50 rounded-md overflow-hidden'>
            <span className='mx-2'><FiSearch /></span>
            <div>Search</div>
         </div>
         <div className='p-1 md:hidden block hover:bg-slate-200 rounded-full cursor-pointer ml-1'>
            <div className='p-1 rounded-full relative'>
               <FiSearch />
            </div>
         </div>
      </>
   )
}

export default Search