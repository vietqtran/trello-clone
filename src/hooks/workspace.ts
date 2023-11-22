import { collection, getDocs } from "firebase/firestore"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { WorkspaceType } from "@/types"
import { db } from "@/firebase"

export const workspaceCollectionRef = collection(db, "workspaces")


export const getWorkspaces = async () => {
    try {
        const data = await AsyncStorage.getItem("USER")
        const userId = JSON.parse(data || "").id
        const newWorkspaces: WorkspaceType[] = []
        await getDocs(workspaceCollectionRef)
            .then((dataRef) => {
                dataRef.docs.forEach((doc) => {
                    if (doc.data().userId === userId) {
                        newWorkspaces.push({
                            id: doc.id,
                            userId: String(doc.data().userId),
                            name: String(doc.data().name),
                            type: String(doc.data().type),
                            boards: doc.data().boards,
                            description: String(doc.data().description),
                        })
                    }
                })
            })
            .catch((err) => { console.log(err) })
        console.log(newWorkspaces)
        return newWorkspaces
    } catch (error) { console.log(error) }
}