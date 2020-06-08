import { SERVER } from '../config'
import axios from 'axios'

export const signup = user => {
    return axios({
            method: 'post',
            url:`api/auth/signup`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(user)
        })
}

export const signin = user => {
    return axios({
            method: 'post',
            url:`api/auth/signin`,
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(user)
        })
}

export const signout = next => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()
        return axios.get(`api/auth/signout`)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
}

export const authenticate = (res, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(res))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}
