import axios from 'axios'

import { BACKEND_API_URL } from '@constants/keys/env'

import { resetTokens } from './reset-api'

const api = axios.create({
  baseURL: BACKEND_API_URL,
})

api.interceptors.request.use(config => {
  config.headers = config.headers || {}
  const storage = localStorage.getItem('UserModel')

  if (storage) {
    const userModel = JSON.parse(storage)

    config.headers.Authorization = `Bearer ${userModel.accessToken}`
  }

  return config
})

api.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config

    if ((error.response.status === 403 || error.response.status === 401) && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true

      resetTokens(originalRequest)
    }

    throw error
  },
)

export default api
