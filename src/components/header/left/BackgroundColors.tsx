import React from 'react'
import Background from './Background'
import { GrClose, GrPrevious } from 'react-icons/gr'

type Props = {
   setShowSelectBg: Function,
   setSelectBg: Function,
   selectBg: { ntn: number, type: string },
   setSelectType: Function
}

function BackgroundColors(props: Props) {
   return (
      <div>
         <div className='relative pb-2'>
            <span
               onClick={() => {
                  props.setSelectType('common')
               }}
               className='absolute left-0 top-0 p-2 hover:bg-slate-100 rounded-md cursor-pointer'><GrPrevious /></span>
            <h1 className='text-center py-2 font-semibold'>Colors</h1>
            <span
               onClick={() => {
                  props.setShowSelectBg(false)
               }}
               className='absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-md cursor-pointer'><GrClose /></span>
         </div>
         <div className='grid grid-cols-3 gap-2 '>
            <Background ntn={1} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={2} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={3} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={4} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={5} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={6} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={7} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={8} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={9} type='gradient' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
         </div>
         <hr className='my-5' />
         <div className='grid grid-cols-3 gap-2 '>
            <Background ntn={1} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={2} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={3} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={4} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={5} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={6} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={7} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={8} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
            <Background ntn={9} type='color' setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
         </div>
      </div>
   )
}

export default BackgroundColors