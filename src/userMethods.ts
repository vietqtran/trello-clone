import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { Board } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const addRecent = async (board: Board) => {
    const data = await AsyncStorage.getItem('USER')
    const user = JSON.parse(data || '')
    const recent = [board, ...user.recentBoard]
    if (recent.length > 10) {
        recent.pop()
    }
    const newUser = { ...user, recentBoard: recent }
    window !== undefined ? await AsyncStorage.setItem('USER', JSON.stringify(newUser)) : undefined;
    await updateDoc(doc(db, 'users', user.id), newUser)
}

export const changeStar = async(id:string)=>{
    const data = await AsyncStorage.getItem('USER')
    const user = JSON.parse(data || '')
    const recent = [...user.recentBoard]
    const newRecent = recent.map((r)=>{
        if(r.id===id){
            return {...r, star: !r.star}
        }
        return r
    })
    const newUser = { ...user, recentBoard: newRecent }
    window !== undefined ? await AsyncStorage.setItem('USER', JSON.stringify(newUser)) : undefined;
    await updateDoc(doc(db, 'users', user.id), newUser)
}