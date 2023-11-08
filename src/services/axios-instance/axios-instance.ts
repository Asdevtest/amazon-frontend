import axios from 'axios'

import { BACKEND_API_URL } from '@constants/keys/env'

import { SettingsModel } from '@models/settings-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

export const getAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
  })

  axiosInstance.interceptors.response.use(
    response => {
      return response
    },

    async error => {
      const originalConfig = error.config
      if ((error.response.status === 403 || error.response.status === 401) && !originalConfig._retry) {
        originalConfig._retry = true
        const userModel = await SettingsModel.loadValue('UserModel')
        const { refreshToken } = userModel
        const tokenResponse = await restApiService.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } })
        const accessToken = tokenResponse?.data?.accessToken
        await restApiService.setAccessToken(accessToken)
        await SettingsModel.saveValue('UserModel', { ...userModel, accessToken })
        const data = await axiosInstance({
          ...originalConfig,
          headers: {
            ...originalConfig.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        })
        return data
      } else {
        return Promise.reject(error)
      }
    },
  )

  return axiosInstance
}
