'use client'

import Workspace from "@/components/boards/workspace/Workspace";
import Header from "@/components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { collection, getDocs } from '@firebase/firestore'
import { db } from "@/firebase";
import { useEffect, useState } from 'react'
import { WorkspaceType } from "@/types";

export default function WorkspacePage() {

  const id = usePathname().split('/').at(-1)
  const workspaceCollectionRef = collection(db, "users")
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>()
  const router = useRouter()

  // useEffect(() => {
  //   const getUsers = async () => {
  //     await getDocs(workspaceCollectionRef).then((dataRef) => {
  //       const newWorkspaces: WorkspaceType[] = []
  //       for (let i = 0; i < dataRef.docs.length; i++) {
  //         newWorkspaces.push({
  //           id: dataRef.docs[i].id,
  //           userId: user.id,
  //           name: dataRef.docs[i].data().name,
  //           boards: dataRef.docs[i].data().boards,
  //           type: dataRef.docs[i].data().type,
  //           description: dataRef.docs[i].data().description
  //         })
  //         break;
  //       }
  //       setWorkspaces(newWorkspaces)
  //     })
  //   }
  //   getUsers()
  // }, [workspaceCollectionRef, user.id])

  const workspace = workspaces?.find((w) => w.id == id)
  // if (!workspace) {
  //   router.push('/boards')
  // }
  return (
    <div>
      <Header workspaces={workspaces} />
      <Workspace workspaces={workspaces} workspace={workspace} />
    </div>
  )
}
