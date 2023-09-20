'use client'

import SignUp from "@/components/signup/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const start = async () => {
    const data = await AsyncStorage.getItem('USER')
    if (data) {
      router.push('/boards')
    }
  }
  start()
  return (
    <main>
      <SignUp />
    </main>
  )
}
