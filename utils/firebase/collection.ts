import { collection } from "firebase/firestore";
import { db } from ".";

export const workspaceCollectionRef = collection(db, "workspaces")
export const userCollectionRef = collection(db, "users")