import axios from 'axios'

export default () => {  // function that return a connector
    return axios.create({
        baseURL: 'http://localhost:8081/'
    })
}

