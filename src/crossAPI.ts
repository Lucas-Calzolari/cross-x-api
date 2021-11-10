import axios from 'axios';
import { Dayjs } from 'dayjs';
import ClassItem from './types/ClassItem';
axios.defaults.baseURL = 'https://api-v2.appcrossx.com/api/1.0/app';
axios.defaults.headers.common['User-Agent'] = 'okhttp/3.12.1'
axios.defaults.headers.common['Accept'] = 'pt-BR'
axios.defaults.headers.common['box-id'] = '3007'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const setToken = (token : string) => {
    axios.defaults.headers.common['Authorization'] = token.toLowerCase().startsWith('bearer') ? token : `Bearer ${token}`;
}

export const getClassesForDate = async (date : Dayjs) => {
    const {headers, data, status} = await axios.get<{data : Array<ClassItem>, message : string}>(`/gym-classes?class_date=${date.format('YYYY-MM-DD')}`)
    return data.data;
}

export const checkin = async (classId : number) =>  {
    
    console.log({classId})
    try {
        await axios.post('/checkin/make', {"gym_class_id" : classId})
        return true;
    } catch (e) {console.log("Error on checkin for class " + classId)}
    return false
}

export const authenticate = async (email: string, password : string) => {
    const {data, status} = await axios.post<{data : {user : any, token : string}}>('/auth/sign-in', {email, password, type : 1})
    setToken(data.data.token)
}