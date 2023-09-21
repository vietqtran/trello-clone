import { WorkspaceType } from "@/types"
import React, { useEffect, useState } from "react"
import SearchWorkspaceItem from "./SearchWorkspaceItem"

// Define props for the SearchWorkspace component
type Props = {
   input: string // The search input string
   workspaces: WorkspaceType[] | undefined // The list of workspaces (or undefined if not available)
}

// Create the SearchWorkspace component
function SearchWorkspace(props: Props) {
   const [searchWorkspaces, setSearchWorkspaces] = useState<WorkspaceType[]>([])

   // Use useEffect to trigger a search whenever the input changes
   useEffect(() => {
      search()
   }, [props.input])

   // Perform the search based on the input
   const search = () => {
      const newWorkspaces: WorkspaceType[] = []

      props.workspaces?.forEach((w) => {
         if (w.name.includes(props.input)) {
            newWorkspaces.push(w)
         }
      })

      setSearchWorkspaces(newWorkspaces)
   }

   return (
      <div className='w-full'>
         {/* Display a message if there are no matching workspaces */}
         {searchWorkspaces?.length === 0 ? (
            <div>There are no Boards</div>
         ) : (
            // Map and render the matching workspaces using SearchWorkspaceItem
            searchWorkspaces.map((w) => {
               return <SearchWorkspaceItem key={w.id} workspace={w} />
            })
         )}
      </div>
   )
}

// Export the SearchWorkspace component
export default SearchWorkspace
