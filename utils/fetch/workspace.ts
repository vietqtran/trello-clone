import { WorkspaceType } from "@types"
import { getDocs } from "firebase/firestore"
import { workspaceCollectionRef } from "../firebase/collection"

export const getWorkspaces = async () => {
    const workspaces: WorkspaceType[] = []
    await getDocs(workspaceCollectionRef)
        .then((dataRef) => {
            dataRef.docs.forEach((doc) => {
                if (doc.data().userId) {
                    workspaces.push({
                        id: doc.id,
                        userId: String(doc.data().userId),
                        name: String(doc.data().name),
                        type: String(doc.data().type),
                        boards: [ ...doc.data().boards ],
                        description: String(doc.data().description),
                    })
                }
            })
        })
        .catch((err) => { console.log(err) })
    return workspaces
}