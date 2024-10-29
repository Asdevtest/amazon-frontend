/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { IShop } from '@components/data-grid/data-grid-cells/shop-notification-message-cell/shop-notification.type'

import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'
import { IProduct } from '@typings/models/products/product'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { IDestination } from '@typings/shared/destinations'

import { clientExchangeColumns } from './client-exchange.columns'
import { observerConfig } from './observer-config'

export class ClientExchangeViewModel extends DataGridTableModel {
  productsVacant: IProduct[] = []
  storekeepers: IStorekeeper[] = []
  shopsData: IShop[] = []

  destinations: IDestination[] = []

  ordersDataStateToSubmit: IOrder | null = null

  showConfirmModal = false
  showSelectShopsModal = false
  showOrderModal = false

  selectedProduct: IProduct | null = null
  selectedShopId = ''

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const rowHandlers = {
      onClickLaunchPrivateLabelBtn: (product: IProduct) => this.onClickLaunchPrivateLabelBtn(product),
    }
    const columnsModel = clientExchangeColumns(rowHandlers)

    super({
      getMainDataMethod: ClientModel.getProductsVacant,
      columnsModel,
      tableKey: DataGridTablesKeys.CLIENT_EXCHANGE,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.getShops()
    this.getTableSettingsPreset()
  }

  onDoubleClickBarcode = () => {
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  setDestinationsFavouritesItem(item: string) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  async getProductById(productId: string) {
    try {
      const result = await ProductModel.getProductById(productId)

      runInAction(() => {
        this.selectedProduct = result as unknown as IProduct
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickLaunchPrivateLabelBtn(product: IProduct) {
    this.selectedProduct = product

    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey['Purchasing a product card']),
      message: `${t(TranslationKey['You will be charged'])} ${
        this.selectedProduct && toFixedWithDollarSign(this.selectedProduct?.priceForClient, 2)
      }`,
      onSubmit: () => this.onClickBuyProductBtn(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showSelectShopsModal')
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()
      runInAction(() => {
        this.shopsData = result as unknown as IShop[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createOrder(orderObject: any) {
    try {
      let uploadedFiles = []

      if (orderObject?.tmpBarCode?.length) {
        // @ts-ignore
        uploadedFiles = await onSubmitPostImages?.call(this, { images: orderObject?.tmpBarCode, type: 'uploadedFiles' })
      } else if (!orderObject?.barCode) {
        await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
      }

      const createorderData = {
        amount: orderObject.amount,
        deliveryMethod: orderObject?.deliveryMethod,
        warehouse: orderObject.warehouse,
        clientComment: orderObject.clientComment,
        productId: orderObject.productId,
        storekeeperId: orderObject.storekeeperId,
        destinationId: orderObject.destinationId,
        logicsTariffId: orderObject.logicsTariffId,
        totalPrice: orderObject.totalPrice,
        priority: orderObject.priority,
        expressChinaDelivery: orderObject.expressChinaDelivery,
        deadline: orderObject.deadline,
        needsResearch: orderObject.needsResearch,
        buyerId: orderObject.buyerId,
        variationTariffId: orderObject.variationTariffId,
      }

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(createorderData)
      } else {
        await ClientModel.createOrder(createorderData)
      }

      if (uploadedFiles?.length) {
        await ClientModel.updateProductBarCode(orderObject.productId, { barCode: uploadedFiles?.[0] })
      }

      runInAction(() => {
        this.selectedProduct = null
      })
      await this.updateUserInfo()
    } catch (error) {
      console.error(error)
    }
  }

  async onLaunchPrivateLabel() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const requestProduct = getObjectFilteredByKeyArrayBlackList({ ...this.ordersDataStateToSubmit }, [
        'tmpResearcherName',
        'tmpBuyerName',
        'tmpStrategyStatus',
      ])

      await this.createOrder(requestProduct)
      this.setRequestStatus(loadingStatus.SUCCESS)

      this.onTriggerOpenModal('showOrderModal')

      toast.success(t(TranslationKey['Order successfully created!']))

      this.onTriggerOpenModal('showConfirmModal')

      this.getCurrentData()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async openCreateOrder() {
    try {
      const [storekeepers, destinations] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        // @ts-ignore
        this.getProductById(this.selectedProduct?._id),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers as IStorekeeper[]
        this.destinations = destinations as IDestination[]
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickBuyProductBtn(shop?: IShop) {
    try {
      await ClientModel.makePayments([this.selectedProduct?._id])

      runInAction(() => {
        this.selectedShopId = shop?._id || ''
      })

      await this.onSaveProductData()
      this.onTriggerOpenModal('showSelectShopsModal')

      this.openCreateOrder()

      this.updateUserInfo()
      this.getCurrentData()
    } catch (error) {
      toast.error(t(TranslationKey["You can't buy the product"]))

      console.error(error)
    }
  }

  async onSaveProductData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ClientModel.updateProduct(
        this.selectedProduct?._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            shopId: this.selectedShopId,
          },
          ['suppliers'],
        ),
      )
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onClickCancelBtn = () => {
    this.onTriggerOpenModal('showOrderModal')

    this.selectedProduct = null

    toast.warning(t(TranslationKey['This item has been moved to Inventory']))
  }

  onClickOrderNowBtn = ({
    ordersDataState,
    totalOrdersCost,
  }: {
    ordersDataState: IOrder[]
    totalOrdersCost: number
  }) => {
    this.ordersDataStateToSubmit = ordersDataState?.[0]

    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey['You are making an order, are you sure?']),
      // @ts-ignore
      message: ordersDataState.some(el => el?.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onSubmit: () => this.onLaunchPrivateLabel(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }
}
