import axios, { AxiosRequestConfig } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

import { BACKEND_API_URL } from '@constants/keys/env'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'

import api from '@services/axios/api'

import { t } from '@utils/translations'

import { IGetAccessToken, IPostAccessToken } from './axios.types'

export const resetTokens = async (originalRequest?: AxiosRequestConfig) => {
  const storage = localStorage.getItem('UserModel')

  if (storage) {
    const userModel = JSON.parse(storage)

    if (!userModel?.accessToken || !userModel?.refreshToken) {
      return
    }

    try {
      const response = await axios.post<IPostAccessToken, IGetAccessToken>(
        `${BACKEND_API_URL}/api/v1/users/get_access_token`,
        {
          refreshToken: userModel.refreshToken,
        },
      )

      const accessToken = response?.data?.accessToken

      localStorage.setItem('UserModel', JSON.stringify({ ...userModel, accessToken }))

      ChatModel.disconnect()
      ChatModel.init(accessToken)

      if (originalRequest) {
        return api.request(originalRequest)
      }
    } catch (e) {
      toast.error(t(TranslationKey['Access is denied']), {
        toastId: 'accessDenied',
      })
    }
  }
}

export const resetAccessTokenByTime = () => {
  const storage = localStorage.getItem('UserModel')

  if (storage) {
    const userModel = JSON.parse(storage)

    if (!userModel?.accessToken || !userModel?.refreshToken) {
      return
    }

    const decoded = jwtDecode(userModel?.accessToken as string)
    const expValue = decoded.exp || 0
    const iatValue = decoded.iat || 0
    const delayInSeconds = expValue - iatValue
    const nextResetTime = delayInSeconds - 30

    return setTimeout(() => {
      resetTokens()
      resetAccessTokenByTime()
      console.warn(`${new Date().toLocaleString()}. Next reset access token in ${nextResetTime} seconds`)
    }, nextResetTime * 1000)
  }
}
