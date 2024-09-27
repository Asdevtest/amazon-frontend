import { makeObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { navbarObserverConfig } from './sider.config'

export class SiderModel extends UseProductsPermissions {
  patchNote = undefined
  showFeedbackModal = false
  showVersionHistoryModal = false

  get userInfo() {
    return UserModel.userInfo
  }
  get simpleChats() {
    return ChatModel.simpleChats
  }
  get unreadMessages() {
    return ChatModel.unreadMessages
  }
  get patchNotes() {
    return this.currentPermissionsData
  }

  constructor() {
    super(UserModel.getPatchNotes, {
      limit: 10,
      sortType: 'DESC',
      sortField: 'updatedAt',
    })

    makeObservable(this, navbarObserverConfig)

    reaction(
      () => this.showVersionHistoryModal,
      () => {
        if (!this.showVersionHistoryModal) {
          this.onResetPatchNote()
          this.isCanLoadMore = true
          this.setOptions({ offset: 0 })
        }
      },
    )
  }

  async sendFeedbackAboutPlatform(comment, photos) {
    try {
      await onSubmitPostImages.call(this, { images: photos, type: 'readyImages' })
      await OtherModel.sendFeedback({ text: comment, media: this.readyImages })
      this.onTriggerOpenModal('showFeedbackModal')
      toast.success(`${t(TranslationKey['Your message has been sent'])}.
    ${t(TranslationKey['Thank you for your feedback'])}!`)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickResetVersion() {
    await UserModel.signOut()
    SettingsModel.resetLocalStorageAndCach()
  }

  async getPatchNote(patchNoteId) {
    try {
      const response = await UserModel.getPatchNote(patchNoteId)

      runInAction(() => {
        this.patchNote = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  onResetPatchNote() {
    this.patchNote = undefined
  }

  async onClickVersion() {
    await this.getPermissionsData()

    this.onTriggerOpenModal('showVersionHistoryModal')
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
