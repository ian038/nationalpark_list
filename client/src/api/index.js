import axios from 'axios'

const url = 'https://developer.nps.gov/api/v1/parks'

const API_KEY = process.env.REACT_APP_API_KEY

export const fetchData = async (usState) => {

    try {
        const { data: { data } } = await axios.get(`${url}?stateCode=${usState}&api_key=${API_KEY}`)
        return data
    } catch(err) {
        console.log(err)
    }
}