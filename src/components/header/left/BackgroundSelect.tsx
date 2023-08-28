import React from 'react'
import BackgroundSelectCommon from './BackgroundSelectCommon'
import BackgroundPhotos from './BackgroundPhotos'
import BackgroundColors from './BackgroundColors'
import { useState } from 'react'

type Props = {
   setShowSelectBg: Function,
   setSelectBg: Function,
   selectBg: { ntn: number, type: string },
}

function BackgroundSelect(props: Props) {

   const [selectType, setSelectType] = useState('common')

   return (
      <div className=' sticky w-[350px] p-2 rounded-md drop-menu-shadow md:top-[-200px] top-[-200px] md:left-[100%] right-0 bg-white pb-3'>
         {selectType === 'common' &&
            <BackgroundSelectCommon setSelectType={setSelectType} setShowSelectBg={props.setShowSelectBg} setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
         }
         {selectType === 'photos' &&
            <BackgroundPhotos setSelectType={setSelectType} setShowSelectBg={props.setShowSelectBg} setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
         }
         {selectType === 'colors' &&
            <BackgroundColors setSelectType={setSelectType} setShowSelectBg={props.setShowSelectBg} setSelectBg={props.setSelectBg} selectBg={props.selectBg} />
         }
      </div>
   )
}

export default BackgroundSelect