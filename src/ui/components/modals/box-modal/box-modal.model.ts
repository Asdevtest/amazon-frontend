import { RadioChangeEvent } from 'antd'
import isEqual from 'lodash.isequal'
import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { UserModel } from '@models/user-model'

import { checkIsBuyer, checkIsClient, checkIsStorekeeper } from '@utils/checks'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { IBox } from '@typings/models/boxes/box'
import { IFullUser } from '@typings/shared/full-user'

import { BoxTabs } from './box-modal.config'

export class BoxModalModel {
  showEditHSCodeModal = false
  activeTab: BoxTabs = BoxTabs.BOX_INFO
  onUpdateData?: () => void
  box?: IBox

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
    return isEqual(this.box, {})
  }

  constructor({ boxId, onUpdateData }: { boxId: string; onUpdateData?: () => void }) {
    this.onUpdateData = onUpdateData
    this.getBox(boxId)
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onToggleEditHSCodeModal() {
    this.showEditHSCodeModal = !this.showEditHSCodeModal
  }

  async getBox(id: string) {
    try {
      const response = (await BoxesModel.getBoxById(id)) as unknown as IBox

      runInAction(() => {
        this.box = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitChangeBoxFields() {
    try {
      // @ts-ignore
      const images = await onSubmitPostImages.call(this, {
        images: this.box?.trackNumberFile,
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
      } = this.box as IBox

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
        delete body.storage
        delete body.storekeeperComment
      }

      if (this.isStorekeeper) {
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

  onChangeField = (fieldName: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => {
    if (this.box) {
      this.box = { ...this.box, [fieldName]: event.target.value }
    }
  }

  onChangeTrackNumberFile(files: string[]) {
    if (this.box) {
      this.box.trackNumberFile = files
    }
  }
}
