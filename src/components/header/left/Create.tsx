'use client'

import React, { memo, useContext } from 'react'
import { RxPlus } from 'react-icons/rx'
import { useState } from 'react'
import { FaTrello } from 'react-icons/fa'
import { FiTrello } from 'react-icons/fi'
import { BsPeople } from 'react-icons/bs'
import CreateBoard from './CreateBoard'
import CreateTemplate from './CreateTemplate'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

type Props = {
   setShowModal: Function,
   headerType: string
}

function Create(props: Props) {

   const [show, setShow] = useState({ show: false, tab: '' })

   const ref = useRef(null)
   const handleClickOutside = () => {
      setShow({ show: false, tab: '' })
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)

   return (
      <>
         <div
            ref={ref}
            onClick={handleClickInside}
            className={`cursor-pointer relative flex items-center justify-center w-fit px-3 text-sm text-white rounded-sm
               ${props.headerType === 'board' ? 'bg-white bg-clip-padding backdrop-filter backdrop-blur-sm hover:bg-opacity-50 bg-opacity-30' : 'bg-blue-500  hover:bg-blue-600'}
            `}>
            <span className='md:block hidden py-2 px-3 cursor-pointer'
               onClick={() => {
                  setShow({ show: !show.show, tab: '' })
               }}
            >Create</span>
            <span className='md:hidden block p-2'
               onClick={() => {
                  setShow({ show: !show.show, tab: '' })
               }}
            ><RxPlus /></span>
            {show.show && show.tab === '' &&
               <div className={`text-black p-3 absolute bg-white top-[calc(100%+10px)] min-w-[306px] left-[-100px] md:left-[-20px] drop-menu-shadow rounded-md`}>
                  <div>
                     <div className='hover:bg-slate-100 p-1 rounded-md text-gray-600'
                        onClick={() => {
                           setShow({ show: true, tab: 'board' })
                        }}
                     >
                        <h1 className='flex items-center justify-start leading-none text-base'>
                           <FaTrello /> Create board
                        </h1>
                        <p className='text-xs my-2'>A board is made up of cards ordered on list. Use it to manage projects, track information, or organize anything.</p>
                     </div>
                     <div className='hover:bg-slate-100 p-1 rounded-md text-gray-600 '
                        onClick={() => {
                           setShow({ show: true, tab: 'template' })
                        }}
                     >
                        <h1 className='flex items-center justify-start leading-none text-base'>
                           <FiTrello /> Start with template
                        </h1>
                        <p className='text-xs my-2'>Get started faster with a board template.</p>
                     </div>
                     <div className='hover:bg-slate-100 p-1 rounded-md text-gray-600'
                        onClick={() => {
                           props.setShowModal({ show: true, type: 'workspace' })
                        }}
                     >
                        <h1 className='flex items-center justify-start leading-none text-base'>
                           <BsPeople /> Create Workspace
                        </h1>
                        <p className='text-xs my-2'>A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.</p>
                     </div>
                  </div>
               </div>}
            {show.show && show.tab === 'board' && <CreateBoard setShow={setShow} />}
            {show.show && show.tab === 'template' && <CreateTemplate setShow={setShow} />}
         </div >
      </>
   )
}

export default memo(Create)