import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShopModel } from '@models/shop-model'

import { t } from '@utils/translations'

import { FieldType } from './shop-form.types'

export class ShopFormModel {
  loading = false

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onCreateShop(values: FieldType) {
    try {
      this.onToggleLoading(true)

      const data = {
        name: values?.name || '',
        sellerBoardWarehouseReportUrlDaily: values?.sellerBoardWarehouseReportUrlDaily || '',
        sellerBoardWarehouseReportUrlMonthly: values?.sellerBoardWarehouseReportUrlMonthly || '',
        ...(values?.reportAccountUrl ? { reportAccountUrl: values.reportAccountUrl } : {}),
      }

      await ShopModel.createShop(data)

      this.onToggleLoading(false)

      toast.success(t(TranslationKey['Store created']))
    } catch (error) {
      console.error(error)
    }
  }

  async onEditShop(id: string, values: FieldType) {
    try {
      this.onToggleLoading(true)

      const data = {
        name: values?.name || '',
        sellerBoardWarehouseReportUrlDaily: values?.sellerBoardWarehouseReportUrlDaily || '',
        sellerBoardWarehouseReportUrlMonthly: values?.sellerBoardWarehouseReportUrlMonthly || '',
        ...(values?.reportAccountUrl ? { reportAccountUrl: values.reportAccountUrl } : {}),
      }

      await ShopModel.editShop(id, data)

      this.onToggleLoading(false)

      toast.success(t(TranslationKey['Store changed']))
    } catch (error) {
      console.error(error)
    }
  }

  onToggleLoading(value: boolean) {
    this.loading = value
  }
}
