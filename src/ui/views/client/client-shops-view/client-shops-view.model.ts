import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { ParserModel } from '@models/parser-model'
import { ShopModel } from '@models/shop-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IShop } from '@typings/models/shops/shop'

import { shopsColumns } from './client-shops-view.columns'
import { shopsViewModelConfig } from './client-shops-view.config'
import { IColumnProps } from './client-shops-view.types'

export class ShopsViewModel extends DataGridTableModel {
  selectedShop?: IShop
  shopModal = false

  get disableUpdateButton() {
    return !this.selectedRows.length || this.requestStatus === loadingStatus.IS_LOADING
  }

  constructor() {
    const columnsProps: IColumnProps = {
      onRemoveShop: id => this.onRemoveShop(id),
      onEditShop: row => this.onEditShop(row),
      onParsingProfile: id => this.onParsingProfile(id),
      onParsingAccess: email => this.onParsingAccess(email),
      onParsingStatus: (id, isActive) => this.onParsingStatus(id, isActive),
    }

    super({
      getMainDataMethod: ShopModel.getShopsWithProfiles,
      columnsModel: shopsColumns(columnsProps),
      tableKey: DataGridTablesKeys.CLIENT_SHOPS,
      fieldsForSearch: ['name'],
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, shopsViewModelConfig)
  }

  async onUpdateShops() {
    try {
      const isMoreThenThree = this.selectedRows?.length > 3

      await ClientModel.updateShops(this.selectedRows, isMoreThenThree)

      if (isMoreThenThree) {
        toast.success(t(TranslationKey['Store data will be updated soon']))
      } else {
        toast.success(t(TranslationKey.Updated))
      }

      this.selectedRows = []
      this.getCurrentData()
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['Error updating data']))
    }
  }

  onEditShop(row: IShop) {
    this.selectedShop = row
    this.onTriggerOpenModal('shopModal')
  }

  onAddShop() {
    this.selectedShop = undefined
    this.onTriggerOpenModal('shopModal')
  }

  async onRemoveShop(id: string) {
    try {
      await ShopModel.removeShopById(id)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onParsingProfile(id: string) {
    try {
      await ParserModel.onParsingProfile(id)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onParsingAccess(email: string) {
    try {
      await ParserModel.onParsingAccess(email)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['Profile does not belongs to you!']))
    }
  }

  async onParsingStatus(id: string, isActive: boolean) {
    try {
      await ParserModel.onParsingStatus(id, isActive)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['Profile with given guid not found!']))
    }
  }
}
