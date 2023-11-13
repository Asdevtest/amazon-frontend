/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

import { BACKEND_API_URL } from '@constants/keys/env'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { errorMessageList } from './error-message-list'

export const getAxiosInstance = () => {
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
      if (
        ((error.response.status === 403 && errorMessageList.includes(error.response.data.message)) ||
          error.response.status === 401) &&
        !originalConfig._retry
      ) {
        console.log('error.response', error.response)
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

        // return axiosInstance({
        //   ...originalConfig,
        //   headers: { Authorization: `Bearer ${accessToken}` },
        // })
      } else {
        return Promise.reject(error)
      }
    },
  )

  return axiosInstance
}
