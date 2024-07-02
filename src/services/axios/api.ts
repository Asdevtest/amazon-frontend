import axios from 'axios'
import { toast } from 'react-toastify'

import { BACKEND_API_URL } from '@constants/keys/env'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { t } from '@utils/translations'

const api = axios.create({
  baseURL: BACKEND_API_URL,
})

api.interceptors.request.use(config => {
  config.headers = config.headers || {}
  const userModel = SettingsModel.loadValue('UserModel')
  config.headers.Authorization = `Bearer ${userModel.accessToken}`

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
      const userModel = SettingsModel.loadValue('UserModel')

      try {
        const response = await restApiService.userApi.apiV1UsersGetAccessTokenPost({
          body: { refreshToken: userModel.refreshToken },
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

    throw error
  },
)

export default api

/* export const getAxiosInstance = () => {
  let isRefreshing = false
  let failedQueue: any = []

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom: any) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })

    failedQueue = []
  }

  const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
  })

  axiosInstance.interceptors.request.use((config: any) => {
    if (config?._retry) {
      return config
    } else {
      const userModel = SettingsModel.loadValue('UserModel')
      if (config.headers && userModel && userModel.accessToken) {
        config.headers.Authorization = `Bearer ${userModel.accessToken}`
      }
      return config
    }
  })

  axiosInstance.interceptors.response.use(
    response => {
      return response
    },

    async error => {
      const originalConfig = error.config

      if (error.response.status === 401 && error.response.data.message === 'Invalid password or email address.') {
        return
      }

      if (
        ((error.response.status === 403 && errorMessageList.includes(error.response.data.message)) ||
          error.response.status === 401) &&
        !originalConfig._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalConfig.headers.Authorization = 'Bearer ' + token
              return axiosInstance(originalConfig)
            })
            .catch(err => {
              return Promise.reject(err)
            })
        }

        originalConfig._retry = true
        isRefreshing = true

        const userModel = await SettingsModel.loadValue('UserModel')
        const refreshToken = userModel.refreshToken

        return new Promise((resolve, reject) => {
          restApiService.userApi
            .apiV1UsersGetAccessTokenPost({ body: { refreshToken } })
            .then(({ data }) => {
              const accessToken = data?.accessToken

              originalConfig.headers.Authorization = 'Bearer ' + accessToken

              SettingsModel.saveValue('UserModel', { ...userModel, accessToken })
              UserModel.setAccessToken(accessToken)

              ChatModel.disconnect()
              ChatModel.init(accessToken)

              processQueue(null, accessToken)
              resolve(axiosInstance(originalConfig))
            })
            .catch(err => {
              processQueue(err, null)
              reject(err)
            })
            .finally(() => {
              isRefreshing = false
            })
        })
      } else if (
        error.response?.data?.statusCode === 403 &&
        accessDeniedErrorMessageList.includes(error?.response?.data?.message)
      ) {
        toast.error(t(TranslationKey['Access is denied']), {
          toastId: 'accessDenied',
        })
        return Promise.reject(error)
      } else if (error.response?.data?.statusCode === 500) {
        toast.error(t(TranslationKey['Something went wrong']))
        return Promise.reject(error)
      }
    },
  )

  return axiosInstance
} */
