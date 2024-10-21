import { makeObservable, reaction, runInAction } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { navbarObserverConfig } from './navbar.config'

export class NavbarModel extends UseProductsPermissions {
  patchNote = undefined

  showConfirmModal = false
  showVersionHistoryModal = false

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

  async submitResetLocalStorageAndCach() {
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

  onClickResetVersion() {
    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey.Attention) + '!',
      confirmMessage: t(TranslationKey['Temporary session data will be reset']),
      onClickConfirm: () => this.submitResetLocalStorageAndCach(),
    }

    this.onTriggerOpenModal('showConfirmModal')
    this.onTriggerOpenModal('showVersionHistoryModal')
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
