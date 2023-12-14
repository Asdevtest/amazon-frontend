import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

const persistProperties = ['accessToken', 'userInfo', 'masterUserId', 'userId', 'refreshToken']

const stateModelName = 'UserModel'

class UserModelStatic {
  accessToken = undefined
  refreshToken = undefined
  userInfo = undefined
  userId = undefined // не получилось обойти ошибку "Property '_Id' does not exist on type 'never'." в тайпскрипт, по этому создал отдельную переменнную
  masterUserId = undefined
  isHydrated = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
    makePersistable(this, { name: stateModelName, properties: persistProperties }).then(persistStore => {
      runInAction(() => {
        this.isHydrated = persistStore.isHydrated
      })
    })
  }

  isAuthenticated() {
    return !!this.accessToken
  }

  async signOut() {
    await restApiService.userApi.apiV1UsersLogoutPost({ body: {} })
    this.accessToken = undefined
    this.refreshToken = undefined
    this.userInfo = undefined
    this.userId = undefined
    this.masterUserId = undefined
    SettingsModel.setAuthorizationData('', '')
    ChatModel.disconnect()
    SettingsModel.setBreadcrumbsForProfile(null)
  }

  async signIn(email, password) {
    const result = await restApiService.userApi.apiV1UsersSignInPost({
      body: {
        email,
        password,
      },
    })

    const response = result.data
    const accessToken = response.accessToken
    const refreshToken = response.refreshToken

    runInAction(() => {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    })

    SettingsModel.setAuthorizationData(accessToken, refreshToken)
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken
  }

  async signUp({ name, email, password }) {
    const response = await restApiService.userApi.apiV1UsersPost({
      body: {
        name,
        email,
        password,
      },
    })

    runInAction(() => {
      this.userInfo = response.data
    })
  }

  async isCheckUniqueUser({ name, email }) {
    const response = await restApiService.userApi.apiV1UsersCheckIsUniqueNameOrEmailPost({
      body: {
        name,
        email,
      },
    })
    return response.data
  }

  async changeUserPassword({ oldPassword, newPassword }) {
    const response = await restApiService.userApi.apiV1UsersChangePasswordPatch({
      body: {
        oldPassword,
        newPassword,
      },
    })
    return response.data
  }

  async getUserInfo() {
    try {
      const responseData = await restApiService.userApi.apiV1UsersInfoGet(
        { noCache: true },
        {
          headers: { 'Cache-Control': 'no-cache' },
        },
      )
      const response = responseData.data

      runInAction(() => {
        this.userInfo = { ...this.userInfo, ...response }
        this.userId = response._id
        this.masterUserId = response.masterUser?._id
      })
      return response
    } catch (error) {
      this.accessToken = undefined
      this.userInfo = undefined
      this.userId = undefined
      this.masterUserId = undefined
      ChatModel.disconnect()

      SettingsModel.setBreadcrumbsForProfile(null)
    }
  }

  async getUsersInfoCounters() {
    try {
      const response = await restApiService.userApi.apiV1UsersInfoCountersGet()

      runInAction(() => {
        this.userInfo = { ...this.userInfo, ...response.data }
      })
    } catch (error) {
      this.accessToken = undefined
      this.userInfo = undefined
      this.userId = undefined
      this.masterUserId = undefined
      ChatModel.disconnect()

      SettingsModel.setBreadcrumbsForProfile(null)
    }
  }

  async getPlatformSettings() {
    const response = await restApiService.userApi.apiV1UsersPlatformSettingsGet()
    return response.data
  }

  async getUserInfoById(guid) {
    try {
      const response = await restApiService.userApi.apiV1UsersInfoGuidGet({ guid })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async changeUserInfo(body) {
    const response = await restApiService.userApi.apiV1UsersMePatch({ body })
    return response.data
  }

  async linkSubUser(body) {
    const response = await restApiService.userApi.apiV1UsersLinkSubUserPatch({ body })
    return response.data
  }

  async unlinkSubUser(body) {
    const response = await restApiService.userApi.apiV1UsersUnlinkSubUserPatch({ body })
    return response.data
  }

  async getMySubUsers() {
    const response = await restApiService.userApi.apiV1UsersMySubUsersGet()
    return response.data
  }

  async getUserSettingsMy() {
    const response = await restApiService.userApi.apiV1UsersUserSettingsMyGet()
    return response.data
  }

  async createUserSettings(data) {
    const response = await restApiService.userApi.apiV1UsersUserSettingsPost({ body: data })
    return response.data
  }

  async editUserSettings(guid, body) {
    const response = await restApiService.userApi.apiV1UsersUserSettingsMyPatch({ guid, body })
    return response
  }

  async getUserSettingsAvailable() {
    const response = await restApiService.userApi.apiV1UsersUserSettingsAvailableGet()
    return response.data
  }

  async patchSubNote(id, comment) {
    const response = await restApiService.userApi.apiV1UsersSubNotePatch({
      body: {
        userId: id,
        comment,
      },
    })

    return response.data
  }

  async getMasterUsers(role, guid, specs) {
    const response = await restApiService.userApi.apiV1UsersMastersGet({ role, guid, specs })
    return response.data
  }

  async getUsersNotificationsPagMy(data) {
    const response = await restApiService.userApi.apiV1UsersNotificationsPagMyGet(filterNullValues(data))
    return response.data
  }

  async addNotificationsToArchive(body) {
    const response = await restApiService.userApi.apiV1UsersNotificationsArchivePatch({ body })
    return response.data
  }

  async changeSubUserSpec(guid, body) {
    const response = await restApiService.userApi.apiV1UsersShareSpecSubGuidPost({ guid, body })
    return response.data
  }

  async getAccessToken(refreshToken) {
    const response = await restApiService.userApi.apiV1UsersGetAccessTokenPost({ body: { refreshToken } })
    return response.data
  }
}

export const UserModel = new UserModelStatic()
