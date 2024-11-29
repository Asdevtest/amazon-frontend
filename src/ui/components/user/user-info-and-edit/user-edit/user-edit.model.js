import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

export class UserEditModel {
  history = undefined
  specs = []
  userData = undefined
  submitEditData = undefined
  newPassword = undefined
  showVerticalChoicesModal = false

  constructor({ history, user }) {
    this.history = history
    this.userId = user._id

    this.loadData()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async finalStepSubmitEditUserForm(data, sourceData, passwords) {
    try {
      this.submitEditData = { ...data, permissions: data.active && data.active !== 'false' ? data.permissions : [] } // удаляем пермишены если баним юзера
      this.newPassword = passwords?.password

      await AdministratorModel.updateUser(this.userData._id, this.submitEditData)
      if (this.newPassword) {
        await this.changeUserPassword()
      }
      this.onTriggerOpenModal('showVerticalChoicesModal')
    } catch (error) {
      console.error(error)
    }
  }

  async changeUserPassword() {
    try {
      await AdministratorModel.changePasswordById(this.userData._id, { password: this.newPassword })
      toast.success(t(TranslationKey['New password set successfully']))
    } catch (error) {
      toast.error(t(TranslationKey['Failed to set new password']))
      console.error(error)
    }
  }

  async getUserData() {
    try {
      const result = await AdministratorModel.getUsersById(this.userId)

      runInAction(() => {
        this.userData = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickBottomBtn() {
    this.loadData()
    this.onTriggerOpenModal('showVerticalChoicesModal')
  }

  onClickCancelBtn() {
    this.history.goBack()
  }

  goToUsers() {
    this.history.push('/admin/users')
  }

  loadData() {
    if (this.userId) {
      this.getUserData()
      this.getSpecs()
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.error(error)
    }
  }
}
