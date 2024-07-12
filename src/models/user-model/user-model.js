import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { LOCAL_STORAGE_KEYS } from '@constants/keys/local-storage'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'

import { restApiService } from '@services/rest-api-service/rest-api-service'

import { filterNullValues } from '@utils/object'

const persistProperties = ['accessToken', 'userInfo', 'masterUserId', 'userId', 'refreshToken', 'platformSettings']

class UserModelStatic {
  accessToken = undefined
  refreshToken = undefined
  userInfo = undefined
  userId = undefined // не получилось обойти ошибку "Property '_Id' does not exist on type 'never'." в тайпскрипт, по этому создал отдельную переменнную
  masterUserId = undefined
  isHydrated = false
  platformSettings = undefined

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
    makePersistable(this, { name: LOCAL_STORAGE_KEYS.USER_MODEL, properties: persistProperties }).then(persistStore => {
      runInAction(() => {
        this.isHydrated = persistStore.isHydrated
      })
    })
  }

  isAuthenticated() {
    return !!this.accessToken
  }

  async signOut() {
    await this.logout()
    runInAction(() => {
      this.accessToken = undefined
      this.refreshToken = undefined
      this.userInfo = undefined
      this.userId = undefined
      this.masterUserId = undefined
      this.platformSettings = undefined
    })
    SettingsModel.setAuthorizationData('', '')
    ChatModel.disconnect()
    SettingsModel.setBreadcrumbsForProfile(null)
  }

  async signIn(body) {
    const result = await restApiService.userApi.apiV1UsersSignInPost({ body })

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
      const response = await restApiService.userApi.apiV1UsersInfoCountersGet({ noCache: true })

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

  async getUserInfoById(guid) {
    try {
      const response = await restApiService.userApi.apiV1UsersInfoGuidGet({ guid })
      return response.data
    } catch (error) {
      console.error(error)
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

  async logout() {
    const response = await restApiService.userApi.apiV1UsersLogoutPost({ body: {} })
    return response.data
  }

  async getUsersPresets() {
    const response = await restApiService.userApi.apiV1UsersPresetsGet()
    return response?.data
  }

  async postUsersPresets(body) {
    const response = await restApiService.userApi.apiV1UsersPresetsPost({ body })
    return response.data
  }

  async patchUsersPresetsByGuid(guid, body) {
    const response = await restApiService.userApi.apiV1UsersPresetsGuidPatch({ guid, body })
    return response.data
  }

  async deleteUsersPresetsByGuid(guid) {
    const response = await restApiService.userApi.apiV1UsersPresetsGuidDelete({ guid })
    return response.data
  }

  async getSpecs(archive) {
    const response = await restApiService.userApi.apiV1UsersFreelanceSpecsGet({ archive, noCache: true }) // archive = undefined - all elements, archive = false - only not archive elements, archive = true - only archive elements
    return response.data
  }

  async getActiveSessions() {
    const response = await restApiService.userApi.apiV1UsersDevicesGet({ noCache: true })
    return response.data
  }

  async logoutSession(sessionCreatedAt) {
    const response = await restApiService.userApi.apiV1UsersLogoutPost({ body: { sessionCreatedAt } })
    return response.data
  }

  async getPatchNotes(body) {
    const response = await restApiService.userApi.apiV1UsersPatchNotesGet({ ...body, noCache: true })
    return response.data
  }

  async getPatchNote(guid) {
    const response = await restApiService.userApi.apiV1UsersPatchNotesGuidGet({ guid, noCache: true })
    return response.data
  }

  async getPlatformSettings() {
    try {
      const response = await restApiService.userApi.apiV1UsersPlatformSettingsGet()

      runInAction(() => (this.platformSetting = response.data))
    } catch (error) {
      console.error(error)
    }
  }

  async getUsersFreelanceNotices() {
    const response = await restApiService.userApi.apiV1UsersFreelanceNoticesGet()
    return response.data
  }

  async createTableSettingsPreset(body) {
    const response = await restApiService.userApi.apiV1UsersPresetsOptionsPost({ body })
    return response.data
  }

  async getTableSettingsPreset(filters) {
    const response = await restApiService.userApi.apiV1UsersPresetsOptionsMyGet({ filters })
    return response.data
  }
}

export const UserModel = new UserModelStatic()
