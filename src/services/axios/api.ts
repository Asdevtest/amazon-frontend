import axios from 'axios'
import { runInAction } from 'mobx'

import { BACKEND_API_URL } from '@constants/keys/env'

import { UserModel } from '@models/user-model'

import { resetTokens } from './reset-api'

const api = axios.create({
  baseURL: BACKEND_API_URL,
})

api.interceptors.request.use(config => {
  config.headers = config.headers || {}
  const storage = localStorage.getItem('UserModel')

  if (storage) {
    const userModel = JSON.parse(storage)
    const accessToken = userModel?.accessToken

    runInAction(() => {
      UserModel.accessToken = userModel?.accessToken
      UserModel.refreshToken = userModel?.refreshToken
    })

    config.headers.Authorization = `Bearer ${accessToken}`
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

      const request = await resetTokens(originalRequest)

      return request
    }

    throw error
  },
)

export default api
