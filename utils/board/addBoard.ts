import { Board, WorkspaceType } from "@types";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { nanoid } from "nanoid";

export const addBoardAsync = async (
    selectBg: { ntn: number; type: string },
    title: string,
    workspace: WorkspaceType,
) => {
    try {
        const boardCreate: Board = {
            id: nanoid(),
            background: { ...selectBg },
            columns: [],
            star: false,
            title: title,
            workspaceId: workspace.id,
        }
        const boardsUpdate = workspace?.boards?.push(boardCreate)
        await updateDoc(doc(db, "workspaces", workspace.id), {
            ...workspace,
            boards: boardsUpdate,
        })
        return true
    } catch (error) {
        return false
    }
}