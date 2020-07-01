import axios from 'axios'
import {baseURL} from './request';

export function login(loginForm) {
    return axios.post(baseURL + '/api/login', loginForm)
}