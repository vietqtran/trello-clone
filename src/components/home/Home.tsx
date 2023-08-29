import React from 'react'
import HomeHeader from './HomeHeader'
import HomeContent from './HomeContent'

function Home() {
   return (
      <div className='w-full relative bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[100vh]'>
         <div className='fixed top-0 left-0 w-full'>
            <HomeHeader />
         </div>
         <HomeContent />
      </div>
   )
}

export default Home