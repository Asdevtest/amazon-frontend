import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { ShopModel } from '@models/shop-model'

import { shopsColumns } from '@components/table/table-columns/shops-columns'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IShop } from '@typings/models/shops/shop'

import { observerConfig } from './model-config'

export class ShopsViewModel extends DataGridTableModel {
  selectedShop: IShop | null = null

  showAddOrEditShopModal = false
  showConfirmModal = false

  constructor() {
    const rowHandlers = {
      onClickRemoveBtn: (row: IShop) => this.onClickRemoveBtn(row),
      onClickEditBtn: (row: IShop) => this.onClickEditBtn(row),

      onClickSeeShopReport: (currentReport: string, row: IShop) => this.onClickSeeShopReport(currentReport, row),
    }

    super({
      getMainDataMethod: ShopModel.getMyShops,
      columnsModel: shopsColumns(rowHandlers),
      tableKey: DataGridTablesKeys.CLIENT_SHOPS,
      fieldsForSearch: ['name'],
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.getDataGridState()

    this.getCurrentData()
  }

  async updateShops() {
    try {
      const isMoreThenThree = this.selectedRows?.length > 3

      this.setRequestStatus(loadingStatus.IS_LOADING)
      await ClientModel.updateShops(this.selectedRows, isMoreThenThree)

      if (isMoreThenThree) {
        toast.success(t(TranslationKey['Store data will be updated soon']))
      } else {
        toast.success(t(TranslationKey.Updated))
      }

      this.selectedRows = []

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)

      toast.error(t(TranslationKey['Something went wrong']))

      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onSubmitShopForm(data: IShop, shopId: string) {
    this.createShop(data, shopId)
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  async createShop(data: IShop, shopId: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      if (!data.reportAccountUrl) {
        // @ts-ignore
        delete data.reportAccountUrl
      }

      if (shopId) {
        await ShopModel.editShop(shopId, data)

        toast.success(t(TranslationKey['Store changed']))
      } else {
        await ShopModel.createShop(data)

        toast.success(t(TranslationKey['Store created']))
      }

      this.getCurrentData()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)

      toast.error(t(TranslationKey['Something went wrong']))
    }
  }

  async removeShopById() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ShopModel.removeShopById(this.selectedShop?._id)

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onSubmitRemoveShop() {
    try {
      await this.removeShopById()
      this.getCurrentData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickEditBtn(row: IShop) {
    this.selectedShop = row
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  onClickRemoveBtn(row: IShop) {
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
    this.selectedShop = null
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  onClickSeeShopReport(currentReport: string, row: IShop) {
    this.history.push(`/client/shops/reports?currentReport=${currentReport}&shopId=${row?._id}`)
  }
}
