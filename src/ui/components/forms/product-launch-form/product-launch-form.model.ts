import { RadioChangeEvent } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { makeObservable } from 'mobx'
import { UIEvent } from 'react'

import { ClientModel } from '@models/client-model'

import { getAsinOptions, getDefaultAsinOption } from '@components/modals/report-modal/report-modal.config'

import { IProduct } from '@typings/models/products/product'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { RadioValue, productLaunchConfig } from './product-launch-form.config'

export class ProductLaunchFormModel extends UseProductsPermissions {
  radioValue = RadioValue.NEW
  selectedProduct?: IProduct

  get disabledSubmit() {
    return !!this.radioValue && !this.selectedProduct
  }
  get asinOptions() {
    return getAsinOptions(this.currentPermissionsData)
  }
  get defaultAsinOption() {
    return getDefaultAsinOption(this.selectedProduct)
  }

  constructor(selectedProduct?: IProduct) {
    super(ClientModel.getProductPermissionsData)
    this.setOptions({ isChild: false })
    this.selectedProduct = selectedProduct
    makeObservable(this, productLaunchConfig)
  }

  onChangeRadioValue(e: RadioChangeEvent) {
    this.radioValue = e.target.value
  }

  onChangeProduct = (value: string, option: BaseOptionType) => {
    if (value) {
      this.selectedProduct = option as IProduct
    }
  }

  onGetProducts = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }

  onPopupScroll = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 90) {
      this.loadMoreDataHadler()
    }
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.onGetProducts()
    }
  }
}
