'use client'

import Search from "@/components/search/Search";
import Header from '@/components/header/Header'
import { Board, WorkspaceType } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { db } from '@/firebase'
var uniqid = require('uniqid');

export default function SearchPage() {

  const [starredBoards, setStarredBoards] = useState<Board[]>([])
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const workspaceCollectionRef = collection(db, "workspaces")
  const router = useRouter()

  useEffect(() => {
    getWorkspaces()
  }, [])
  useEffect(() => {
    getStarredBoards()
  }, [])

  const getWorkspaces = async () => {
    const data = await AsyncStorage.getItem('USER')
    const userId = JSON.parse(data || '').id
    await getDocs(workspaceCollectionRef).then((dataRef) => {
      const newWorkspaces: WorkspaceType[] = []
      dataRef.docs.forEach((doc) => {
        if (doc.data().userId === userId) {
          newWorkspaces.push({
            id: doc.id,
            userId: String(doc.data().userId),
            name: String(doc.data().name),
            type: String(doc.data().type),
            boards: [...doc.data().boards],
            description: String(doc.data().description)
          })
        }
      })
      setWorkspaces(newWorkspaces)
    }).catch((err) => { })
  }

  const getStarredBoards = async () => {
    const data = await AsyncStorage.getItem('USER')
    const userId = JSON.parse(data || '').id
    await getDocs(workspaceCollectionRef).then((dataRef) => {
      const newStarredBoards: Board[] = []
      dataRef.docs.forEach((doc) => {
        if (doc.data().userId === userId) {
          doc.data().boards?.forEach((board: Board) => {
            if (board.star) {
              newStarredBoards.push({
                id: board.id,
                workspaceId: board.workspaceId,
                title: board.title,
                columns: [...board.columns],
                star: board.star,
                background: { ...board.background }
              })
            }
          })
        }
      })
      setStarredBoards(newStarredBoards)
    }).catch((err) => { })
  }

  const addBoard = async (selectBg: { ntn: number, type: string }, title: string, workspace: string) => {
    const boardCreate: Board = {
      id: uniqid(),
      background: { ...selectBg },
      columns: [],
      star: false,
      title: title,
      workspaceId: workspace
    }
  }
  return (
    <main>
      <Header addBoard={addBoard} starredBoards={starredBoards} workspaces={workspaces} />
      <Search workspaces={workspaces}/>
    </main>
  )
}