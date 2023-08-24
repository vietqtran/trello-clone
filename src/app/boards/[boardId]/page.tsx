'use client'

import Board from "@/components/boards/board/Board";
import HeaderBoard from "@/components/header/HeaderBoard";
import { usePathname } from "next/navigation";

export default function BoardPage() {
  const pathName = usePathname()

  return (
    <>
      <div className={`max-w-[100vw] flex flex-row flex-wrap items-center justify-start max-h-100[vh] bg-[url('/assets/background/bg-image/bg3.jpg')] bg-center bg-cover`}>
        <HeaderBoard />
        <Board boardId={pathName} />
      </div>
    </>
  )
}
