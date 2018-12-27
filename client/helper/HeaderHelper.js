import { AsyncStorage } from 'react-native';

export const tokenHeader = async () => {
    const token = await AsyncStorage.getItem('userToken')
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}