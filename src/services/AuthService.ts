import { AxiosResponse } from 'axios';
import $api from '../axios';
import { AuthResponse } from '../types/AuthResponse';

export default class AuthService {
    static async login(username:string, password:string):Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/signin', {username, password})
    }
    static async register(username:string, password:string):Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/signup', {username, password})
    }
    static async logout():Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>('/auth/logout')
    }
}