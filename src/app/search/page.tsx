import Search from "@/components/search/Search";
import Header from '@/components/header/Header'

export default function SearchPage() {
  return (
    <main>
      <Header starredBoards={[]} workspaces={[]} />
      <Search />
    </main>
  )
}
