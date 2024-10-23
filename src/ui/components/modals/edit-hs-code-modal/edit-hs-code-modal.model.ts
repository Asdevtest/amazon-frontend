import { makeObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { DefaultModel } from '@models/default-model'
import { ProductModel } from '@models/product-model'

import { t } from '@utils/translations'

import { observerConfig } from './observer-config'

export class EditHSCodeModalModel extends DefaultModel {
  onCloseModal: () => void
  onUpdateData?: () => void

  constructor({
    productId,
    onCloseModal,
    onUpdateData,
  }: {
    productId?: string
    onCloseModal: () => void
    onUpdateData?: () => void
  }) {
    super({
      getMainDataMethod: ProductModel.getProductsHsCodeByGuid,
      defaultGetCurrentDataOptions: () => productId,
    })

    makeObservable(this, observerConfig)

    this.onCloseModal = onCloseModal
    this.onUpdateData = onUpdateData

    this.getCurrentData()
  }

  async onSaveHSCode() {
    try {
      await ProductModel.editProductsHsCods([
        {
          // @ts-ignore
          productId: this.currentData?._id,
          // @ts-ignore
          chinaTitle: this.currentData?.chinaTitle || null,
          // @ts-ignore
          hsCode: this.currentData?.hsCode || null,
          // @ts-ignore
          material: this.currentData?.material || null,
          // @ts-ignore
          productUsage: this.currentData?.productUsage || null,
        },
      ])

      this.onUpdateData?.()
      this.onCloseModal?.()

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  onChangeField(fieldName: string) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      runInAction(() => {
        this.currentData = { ...this.currentData, [fieldName]: event.target.value }
      })
    }
  }
}
