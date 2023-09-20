import React, { useState, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Label from './Label'
import { useOnClickOutside } from 'usehooks-ts'

type Props = {
   setShowSelectLabel: Function,
   labels: string[],
   setLabels: Function,
   cardId: string
}

const labelsColor = [
   '#baf3db', '#4bce97', '#1f845a', '#cce0ff', '#579dff', '#0c66e4',
   '#f8e6a0', '#e2b203', '#946f00', '#c1f0f5', '#60c6d2', '#1d7f8c',
   '#ffe2bd', '#faa53d', '#b65c02', '#d3f1a7', '#94c748', '#5b7f24',
   '#ffd2cc', '#f87462', '#ca3521', '#fdd0ec', '#fdd0ec', '#fdd0ec',
   '#dfd8fd', '#9f8fef', '#6e5dc6', '#dcdfe4', '#8590a2', '#626f86',
]

function CardLabelSelect(props: Props) {
   const ref = useRef(null)
   const handleClickOutside = () => {
      props.setShowSelectLabel(false)
   }
   const handleClickInside = () => {
   }
   useOnClickOutside(ref, handleClickOutside)
   return (
      <div
         onClick={handleClickInside}
         ref={ref}
         className='z-10 bg-white right-0 drop-menu-shadow rounded-md p-2 absolute w-[330px]'>
         <div className='w-full relative'>
            <h1 className='w-full text-center text-sm font-semibold py-2'>Labels</h1>
            <div
               onClick={handleClickOutside}
               className='absolute rounded-md right-0 top-0 p-2 text-sm hover:bg-slate-100 cursor-pointer '><AiOutlineClose /></div>
         </div>
         <div className='px-2 mt-2 pr-0'>
            <div className='overflow-y-auto relative h-[476px]'>
               {labelsColor.map((l, index) => {
                  if (props.labels.includes(l)) {
                     return <Label cardId={props.cardId} setLabels={props.setLabels} checked={true} labels={props.labels} key={index} code={l} />
                  }
                  return <Label cardId={props.cardId} setLabels={props.setLabels} checked={false} labels={props.labels} key={index} code={l} />
               })}
            </div>
         </div>
      </div>
   )
}

export default CardLabelSelect
