import axios from 'axios'

const api = axios.create({
    baseURL: 'https://swapi.tech/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  export default api