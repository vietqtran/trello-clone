'use client'

import Board from "@/components/boards/board/Board";
import HeaderBoard from "@/components/header/HeaderBoard";
import { usePathname } from "next/navigation";

export default function BoardPage() {
  const pathName = usePathname()

  return (
    <>
      <div className={`max-w-[100vw] overflow-hidden flex flex-col items-center justify-start max-h-[100vh] min-h-[100vh] bg-[url('/assets/background/bg-image/bg3.jpg')] bg-center bg-cover`}>
        <HeaderBoard />
        <Board boardId={pathName} />
      </div>
    </>
  )
}
