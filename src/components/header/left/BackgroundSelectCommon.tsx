import React from 'react'
import { GrClose } from 'react-icons/gr'
import Background from './Background'

type Props = {
   setShowSelectBg: Function,
   setSelectBg: Function,
   selectBg: { ntn: number, type: string },
   setSelectType: Function
}

function BackgroundSelectCommon(props: Props) {
   return (
      <>
         <div className='relative'>
            <h1 className='text-center py-2 font-semibold'>Board background</h1>
            <span
               onClick={() => {
                  props.setShowSelectBg(false)
               }}
               className='absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-md cursor-pointer'><GrClose /></span>
         </div>
         <div>
            <div className='flex items-center justify-between p-2'>
               <h1 className='font-bold text-gray-600'>Photos</h1>
               <button className='bg-slate-200 px-2 py-[6px]'
                  onClick={() => {
                     props.setSelectType('photos')
                  }}
               >
                  See more
               </button>
            </div>
            <div className='grid grid-cols-3 gap-1'>
               <Background ntn={1} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={2} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={3} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={4} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={5} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={6} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            </div>
         </div>
         <div>
            <div className='flex items-center justify-between p-2'>
               <h1 className='font-bold text-gray-600'>Colors</h1>
               <button className='bg-slate-200 px-2 py-[6px]'
                  onClick={() => {
                     props.setSelectType('colors')
                  }}
               >
                  See more
               </button>
            </div>
            <div className='grid grid-cols-3 gap-1'>
               <Background ntn={1} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={2} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={3} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={4} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={5} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
               <Background ntn={6} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            </div>
         </div>
      </>
   )
}

export default BackgroundSelectCommon