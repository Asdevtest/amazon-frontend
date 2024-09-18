import { RadioChangeEvent } from 'antd'
import isEqual from 'lodash.isequal'
import { makeObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { DefaultModel } from '@models/default-model'
import { UserModel } from '@models/user-model'

import { checkIsBuyer, checkIsClient, checkIsStorekeeper } from '@utils/checks'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { IBox } from '@typings/models/boxes/box'
import { IFullUser } from '@typings/shared/full-user'

import { BoxTabs, observerConfig } from './box-modal.config'

export class BoxModalModel extends DefaultModel {
  showEditHSCodeModal = false
  activeTab: BoxTabs = BoxTabs.BOX_INFO

  onUpdateData?: () => void

  get userInfo(): IFullUser {
    return UserModel.userInfo as unknown as IFullUser
  }
  get isClient(): boolean {
    return !!this.userInfo && checkIsClient(UserRoleCodeMap[this.userInfo?.role])
  }
  get isStorekeeper(): boolean {
    return !!this.userInfo && checkIsStorekeeper(UserRoleCodeMap[this.userInfo?.role])
  }
  get isBuyer(): boolean {
    return !!this.userInfo && checkIsBuyer(UserRoleCodeMap[this.userInfo?.role])
  }
  get isEdit(): boolean {
    return this.isClient || this.isStorekeeper || this.isBuyer
  }
  get disableSaveButton(): boolean {
    return isEqual(this.currentData, {})
  }

  constructor({ boxId, onUpdateData }: { boxId: string; onUpdateData?: () => void }) {
    super({
      getMainDataMethod: BoxesModel.getBoxById,
      defaultGetCurrentDataOptions: () => boxId,
    })

    makeObservable(this, observerConfig)

    this.onUpdateData = onUpdateData
    this.getCurrentData()
  }

  async onClickHsCode() {
    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onSubmitChangeBoxFields() {
    try {
      // @ts-ignore
      const images = await onSubmitPostImages.call(this, {
        // @ts-ignore
        images: this.currentData?.trackNumberFile,
        type: 'uploadedFiles',
      })

      const {
        _id,
        clientComment,
        referenceId,
        fbaNumber,
        trackNumberText,
        prepId,
        storage,
        storekeeperComment,
        upsTrackNumber,
      } = this.currentData as unknown as IBox

      const body = {
        clientComment,
        referenceId,
        fbaNumber,
        trackNumberText,
        trackNumberFile: images,
        prepId,
        storage,
        storekeeperComment,
        upsTrackNumber,
      }

      if (this.isClient) {
        // @ts-ignore
        delete body.storage
        // @ts-ignore
        delete body.storekeeperComment
      }

      if (this.isStorekeeper) {
        // @ts-ignore
        delete body.clientComment
      }

      await BoxesModel.editAdditionalInfo(_id, body)

      toast.success(t(TranslationKey['Data saved successfully']))

      this.onUpdateData?.()
    } catch (error) {
      console.error(error)
    }
  }

  setActiveTab(event: RadioChangeEvent) {
    this.activeTab = event.target.value
  }

  onChangeField(fieldName: keyof IBox) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      if (this.currentData) {
        runInAction(() => {
          this.currentData = { ...this.currentData, [fieldName]: event.target.value }
        })
      }
    }
  }

  onChangeTrackNumberFile(files: string[]) {
    if (this.currentData) {
      // @ts-ignore
      this.currentData = { ...this.currentData, trackNumberFile: files }
    }
  }
}
