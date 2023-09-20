import React, { memo } from 'react'
import { IoIosNotifications } from 'react-icons/io'

function Notifications() {
   return (
      <div className='p-1 hover:bg-slate-200 rounded-full cursor-pointer ml-1'>
         <div className='p-1 rounded-full relative text-xl rotate-[45deg]'>
            <IoIosNotifications />
         </div>
      </div>
   )
}

export default memo(Notifications)