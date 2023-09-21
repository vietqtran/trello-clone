import { Board } from "@/types"
import { addRecent } from "@/userMethods"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { memo } from "react"

// Define props for the SearchBoardItem component
type Props = {
   board: Board
   workspace: string
}

// Create the SearchBoardItem component
function SearchBoardItem(props: Props) {
   const router = useRouter()

   // Handle the click event to add the board to recent and navigate to the board
   const handleClick = () => {
      addRecent(
         props.board || {
            id: "",
            background: { ntn: 0, type: "" },
            columns: [],
            star: false,
            title: "",
            workspaceId: "",
         }
      )
      router.push(`/boards/${props.board.workspaceId}/${props.board.id}`)
   }

   return (
      <div
         onClick={handleClick}
         className='flex items-start justify-between mt-3 p-1 hover:bg-slate-100 rounded-md cursor-pointer'
      >
         {/* Board Background Image */}
         <div className='flex items-center justify-start w-fit'>
            <Image
               priority
               className='rounded-md block w-[50px] h-[40px] object-cover'
               src={`/assets/background/bg-${props.board.background.type}/bg${props.board.background.ntn}.jpg`}
               width={40}
               height={40}
               alt='board-bg'
            />
         </div>

         {/* Board Details */}
         <div className='h-full leading-5 ml-3 flex-1'>
            <div className='flex items-center justify-between'>
               <div className='max-w-[200px] md:max-w-[450px] w-auto'>
                  {/* Truncate and display the board title */}
                  <p className='truncate whitespace-nowrap font-semibold text-sm'>
                     {props.board?.title}
                  </p>
               </div>
            </div>
            <div className='max-w-[200px]'>
               {/* Truncate and display the workspace name */}
               <p className='truncate whitespace-nowrap text-xs'>
                  {props.workspace}
               </p>
            </div>
         </div>
      </div>
   )
}

// Export the SearchBoardItem component as a memoized component
export default memo(SearchBoardItem)
