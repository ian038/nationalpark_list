import { SERVER } from '../config'

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