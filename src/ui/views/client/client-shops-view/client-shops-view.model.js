import { makeObservable, runInAction } from 'mobx'

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
  showWarningModal = false
  showConfirmModal = false

  constructor({ history }) {
    const rowHandlers = {
      onClickRemoveBtn: row => this.onClickRemoveBtn(row),
      onClickEditBtn: row => this.onClickEditBtn(row),

      onClickSeeShopReport: (currentReport, row) => this.onClickSeeShopReport(currentReport, row),
    }

    super(ShopModel.getMyShops, shopsColumns(rowHandlers), history)

    makeObservable(this, observerConfig)
  }

  async updateShops() {
    try {
      this.requestStatus = loadingStatuses.IS_LOADING
      await ClientModel.updateShops(this.rowSelectionModel)

      this.requestStatus = loadingStatuses.SUCCESS

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey.Updated),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey.Error),
        }
      })
      this.onTriggerOpenModal('showWarningModal')
      this.requestStatus = loadingStatuses.FAILED
    }
  }

  onSubmitShopForm(data, shopId) {
    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Are you sure?']),
      onSubmit: () => {
        this.createShop(data, shopId)
        this.onTriggerOpenModal('showAddOrEditShopModal')
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async createShop(data, shopId) {
    try {
      if (!data.reportAccountUrl) {
        delete data.reportAccountUrl
      }

      if (shopId) {
        await ShopModel.editShop(shopId, data)

        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Store changed']),
          }
        })

        this.onTriggerOpenModal('showWarningModal')
      } else {
        await ShopModel.createShop(data)

        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Store created']),
          }
        })
        this.onTriggerOpenModal('showWarningModal')
      }

      this.onTriggerOpenModal('showConfirmModal')
      this.getMainTableData()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: error.body.message,
        }
      })
      this.onTriggerOpenModal('showWarningModal')
    }
  }

  async removeShopById() {
    try {
      this.requestStatus = loadingStatuses.IS_LOADING

      await ShopModel.removeShopById(this.selectedShop._id)

      this.requestStatus = loadingStatuses.SUCCESS
    } catch (error) {
      this.requestStatus = loadingStatuses.FAILED
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
