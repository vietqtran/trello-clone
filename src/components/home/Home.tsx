import HomeContent from "./HomeContent"
import HomeHeader from "./HomeHeader"
import React from "react"
import { RootState } from "../../../redux/reducers"
import { User } from "@types"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

function Home() {
   const router = useRouter()

   const user: User = useSelector((state: RootState) => state.user)
   if (user !== null) {
      router.push("/boards")
      return
   }
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
