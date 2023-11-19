"use client"

import ReduxWrapper from "@components/ReduxWrapper"
import SignUp from "@/components/signup/SignUp"

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
            <SignUp />
         </main>
      </ReduxWrapper>
   )
}
