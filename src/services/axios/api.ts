import axios from 'axios'
import { toast } from 'react-toastify'

import { BACKEND_API_URL } from '@constants/keys/env'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

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

      const storage = localStorage.getItem('UserModel')

      if (storage) {
        const userModel = JSON.parse(storage)

        try {
          const response = await axios.post<any>(`${BACKEND_API_URL}/api/v1/users/get_access_token`, {
            refreshToken: userModel.refreshToken,
          })

          const accessToken = response?.data?.accessToken

          SettingsModel.saveValue('UserModel', { ...userModel, accessToken })
          UserModel.setAccessToken(accessToken)

          ChatModel.disconnect()
          ChatModel.init(accessToken)

          return api.request(originalRequest)
        } catch (e) {
          toast.error(t(TranslationKey['Access is denied']), {
            toastId: 'accessDenied',
          })
        }
      }
    }

    throw error
  },
)

export default api
