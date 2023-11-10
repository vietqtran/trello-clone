import { Board, WorkspaceType } from "@/types"
import { addRecent } from "@/userMethods"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { memo } from "react"

type Props = {
   board: Board | undefined
}

function BoardLeftPreviewItem(props: Props) {
   const router = useRouter()
   const handleClick = () => {
      addRecent(
         props.board || {
            id: "",
            background: { ntn: 0, type: "" },
            columns: [],
            star: false,
            title: "",
            workspaceId: "",
            visibility: "",
         }
      )
      router.push(`/boards/${props.board?.workspaceId}/${props.board?.id}`)
      return
   }
   return (
      <div
         onClick={handleClick}
         className='relative group px-2 flex items-center justify-between w-full text-sm py-[6px] bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 hover:bg-opacity-20 rounded-sm cursor-pointer'
      >
         <div className='flex-1 flex items-center justify-start'>
            <Image
               src={`/assets/background/bg-${props.board?.background.type}/bg${props.board?.background.ntn}.jpg`}
               width={30}
               height={30}
               alt='image'
               className='rounded-sm mr-2'
               priority
            />
            <p className='block truncate max-w-[170px]'>{props.board?.title}</p>
         </div>
      </div>
   )
}

export default memo(BoardLeftPreviewItem)
