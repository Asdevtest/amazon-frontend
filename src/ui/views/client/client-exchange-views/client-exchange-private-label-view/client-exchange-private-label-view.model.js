import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'
import { createOrderRequestWhiteList } from '@constants/white-list'

import { ClientModel } from '@models/client-model'

import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

export class ClientExchangePrivateLabelViewModel {
  productsVacant = []
  selectedProduct = undefined
  selectedShopId = undefined
  productToPay = undefined
  showConfirmPayModal = false

  constructor() {
    this.getProductsVacant()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getProductsVacant() {
    try {
      const response = await ClientModel.getProductsVacant()

      runInAction(() => {
        this.productsVacant = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createOrder(product, orderData) {
    try {
      const createorderData = {
        status: 0,
        amount: orderData.amount,
        deliveryMethod: orderData.deliveryMethod,
        warehouse: orderData.warehouse,
        clientComment: orderData.clientComment,
        productId: product._id,
        images: [],
      }
      await ClientModel.createOrder(getObjectFilteredByKeyArrayWhiteList(createorderData, createOrderRequestWhiteList))
      this.getProductsVacant()
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveProductData() {
    try {
      await ClientModel.updateProduct(
        this.productToPay?._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            shopId: this.selectedShopId,
          },
          ['suppliers'],
        ),
      )

      runInAction(() => {
        this.selectedShopId = undefined
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickBuyProductBtn(id) {
    try {
      await ClientModel.makePayments([this.productToPay?._id])

      runInAction(() => {
        this.selectedShopId = id
      })

      await this.onSaveProductData()
      this.onTriggerOpenModal('showConfirmPayModal')
      toast.success(t(TranslationKey['Product paid']))
      this.getProductsVacant()
    } catch (error) {
      console.error(error)
    }
  }

  setProductToPay(selectedProduct) {
    this.productToPay = selectedProduct

    this.onTriggerOpenModal('showConfirmPayModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
