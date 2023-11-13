import { jwtDecode } from 'jwt-decode'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

export const resetAccessTokenByTime = (
  currentAccessToken: string | undefined,
  currentRefreshToken: string | undefined,
) => {
  if (!currentAccessToken) return

  const decoded = jwtDecode(currentAccessToken)
  const currentTimeInSeconds = Math.floor(Date.now() / 1000)
  const expValue = decoded.exp || 0
  const delayInSeconds = expValue - currentTimeInSeconds

  setTimeout(async () => {
    const userModelData = SettingsModel.loadValue('UserModel')
    const refreshToken = userModelData.refreshToken

    if (!refreshToken || currentRefreshToken !== refreshToken) return

    const response = await UserModel.getAccessToken(refreshToken)
    const accessToken = response?.accessToken

    SettingsModel.saveValue('UserModel', { ...userModelData, accessToken })
    UserModel.setAccessToken(accessToken)

    ChatModel.disconnect()
    ChatModel.init(accessToken)

    console.log('Reset access token')
    console.log(`Next reset access token in ${delayInSeconds - 30} seconds`)

    resetAccessTokenByTime(accessToken, refreshToken)
  }, (delayInSeconds - 30) * 1000)
}
