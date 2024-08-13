import { DefaultOptionType } from 'antd/es/select'
import { makeAutoObservable } from 'mobx'

import { ClientModel } from '@models/client-model'

import { IShop } from '@typings/models/shops/shop'

import { getExportOptionsForShopsView } from './helpers/get-export-options'

export class ShopsCascaderModel {
  data: IShop[] = []
  open = false
  selectedExportOptions: DefaultOptionType[] = []

  get exportOptions() {
    const generetadOptions = this.data?.map(({ name, _id }) => ({ label: name, value: _id }))

    return getExportOptionsForShopsView(generetadOptions, this.selectedExportOptions)
  }

  constructor(data: IShop[]) {
    this.data = data

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getShopsExport() {
    try {
      await ClientModel.getShopsExport(this.selectedExportOptions)
    } catch (error) {
      console.error(error)
    } finally {
      this.open = false
    }
  }

  onChangeExportOprions(value: DefaultOptionType[]) {
    this.selectedExportOptions = value
  }

  onDropdownVisibleChange(value: boolean) {
    this.open = value
  }

  onClose = () => {
    this.open = false
  }
}
