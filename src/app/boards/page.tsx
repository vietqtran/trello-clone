import Boards from "@/components/boards/Boards";
import Header from "@/components/header/Header";
import { useAppSelector } from "@/redux/hooks";

export default function BoardPage() {
  return (
    <>
      <Header workspaces={[]} />
      <Boards />
    </>
  )
}
