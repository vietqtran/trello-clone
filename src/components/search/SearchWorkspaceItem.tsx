import { WorkspaceType } from "@/types"
import { useRouter } from "next/navigation"
import React, { memo } from "react"

// Define props for the SearchWorkspaceItem component
type Props = {
   workspace: WorkspaceType | undefined // The workspace information (or undefined if not available)
}

// Create the SearchWorkspaceItem component
function SearchWorkspaceItem(props: Props) {
   const router = useRouter()

   // Handle the click event to navigate to the workspace
   const handleClick = () => {
      router.push(`/boards/${props.workspace?.id}`)
   }

   return (
      <div
         onClick={handleClick}
         className='flex items-center justify-between mt-3 hover:bg-slate-100 rounded-md cursor-pointer p-2'
      >
         {/* Workspace Icon */}
         <div className='bg-gradient-to-r from-sky-500 to-indigo-500 rounded-md p-5 flex items-center justify-start relative'>
            {/* Display the first letter of the workspace name */}
            <span className='absolute font-semibold text-xl text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
               {props.workspace?.name.toUpperCase().charAt(0)}
            </span>
         </div>

         {/* Workspace Details */}
         <div className='h-full leading-5 ml-3 flex-1'>
            <div className='flex items-center justify-between'>
               <div className='max-w-[200px] md:max-w-[450px] w-auto'>
                  {/* Truncate and display the workspace name */}
                  <p className='truncate whitespace-nowrap font-semibold text-sm'>
                     {props.workspace?.name}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

// Export the SearchWorkspaceItem component as a memoized component
export default memo(SearchWorkspaceItem)
