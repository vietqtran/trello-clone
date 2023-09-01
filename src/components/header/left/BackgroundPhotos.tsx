import React from 'react'
import Background from './Background'
import { GrClose, GrPrevious } from 'react-icons/gr'

type Props = {
   setShowSelectBg: Function,
   setSelectBg: Function,
   selectBg: { ntn: number, type: string },
   setSelectType: Function
}

function BackgroundPhotos(props: Props) {
   return (
      <div>
         <div className='relative pb-2'>
            <span
               onClick={() => {
                  props.setSelectType('common')
               }}
               className='absolute left-0 top-0 p-2 hover:bg-slate-100 rounded-md cursor-pointer'><GrPrevious /></span>
            <h1 className='text-center py-2 font-semibold'>Photos</h1>
            <span
               onClick={() => {
                  props.setShowSelectBg(false)
               }}
               className='absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-md cursor-pointer'><GrClose /></span>
         </div>
         <div className='grid grid-cols-2 gap-1 max-h-[70vh] overflow-y-scroll'>
            <Background ntn={1} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={2} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={3} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={4} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={5} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={6} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={7} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={8} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={9} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={10} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={11} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={12} type='image' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
         </div>
      </div>
   )
}

export default BackgroundPhotos