import React, { memo } from "react"

type Props = {
   color: string
}

function CardLabel(props: Props) {
   return (
      <div className='col-span-1'>
         <div
            style={{ backgroundColor: props.color }}
            className={`w-full h-[8px] rounded-md bg-[${props.color}]`}
         ></div>
      </div>
   )
}

export default memo(CardLabel)
