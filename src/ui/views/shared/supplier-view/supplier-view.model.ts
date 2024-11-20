import { makeObservable, runInAction } from 'mobx'
import { UIEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { SupplierV2Model } from '@models/supplier-v2-model/supplier-v2-model'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ISupplierCard, ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'
import { HistoryType } from '@typings/types/history'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { FilterValues } from './cards-filter/cards-filter'
import { supplierConfig } from './supplier-view.config'

export class SupplierViewModel extends UseProductsPermissions {
  showSelectShopsModal = false
  supplierCardId?: string

  get supplier(): ISupplierExchange {
    return this.meta?.supplier
  }
  get products() {
    return this.currentPermissionsData as unknown as ISupplierCard[]
  }
  get loading() {
    return this.requestStatus === loadingStatus.IS_LOADING
  }

  constructor(history: HistoryType) {
    const requestOptions = {
      guid: history.location.search.slice(1),
      sortField: 'updatedAt',
      sortType: 'DESC',
      limit: 15,
    }
    // @ts-ignore
    super(SupplierV2Model.getSupplierCards, requestOptions, ['cardName'])
    this.permissionsData = []
    this.isCanLoadMore = true
    this.getPermissionsData()
    makeObservable(this, supplierConfig)
  }

  onScroll = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 650) {
      this.loadMoreDataHadler()
    }
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

  async onSubmitFilters(values: FilterValues) {
    console.log('values', values)
    this.setOptions({
      offset: 0,
      filters: objectToUrlQs(dataGridFiltersConverter({}, this.searchValue, '', [], this.searchFields || ['cardName'])),
    })

    await this.getPermissionsData()
  }
}
