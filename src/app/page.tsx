"use client"

import Home from "@/components/home/Home"
import ReduxWrapper from "@components/ReduxWrapper"

export default function HomePage() {
<<<<<<< HEAD
   const router = useRouter()
   const start = async () => {
      try {
         const data = await AsyncStorage.getItem("USER")
         if (data) {
            router.push("/boards")
            return
         }
      } catch (error) {}
   }

   start()

   return <Home />
=======
   return (
      <ReduxWrapper>
         <Home />
      </ReduxWrapper>
   )
>>>>>>> 535644d (change to redux)
}
