import React from 'react'
import CardLabel from './CardLabel'

type Props = {
   labels: string[]
}

function CardLabels(props: Props) {
   return (
      <div>
         {props.labels.length > 0 &&
            <div className='grid grid-cols-5 gap-1 pb-0 p-2'>
               {props.labels.map((label) => {
                  return <CardLabel color={label} key={label} />
               })}
            </div>
         }
      </div>
   )
}

export default CardLabels