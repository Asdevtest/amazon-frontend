import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { FeedbackModel } from '@models/feedback-model'
import { OtherModel } from '@models/other-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { dataURLtoFile } from '@utils/upload-files'

import { IFeedback } from '@typings/models/administrators/feedback'
import { IActiveSession } from '@typings/shared/active-session'
import { IFullUser } from '@typings/shared/full-user'
import { UploadFileType } from '@typings/shared/upload-file'

import { userProfileColumns } from './user-profile-view.columns'
import { userProfileConfig } from './user-profile-view.config'

export class ProfileViewModel extends DataGridTableModel {
  showUserInfoModal = false
  showTabModal = false
  showConfirmWorkResultFormModal = false
  tabHistory = 0
  selectedUser?: IFullUser
  reviews: IFeedback[] = []
  headerInfoData = {
    investorsCount: 255,
    goodsFound: 875,
    transactionsVolume: 7555,
    earnedAmount: 1255,
    addInSave: 12,
    inBlocked: 12,
    youBlocked: 14,
    accountCreateAt: 11,
  }
  activeSessions: IActiveSession[] = []
  userInfoEditFormFlag = true

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor() {
    const defaultGetCurrentDataOptions = () => ({
      guid: this.userInfo?._id,
    })

    super({
      getMainDataMethod: ProductModel.getVacProductByUserId,
      columnsModel: userProfileColumns(),
      tableKey: DataGridTablesKeys.PROFILE_VAC_PRODUCTS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
      defaultGetCurrentDataOptions,
    })

    this.getCurrentData()
    this.getReviews()

    makeObservable(this, userProfileConfig)
  }

  async onSubmitUserInfoEdit(data: { name: string; email: string; oldPassword: string; password: string }) {
    try {
      const { name, email, oldPassword, password } = data

      if (name || email) {
        await UserModel.changeUserInfo({ name: data.name?.trim() })
      }

      if (oldPassword && password) {
        await UserModel.changeUserPassword({
          oldPassword: data.oldPassword,
          newPassword: data.password,
        })
      }

      const userModelData = SettingsModel.loadValue('UserModel')
      const refreshToken = userModelData.refreshToken

      if (!refreshToken) {
        return
      }

      const response = await UserModel.getAccessToken(refreshToken)
      const accessToken = response?.accessToken

      await SettingsModel.saveValue('UserModel', { ...userModelData, accessToken })
      await UserModel.setAccessToken(accessToken)
      await UserModel.getUserInfo()

      this.onTriggerOpenModal('showUserInfoModal')

      toast.success(t(TranslationKey['Data was successfully saved']))
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitAvatarEdit(imageData: UploadFileType) {
    const file = dataURLtoFile(imageData, this.userInfo._id)

    const formData = new FormData()
    formData.append('filename', file)

    try {
      await OtherModel.postAvatar(formData)
      toast.success(t(TranslationKey['The avatar has been uploaded. The update will take place within a few minutes.']))
    } catch (error) {
      console.error(error)
    }
  }

  onChangeTabHistory(value: number) {
    this.tabHistory = value
  }

  onClickButtonPrivateLabel(item: IFullUser) {
    this.selectedUser = item
    this.onTriggerOpenModal('showTabModal')
  }

  async getReviews() {
    try {
      const response = (await FeedbackModel.getMyFeedback()) as unknown as IFeedback[]

      runInAction(() => {
        this.reviews = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onAcceptReview(review: { rating: number; review: string }) {
    await FeedbackModel.sendFeedback(this.userInfo._id, {
      rating: review.rating,
      comment: review.review,
    })
    await this.getReviews()
    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }

  async getActiveSessions() {
    try {
      const responce = (await UserModel.getActiveSessions()) as unknown as IActiveSession[]

      runInAction(() => {
        this.activeSessions = responce
      })
    } catch (error) {
      console.error(error)
    }
  }

  async logoutSession(sessionCreatedAt: string) {
    try {
      await UserModel.logoutSession(sessionCreatedAt)
    } catch (error) {
      console.error(error)
    }
  }

  onToggleUserInfoEditFormFlag() {
    this.onTriggerOpenModal('userInfoEditFormFlag')

    if (!this.userInfoEditFormFlag) {
      this.getActiveSessions()
    }
  }

  async onLogoutSession(sessionCreatedAt: string) {
    await this.logoutSession(sessionCreatedAt)

    await this.getActiveSessions()
  }

  onTriggerEnterInformation() {
    this.userInfoEditFormFlag = true
  }
}
