import axios, { Axios } from 'axios';
import { Dayjs } from 'dayjs';
import ClassItem from './types/ClassItem';

const BASE_URL = 'https://api-v2.appcrossx.com/api/1.0/app';
const HEADER_USER_AGENT = 'okhttp/3.12.1'
const HEADER_ACCEPT = 'pt-BR'
const HEADER_BOX_ID = '3007'
const HEADER_CONTENT_TYPE = 'application/json'

export class CrossAPI {

    axiosInstance!: Axios;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL :BASE_URL, 
            headers : {
                "User-Agent" :HEADER_USER_AGENT, 
                'Accept' :HEADER_ACCEPT, 
                'Content-Type' : HEADER_CONTENT_TYPE,
                'box-id' : HEADER_BOX_ID
            }
        })
    }
    setToken = (token : string) => {
        this.axiosInstance.defaults.headers.common['Authorization'] = token.toLowerCase().startsWith('bearer') ? token : `Bearer ${token}`;
    }
    
    getClassesForDate = async (date : Dayjs) => {
        const {headers, data, status} = await this.axiosInstance.get<{data : Array<ClassItem>, message : string}>(`/gym-classes?class_date=${date.format('YYYY-MM-DD')}`)
        return data.data;
    }
    
    checkin = async (classId : number) =>  {
        
        console.log({classId})
        try {
            await this.axiosInstance.post('/checkin/make', {"gym_class_id" : classId})
            return true;
        } catch (e) {console.log("Error on checkin for class " + classId)}
        return false
    }
    
    authenticate = async (email: string, password : string) => {
        const {data, status} = await this.axiosInstance.post<{data : {user : any, token : string}}>('/auth/sign-in', {email, password, type : 1})
        this.setToken(data.data.token)
    }
}