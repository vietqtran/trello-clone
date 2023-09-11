import Search from "@/components/search/Search";
import Header from '@/components/header/Header'
import { Board } from "@/types";
var uniqid = require('uniqid');
export default function SearchPage() {

  const addBoard = async (selectBg: { ntn: number, type: string }, title: string, workspace: string) => {
    const boardCreate: Board = {
      id: uniqid(),
      background: { ...selectBg },
      columns: [],
      star: false,
      title: title,
      workspaceId: workspace
    }
    return (
      <main>
        <Header addBoard={addBoard} starredBoards={[]} workspaces={[]} />
        <Search />
      </main>
    )
  }
}