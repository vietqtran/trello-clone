"use client"

import Login from "@/components/login/Login"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "next/navigation"

export default function Home() {
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

   return (
      <main>
         <Login />
      </main>
   )
}
