import axios from "axios";
import {AuthDataType} from "../types/types";

const token = localStorage.getItem('tokenInfo') ? (JSON.parse(localStorage.getItem('tokenInfo')!)).access_token :
    "v3.r.137440105.860cdecdb16b3f21a30e2d26bdf4d44125f9c6c7.b115ab677de0ba9dc95e3229942c083ef3d0d7ad"

export const authData: AuthDataType = {
    login: 'sergei.stralenia@gmail.com',
    password: 'paralect123',
    client_id: 2356,
    client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    hr: 0
}

const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
    withCredentials: true,
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id': authData.client_secret,
        'Authorization': `Bearer ${token}`
    }
})

export const authAPI = {
    login(authData: AuthDataType) {
        const {login, password, client_id, client_secret, hr} = authData
        return instance.get(`oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}`)
    }
}


export const vacanciesAPI = {
    getVacancies(page: number, count: number) {
        return instance.get(`vacancies/?published=1&page=${page}&count=${count}`)
    },
    searchVacancies(word: string, catalog: number | null, payment_from: number, payment_to: number, page: number, count: number) {
        return instance.get(`vacancies/?published=1&keyword=${word}&catalogues=${catalog}&payment_from=${payment_from}&payment_to=${payment_to}&page=${page}&count=${count}`)
    },
    getCatalogues() {
        return instance.get(`catalogues/`)
    },
    getVacancy(id: number) {
        return instance.get(`vacancies/${id}`)
    }

}