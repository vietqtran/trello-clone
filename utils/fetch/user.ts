import { User } from "@types"
import { getDocs } from "firebase/firestore"
import { userCollectionRef } from "../firebase/collection"

export const getUsers = async () => {
    const users: User[] = []
    await getDocs(userCollectionRef)
        .then((dataRef) => {
            dataRef.docs.forEach((doc) => {
                users.push({
                    id: doc.id,
                    email: doc.data().email,
                    password: doc.data().password,
                    recentBoard: doc.data().recentBoard,
                    auth: doc.data().auth,
                })
            })
        })
        .catch((err) => { })
    return users
}