import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { ShopModel } from '@models/shop-model'

import { shopsColumns } from '@components/table/table-columns/shops-columns'

import { t } from '@utils/translations'

import { observerConfig } from './model-config'

export class ShopsViewModel extends DataGridTableModel {
  get currentData() {
    if (this.unserverSearchValue) {
      return this.tableData.filter(shop => shop.name.toLowerCase().includes(this.unserverSearchValue.toLowerCase()))
    } else {
      return this.tableData
    }
  }

  selectedShop = undefined

  showAddOrEditShopModal = false

  showConfirmModal = false

  constructor() {
    const rowHandlers = {
      onClickRemoveBtn: row => this.onClickRemoveBtn(row),
      onClickEditBtn: row => this.onClickEditBtn(row),

      onClickSeeShopReport: (currentReport, row) => this.onClickSeeShopReport(currentReport, row),
    }

    super(ShopModel.getMyShops, shopsColumns(rowHandlers))

    this.getMainTableData()

    makeObservable(this, observerConfig)
  }

  async updateShops() {
    try {
      const isMoreThenThree = this.selectedRows?.length > 3

      this.setRequestStatus(loadingStatuses.IS_LOADING)
      await ClientModel.updateShops(this.selectedRows, isMoreThenThree)

      if (isMoreThenThree) {
        toast.success(t(TranslationKey['Store data will be updated soon']))
      } else {
        toast.success(t(TranslationKey.Updated))
      }

      this.selectedRows = []

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)

      toast.error(t(TranslationKey['Something went wrong']))

      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  onSubmitShopForm(data, shopId) {
    this.createShop(data, shopId)
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  async createShop(data, shopId) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      if (!data.reportAccountUrl) {
        delete data.reportAccountUrl
      }

      if (shopId) {
        await ShopModel.editShop(shopId, data)

        toast.success(t(TranslationKey['Store changed']))
      } else {
        await ShopModel.createShop(data)

        toast.success(t(TranslationKey['Store created']))
      }

      this.getMainTableData()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)

      toast.error(t(TranslationKey['Something went wrong']))
    }
  }

  async removeShopById() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await ShopModel.removeShopById(this.selectedShop._id)

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async onSubmitRemoveShop() {
    try {
      await this.removeShopById()
      this.getMainTableData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickEditBtn(row) {
    this.selectedShop = row
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  onClickRemoveBtn(row) {
    this.selectedShop = row
    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Are you sure you want to delete the store?']),
      onSubmit: () => this.onSubmitRemoveShop(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickAddBtn() {
    this.selectedShop = undefined
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  onClickSeeShopReport(currentReport, row) {
    this.history.push(`/client/shops/reports?currentReport=${currentReport}&shopId=${row?._id}`)
  }
}
