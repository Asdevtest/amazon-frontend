import axios from 'axios'
import { toast } from 'react-toastify'

import { BACKEND_API_URL } from '@constants/keys/env'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { UserModel } from '@models/user-model'

import { getInfoFromStorage } from '@utils/storage/get-info-from-storage'
import { saveInfoToStorage } from '@utils/storage/save-info-to-storage'
import { t } from '@utils/translations'

import { IGetAccessToken, IPostAccessToken } from './api.types'

const isUnauthorizedOrForbidden = (error: any): boolean => {
  return error.response && (error.response.status === 401 || error.response.status === 403)
}

const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await axios.post<IPostAccessToken, IGetAccessToken>(
      `${BACKEND_API_URL}/api/v1/users/get_access_token`,
      { refreshToken },
    )

    return response.data.accessToken
  } catch (e) {
    return null
  }
}

const saveUserModel = (userModel: any) => {
  saveInfoToStorage('UserModel', userModel)
  UserModel.setAccessToken(userModel.accessToken)
}

const reinitializeChat = (accessToken: string) => {
  ChatModel.disconnect()
  ChatModel.init(accessToken)
}

const displayAccessDeniedError = () => {
  toast.error(t(TranslationKey['Access is denied']), {
    toastId: 'accessDenied',
  })
}

const api = axios.create({
  baseURL: BACKEND_API_URL,
})

api.interceptors.request.use(config => {
  config.headers = config.headers || {}
  const userModel = getInfoFromStorage('UserModel')

  if (userModel) {
    config.headers.Authorization = `Bearer ${userModel.accessToken}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (isUnauthorizedOrForbidden(error) && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      const userModel = getInfoFromStorage('UserModel')

      if (userModel) {
        try {
          const accessToken = await refreshAccessToken(userModel.refreshToken)

          if (accessToken) {
            saveUserModel({ ...userModel, accessToken })
            reinitializeChat(accessToken)

            return api.request(originalRequest)
          }
        } catch (e) {
          displayAccessDeniedError()
        }
      }
    }

    throw error
  },
)

export default api
