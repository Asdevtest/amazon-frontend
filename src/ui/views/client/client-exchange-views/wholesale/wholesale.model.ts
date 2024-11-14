import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'
import { UIEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { WholesaleTabs, wholesaleConfig } from './wholesale.config'

export class WholesaleViewModel extends UseProductsPermissions {
  wholesaleTab: WholesaleTabs = WholesaleTabs.Suppliers
  showSelectShopsModal = false
  supplierCardId?: string

  get suppliers() {
    return this.currentPermissionsData as unknown as ISupplierExchange[]
  }
  get products() {
    return this.suppliers.flatMap((supplier: ISupplierExchange) => supplier.supplierCards)
  }
  get loading() {
    return this.requestStatus === loadingStatus.IS_LOADING
  }
  get supplierMode() {
    return this.wholesaleTab === WholesaleTabs.Suppliers
  }
  get isEmpty() {
    return this.suppliers.length === 0 || this.products.length === 0
  }

  constructor() {
    const requestOptions = {
      sortField: 'updatedAt',
      sortType: 'DESC',
      limit: 15,
    }
    super(ClientModel.getSuppliersExchange, requestOptions, ['xid'])
    this.permissionsData = []
    this.isCanLoadMore = true
    this.getPermissionsData()
    makeObservable(this, wholesaleConfig)
  }

  onScroll = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 200) {
      this.loadMoreDataHadler()
    }
  }

  onChangeWholesaleTab(event: RadioChangeEvent) {
    this.wholesaleTab = event.target.value
  }

  onToggleSelectShopsModal() {
    this.showSelectShopsModal = !this.showSelectShopsModal
  }

  onSelectSupplierCard(cardId?: string) {
    this.supplierCardId = cardId
    this.onToggleSelectShopsModal()
  }

  async onAddToInventory(shopId: string) {
    try {
      const data = {
        supplierCardId: this.supplierCardId,
        shopId,
      }
      await ClientModel.createSupplierProduct(data)
      toast.success(t(TranslationKey['Data saved successfully']))
      this.onToggleSelectShopsModal()
    } catch (error) {
      toast.error(t(TranslationKey['Data not saved']))
    } finally {
      runInAction(() => {
        this.supplierCardId = undefined
      })
    }
  }
}
