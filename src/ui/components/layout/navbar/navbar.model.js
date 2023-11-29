import { makeAutoObservable, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class NavbarModel {
  showFeedbackModal = false
  showWarningModal = false
  showConfirmModal = false

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats
  }

  get unreadMessages() {
    return ChatModel.unreadMessages
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async sendFeedbackAboutPlatform(comment, photos) {
    try {
      this.readyImages = []

      if (photos.length) {
        await onSubmitPostImages.call(this, { images: photos, type: 'readyImages' })
      }
      await OtherModel.sendFeedback({ text: comment, media: this.readyImages })
      this.onTriggerOpenModal('showFeedbackModal')

      runInAction(() => {
        this.alertShieldSettings = {
          showAlertShield: true,
          alertShieldMessage: `${t(TranslationKey['Your message has been sent'])}.
          ${t(TranslationKey['Thank you for your feedback'])}!`,
        }
      })

      setTimeout(() => {
        this.alertShieldSettings = {
          ...this.alertShieldSettings,
          showAlertShield: false,
        }

        setTimeout(() => {
          this.resetAlertShieldSettings()
        }, 1000)
      }, 3000)

      // this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
    }
  }

  resetAlertShieldSettings() {
    this.alertShieldSettings = {
      showAlertShield: false,
      alertShieldMessage: '',
    }
  }

  async submitResetLocalStorageAndCach() {
    await UserModel.signOut()
    localStorage.clear()
    // Очистка кэша
    if (window.caches && window.caches.delete) {
      caches.keys().then(names => {
        for (const name of names) {
          caches.delete(name)
        }
      })
    } else {
      // Для старых версий Edge используем следующий способ очистки кэша
      window.location.reload(true)
    }
    window.location.reload()
  }

  onClickVersion() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey.Attention) + '!',
        confirmMessage: t(TranslationKey['Temporary session data will be reset']),
        onClickConfirm: () => this.submitResetLocalStorageAndCach(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
