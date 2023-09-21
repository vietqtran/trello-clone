import { Board, WorkspaceType } from "@/types"
import React, { useEffect, useState } from "react"
import SearchBoardItem from "./SearchBoardItem"

// Define props for the SearchBoard component
type Props = {
   input: string // The search input string
   workspaces: WorkspaceType[] | undefined // The list of workspaces (or undefined if not available)
}

// Create the SearchBoard component
function SearchBoard(props: Props) {
   const [searchBoard, setSearchBoard] = useState<
      { board: Board; workspace: string }[]
   >([])

   // Use useEffect to trigger a search whenever the input changes
   useEffect(() => {
      search()
   }, [props.input])

   // Perform the search based on the input
   const search = () => {
      const newBoards: { board: Board; workspace: string }[] = []

      props.workspaces?.forEach((w) => {
         w.boards?.forEach((b) => {
            if (b.title.toLowerCase().includes(props.input.toLowerCase())) {
               newBoards.push({ board: b, workspace: w.name })
            }
         })
      })

      setSearchBoard(newBoards)
   }

   return (
      <div className='w-full'>
         {/* Display a message if there are no matching boards */}
         {searchBoard?.length === 0 ? (
            <div>There are no Boards</div>
         ) : (
            // Map and render the matching boards using SearchBoardItem
            searchBoard.map((b) => {
               return (
                  <SearchBoardItem
                     key={b.board.id}
                     board={b.board}
                     workspace={b.workspace}
                  />
               )
            })
         )}
      </div>
   )
}

// Export the SearchBoard component
export default SearchBoard
