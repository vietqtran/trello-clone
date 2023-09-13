import React from 'react'

type Props = {
   type: string,
   children: React.ReactNode
}

function CardEdit(props: Props) {
   return (
      <div className=' py-2 min-w-[170px] px-2 rounded-md my-2 bg-slate-100 hover:bg-slate-200 cursor-pointer w-full flex items-center justify-start'>
         <div className='mr-2'>
            {props.children}
         </div>
         <div className='text-sm'>
            {props.type}
         </div>
      </div>
   )
}

export default CardEdit
