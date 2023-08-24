'use client'

import Board from "@/components/boards/board/Board";
import { usePathname } from "next/navigation";

export default function BoardPage() {
  const pathName = usePathname()

  return (
    <>
      <Board boardId={pathName} />
    </>
  )
}
