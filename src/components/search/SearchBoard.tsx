import { Board, WorkspaceType } from '@/types'
import React, { useEffect, useState } from 'react'
import SearchBoardItem from './SearchBoardItem'

type Props = {
   input: string,
   workspaces: WorkspaceType[] | undefined
}

function SearchBoard(props: Props) {
 
   const [searchBoard, setSearchBoard] = useState<{board: Board, workspace: string}[]>([])

   useEffect(()=>{
      search()
   }, [props.input])

   const search = ()=>{ 
      const newBoards: {board: Board, workspace: string}[] = []
      props.workspaces?.forEach((w)=>{
         w.boards?.forEach((b)=>{
            if(b.title.includes(props.input)){
               newBoards.push({board: b, workspace: w.name})
            }
         })
      })
      setSearchBoard(newBoards)
   }
   
   return (
      <div className='w-full'>
         {searchBoard?.length===0?
            <div>
               There is no Boards
            </div>
            :
            searchBoard.map((b)=>{
               return <SearchBoardItem key={b.board.id} board={b.board} workspace={b.workspace}/>
            })
      }
      </div>
   )
}

export default SearchBoard