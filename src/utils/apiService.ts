import AsyncStorage from '@react-native-async-storage/async-storage';

export const SetAccessToken = async (token: string, user: {userid: number, role: string}) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const GetToken = async () => {
    return await AsyncStorage.getItem('token');
};

export const GetUser = async () => {
    let user = await AsyncStorage.getItem('user');
    return user != null ? JSON.parse(user) : null;
};

export const apiService = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    let headers = new Headers();
    let options: IOptions = {
        method,
        headers
    }

    if(method === 'PUT' || method === 'POST') {
        headers.append('Content-type', 'application/json');
        options.body = JSON.stringify(body);
    }

    try {
        let res = await fetch(uri, options);
        if(res.ok) {
            return <T>(await res.json());
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

interface IOptions {
    [key: string]: any;
}