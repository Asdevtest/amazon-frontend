import axios from 'axios'
import { runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { BACKEND_API_URL } from '@constants/keys/env'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

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
  config => config,
  async error => {
    const originalRequest = error.config
    const errorMessage = error?.response?.data?.message || ''
    const statusCode = error?.response?.status

    if (errorMessage.includes('Access denied.')) {
      toast.error(t(TranslationKey['Access is denied']))
    } else if ((statusCode === 403 || statusCode === 401) && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true

      const request = await resetTokens(originalRequest)

      return request
    } else if (errorMessage.includes('Not enough money on balance')) {
      // 409 - methods with payments
      toast.error(t(TranslationKey['Not enough money on balance']))
    }

    throw error
  },
)

export default api
