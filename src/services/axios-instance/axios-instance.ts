import axios from 'axios'

import { SettingsModel } from '@models/settings-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

export const axiosInstance = axios.create()

// axiosInstance.interceptors.request.use(
//   config => config,
//   error => Promise.reject(error),
// )

axiosInstance.interceptors.response.use(
  response => {
    return response
  },

  async error => {
    const originalConfig = error.config
    if ((error.response.status === 403 || error.response.status === 401) && !originalConfig._retry) {
      originalConfig._retry = true
      console.log('Token expired')

      const userModel = SettingsModel.loadValue('UserModel')
      const { refreshToken } = userModel
      await restApiService.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } }).then(tokenResponse => {
        const accessToken = tokenResponse?.data?.accessToken
        restApiService.setAccessToken(accessToken)
        SettingsModel.saveValue('UserModel', { ...userModel, accessToken })
        axiosInstance(originalConfig)
      })
    } else {
      return Promise.reject(error)
    }
  },
)

// handleAuthenticationError = require('superagent-intercept')(async (error, response) => {
//   if (
//     (response?.status === 403 && response?.statusText?.includes('Forbidden')) ||
//     (response?.status === 401 &&
//       (response?.statusText?.includes('Forbidden') || response?.statusText?.includes('Unauthorized')))
//   ) {
//     try {
//       const userModel = SettingsModel.loadValue('UserModel')
//       const { refreshToken } = userModel
//       await this.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } }).then(tokenResponse => {
//         this.setAccessToken(tokenResponse?.accessToken)
//         SettingsModel.saveValue('UserModel', { ...userModel, accessToken: tokenResponse?.accessToken })
//         this.retryRequestHandler(response?.req, tokenResponse?.accessToken)
//       })
//     } catch (error) {
//       console.log('Error while getting access token:', error)
//     }
//   }
// })
