const axios = require('axios')

const SERVICE_BASE_URL = process.env.REACT_APP_SERVICE_BASEURL || 'http://localhost:4000'

export const useService = () => {
  const instance = axios.create({
    baseURL: SERVICE_BASE_URL,
    timeout: 1000,
  })

  return instance
}

