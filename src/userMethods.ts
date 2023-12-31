import { db } from '@/firebase'
import { collection, getDocs, addDoc, doc, updateDoc } from '@firebase/firestore'
import { Board } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const addRecent = async (board: Board) => {
    try {
        const data = await AsyncStorage.getItem('USER')
        const user = JSON.parse(data || '')
        const newRecent: Board[] = []
        user.recentBoard.forEach((b: Board) => {
            if(b.id!==board.id){
                newRecent.push(b)
            }
        })
        const recent = [board, ...newRecent]
        if (recent.length > 10) {
            recent.pop()
        }
        console.log(recent)
        const newUser = { ...user, recentBoard: recent }
        try {
            await AsyncStorage.setItem('USER', JSON.stringify(newUser))
        } catch (error) {

        }
        await updateDoc(doc(db, 'users', user.id), newUser)
    } catch (error) {

    }
}

export const changeStar = async (id: string) => {
    try {
        const data = await AsyncStorage.getItem('USER')
        const user = JSON.parse(data || '')
        const recent = [...user.recentBoard]
        const newRecent = recent.map((r) => {
            if (r.id === id) {
                return { ...r, star: !r.star }
            }
            return r
        })
        const newUser = { ...user, recentBoard: newRecent }
        await AsyncStorage.setItem('USER', JSON.stringify(newUser))
        await updateDoc(doc(db, 'users', user.id), newUser)
    } catch (error) {

    }
}