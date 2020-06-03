import axios from 'axios'
import { KEY } from '../config'

const url = 'developer.nps.gov/api/v1/parks'

export const fetchUsStates = async (state) => {

    try {
        const { data } = await axios.get(`${url}?stateCode=${state}&api_key=${KEY}`)
        return data
    } catch(err) {
        console.log(err)
    }
}