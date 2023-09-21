import React, { memo, useEffect, useState } from "react"

type Props = {
   code: string
   labels: string[]
   checked: boolean
   setLabels: Function
   cardId: string
}

function Label(props: Props) {
   const [check, setCheck] = useState(props.checked)
   return (
      <div className=' flex items-center justify-center my-1'>
         <input
            onChange={(e) => {
               if (e.target.checked) {
                  const newLabels = props.labels
                  newLabels.push(props.code)
                  props.setLabels(newLabels)
               } else {
                  const newLabels = props.labels.filter((l) => {
                     return l !== props.code
                  })
                  props.setLabels(newLabels, props.cardId)
               }
               setCheck(e.target.checked)
            }}
            id=''
            type='checkbox'
            className='w-[16px] h-[16px] mr-2 '
            checked={check}
         />
         <div
            style={{ backgroundColor: props.code }}
            className={`w-full h-[35px] bg-inherit rounded-md`}
         ></div>
      </div>
   )
}

export default memo(Label)
