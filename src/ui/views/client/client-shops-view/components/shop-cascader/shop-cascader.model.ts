import { format } from 'date-fns'
import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { ShopModel } from '@models/shop-model'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'

import { createBoxesOptions, createOrdersOptions, getShopsOptions, getTableOptions } from './helpers/get-export-options'

export class ShopsCascaderModel {
  shops: IShop[] = []
  open = false
  inputValue = ''
  selectedTableOptions: string[][] = []
  selectedShopsOptions: string[][] = []
  showSubMenu = false

  get shopOptions() {
    return getShopsOptions(this.shops, this.inputValue)
  }
  get tableOptions() {
    return this.open ? getTableOptions(this.selectedTableOptions) : []
  }
  get disabledExportButton() {
    return !this.selectedTableOptions?.some(option => option?.[0]) || !this.selectedShopsOptions?.length
  }

  constructor() {
    this.getShops()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getShops() {
    try {
      const response = (await ShopModel.getMyShopNames()) as unknown as IShop[]

      runInAction(() => {
        this.shops = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getShopsExport() {
    try {
      const shopIds =
        this.selectedShopsOptions.length > 0
          ? this.selectedShopsOptions?.filter(item => !item.includes('select-all-shops'))?.join(',')
          : undefined
      const table = this.selectedTableOptions?.[0][0]
      const statusGroup = this.selectedTableOptions?.find(option => !option.includes('BATCHES'))
        ? this.selectedTableOptions?.[0][1]
          ? this.selectedTableOptions?.map(option => option[1])?.join(',')
          : undefined
        : undefined
      const onAmazon = this.selectedTableOptions?.find(option => option.includes('BATCHES'))
        ? this.selectedTableOptions?.[0].length > 1
          ? Boolean(this.selectedTableOptions[0][1])
          : undefined
        : undefined
      const data = {
        shopIds,
        table,
        statusGroup,
        onAmazon,
      }
      const response = (await ClientModel.getShopsExport(data)) as unknown as Blob

      if (response) {
        const link = document.createElement('a')
        const formattedDate = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
        link.download = `store_report_${formattedDate}.xlsx`
        const href = URL.createObjectURL(response)
        link.href = href
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
          toast.success(t(TranslationKey['Data exported successfully']))
        }, 3000)
      }
    } catch (error) {
      toast.error(t(TranslationKey['Error while exporting data']))
    } finally {
      runInAction(() => (this.open = false))
      this.clearSelection()
    }
  }

  onChangeTableOptions = (value: string[][]) => {
    const isOrders = value.some(item => item.includes('ORDERS'))

    if (isOrders) {
      const hasAllOrdersOption = value.some(item => item.includes('select-all-orders'))
      const allOrdersOptionSelected = this.selectedTableOptions.some(
        item => item.includes('ORDERS') && item.length === 1,
      )
      const ordersOptions = createOrdersOptions()
        .map(orders => ['ORDERS', orders.value])
        .filter(item => !item.includes('select-all-orders'))
      const arraysMatch =
        value.length === ordersOptions.length && value.every(ids => ordersOptions.flat().includes(ids[1]))

      if (hasAllOrdersOption && !allOrdersOptionSelected) {
        this.selectedTableOptions = [['ORDERS']]
      } else if (!hasAllOrdersOption && allOrdersOptionSelected) {
        this.selectedTableOptions = []
      } else if (arraysMatch) {
        this.selectedTableOptions = [['ORDERS']]
      } else {
        this.selectedTableOptions = value.filter(item => !item.includes('select-all-orders'))
      }
    } else {
      const hasAllBatchesOption = value.some(item => item.includes('select-all-boxes'))
      const allBatchesOptionSelected = this.selectedTableOptions.some(
        item => item.includes('BOXES') && item.length === 1,
      )
      const boxesOptions = createBoxesOptions()
        .map(orders => ['BOXES', orders.value])
        .filter(item => !item.includes('select-all-boxes'))
      const arraysMatch =
        value.length === boxesOptions.length && value.every(ids => boxesOptions.flat().includes(ids[1]))

      if (hasAllBatchesOption && !allBatchesOptionSelected) {
        this.selectedTableOptions = [['BOXES']]
      } else if (!hasAllBatchesOption && allBatchesOptionSelected) {
        this.selectedTableOptions = []
      } else if (arraysMatch) {
        this.selectedTableOptions = [['BOXES']]
      } else {
        this.selectedTableOptions = value.filter(item => !item.includes('select-all-boxes'))
      }
    }
  }

  onChangeShopsOptions = (value: string[][]) => {
    const hasAllOption = value.some(item => item.includes('select-all-shops'))
    const allOptionSelected = this.selectedShopsOptions.some(item => item.includes('select-all-shops'))
    const shopsOptions = this.shops.map(shop => [shop._id])
    const allOptions = [...shopsOptions, ['select-all-shops']]
    const arraysMatch = value.length === shopsOptions.length && value.every(ids => shopsOptions.flat().includes(ids[0]))

    if (hasAllOption && !allOptionSelected) {
      this.selectedShopsOptions = allOptions
    } else if (!hasAllOption && allOptionSelected) {
      this.selectedShopsOptions = []
    } else if (arraysMatch) {
      this.selectedShopsOptions = allOptions
    } else if (allOptionSelected) {
      this.selectedShopsOptions = value.filter(item => !item.includes('select-all-shops'))
    } else {
      this.selectedShopsOptions = value
    }
  }

  onDropdownVisibleChange(value: boolean) {
    this.open = value

    if (!value) {
      this.clearSelection()
    }
  }

  onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    this.inputValue = event.target.value
  }

  clearSelection() {
    this.selectedShopsOptions = []
    this.selectedTableOptions = []
    this.inputValue = ''
  }
}
