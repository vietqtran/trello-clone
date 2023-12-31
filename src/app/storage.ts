import AsyncStorage from "@react-native-async-storage/async-storage"

const getUser = async () => {
   try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
   } catch (e) {
   }
};

const storeUser = async (value: any) => {
   try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('USER', jsonValue)
   } catch (e) {
   }
};

export { getUser, storeUser }