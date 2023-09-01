import Boards from "@/components/boards/Boards";
import Header from "@/components/header/Header";

export default function BoardsPage() {
  return (
    <div>
      <Header workspaces={[]} />
      <Boards />
    </div>
  )
}
