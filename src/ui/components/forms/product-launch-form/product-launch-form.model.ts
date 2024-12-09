import { RadioChangeEvent } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { makeObservable } from 'mobx'

import { ClientModel } from '@models/client-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'

import { getAsinOptions, getDefaultAsinOption } from '@components/modals/report-modal/report-modal.config'

import { IProduct } from '@typings/models/products/product'

import { RadioValue, productLaunchConfig } from './product-launch-form.config'

export class ProductLaunchFormModel extends InfiniteScrollModel<IProduct> {
  radioValue = RadioValue.NEW
  selectedProduct?: IProduct

  get disabledSubmit() {
    return !!this.radioValue && !this.selectedProduct
  }
  get asinOptions() {
    return getAsinOptions(this.data)
  }
  get defaultAsinOption() {
    return getDefaultAsinOption(this.selectedProduct)
  }

  constructor(selectedProduct?: IProduct) {
    super({ method: ClientModel.getProductPermissionsData, options: { isChild: false } })
    this.radioValue = selectedProduct ? RadioValue.VARIATION : RadioValue.NEW
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

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }
}
