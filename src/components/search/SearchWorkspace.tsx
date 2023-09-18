import { WorkspaceType } from '@/types'
import React, { useEffect, useState } from 'react'
import SearchWorkspaceItem from './SearchWorkspaceItem'

type Props = {
   input: string,
   workspaces: WorkspaceType[] | undefined
}

function SearchWorkspace(props: Props) {
   const [searchWorkspaces, setSearchWorkspaces] = useState<WorkspaceType[]>([])

   useEffect(()=>{
      console.log(searchWorkspaces)
      search()
   }, [props.input])

   const search = ()=>{ 
      const newWorkspaces: WorkspaceType[] = []
      props.workspaces?.forEach((w)=>{
        if(w.name.includes(props.input)){
         newWorkspaces.push(w)
        }
      })
      setSearchWorkspaces(newWorkspaces)
   }
   
   return (
      <div className='w-full'>
         {searchWorkspaces?.length===0?
            <div>
               There is no Boards
            </div>
            :
            searchWorkspaces.map((w)=>{
               return <SearchWorkspaceItem key={w.id} workspace={w}/>
            })
      }
      </div>
   )
}

export default SearchWorkspace