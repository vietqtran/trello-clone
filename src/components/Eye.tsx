import React from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

interface EyeProps {
   show: boolean,
   setShow: Function
}

function Eye(props: EyeProps) {

   return (
      <div className='text-slate-500 p-3 cursor-pointer'
         onClick={() => {
            props.setShow(!props.show)
         }}
      >{!props.show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</div>
   )
}

export default Eye