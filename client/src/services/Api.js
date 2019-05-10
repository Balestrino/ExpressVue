import axios from 'axios'

// function that return a connector
export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/'
  })
}
