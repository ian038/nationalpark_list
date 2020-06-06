import axios from 'axios'

const url = 'https://developer.nps.gov/api/v1/parks'

const API_KEY = process.env.REACT_APP_API_KEY

export const fetchData = (usState) => {
    return axios.get(`${url}?stateCode=${usState}&api_key=${API_KEY}`)
                .then(res => {
                    const { data: { data } } = res
                    return data
                }).catch(err => {
                    console.log(err)
                })
}