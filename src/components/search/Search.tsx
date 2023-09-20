'use client'

import React, { useState } from 'react'
import SearchBoardItem from './SearchBoardItem'
import { WorkspaceType } from '@/types'
import SearchBoard from './SearchBoard'
import SearchWorkspace from './SearchWorkspace'

type Props = {
   workspaces: WorkspaceType[] | undefined
}

function Search(props: Props) {

   const [input, setInput] = useState('')
   const [searchTab, setSearchTab] = useState('')

   return (
      <div className='mx-auto mt-10 max-w-[800px] p-[50px] flex flex-col items-start justify-start'>
         <h1 className='text-2xl font-semibold mb-5'>Search</h1>
         <div className='w-full mb-5'>
            {/* TODO */}
            <input type="text" placeholder='Enter your search keyword here'
               className='w-full py-1 px-2 outline-none border-2 rounded-sm border-slate-400 focus:border-blue-500'
               onChange={(e) => {
                  setInput(e.target.value)
               }}
            />
         </div>
         {input === '' &&
            <div className='w-full'>
               <h1 className='font-semibold '>Recent boards</h1>
               <div className='w-full'>

               </div>
            </div>}
         {input !== '' &&
            <div className='w-full'>
               <div className='w-full'>
                  <h1 className='font-semibold '>Boards</h1>
                  <div className='w-full'>
                     <SearchBoard workspaces={props.workspaces} input={input}/>
                  </div>
               </div>
               <div className='w-full mt-5'>
                  <h1 className='font-semibold '>Workspaces</h1>
                  <div className='w-full'>
                     <SearchWorkspace workspaces={props.workspaces}  input={input}/>
                  </div>
               </div>
            </div>
         }
      </div>
   )
}

export default Search