'use client'

import Home from "@/components/home/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()
  const start = async () => {
    try {
      const data = await AsyncStorage.getItem('USER')
      if (data) {
        router.push('/boards')
      }
    } catch (error) {

    }
  }
  start()
  return (
    <Home />
  )
}
