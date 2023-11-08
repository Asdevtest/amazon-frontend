import axios from 'axios'

import { BACKEND_API_URL } from '@constants/keys/env'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

export const getAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
  })

  axiosInstance.interceptors.request.use(async config => {
    const userModel = SettingsModel.loadValue('UserModel')
    const { accessToken } = userModel

    if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  })

  axiosInstance.interceptors.response.use(
    response => {
      return response
    },

    async error => {
      const originalConfig = error.config
      if ((error.response.status === 403 || error.response.status === 401) && !originalConfig._retry) {
        originalConfig._retry = true

        const userModel = SettingsModel.loadValue('UserModel')
        const { refreshToken } = userModel

        const tokenResponse = await restApiService.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } })

        const accessToken = tokenResponse?.data?.accessToken

        SettingsModel.saveValue('UserModel', { ...userModel, accessToken })

        ChatModel.disconnect()
        ChatModel.init(accessToken)

        return axiosInstance.request(originalConfig)
      } else {
        return Promise.reject(error)
      }
    },
  )

  return axiosInstance
}
