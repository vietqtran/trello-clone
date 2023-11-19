"use client"

import Login from "@/components/login/Login"
import ReduxWrapper from "@components/ReduxWrapper"

export default function Home() {
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

=======
>>>>>>> 535644d (change to redux)
   return (
      <ReduxWrapper>
         <main>
            <Login />
         </main>
      </ReduxWrapper>
   )
}
