import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ParserModel } from '@models/parser-model'
import { ShopModel } from '@models/shop-model'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'

import { getShopsOptions, getTableOptions } from './helpers/get-options'

export class LinkCascaderModel {
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
    return this.open ? getTableOptions() : []
  }
  get disabledLinkButton() {
    return !this.selectedTableOptions?.length || !this.selectedShopsOptions?.length
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

  async onBindProductToTable() {
    try {
      const data = {
        shopIds: this.selectedShopsOptions.flat(),
        tables: this.selectedTableOptions.flat(),
      }
      await ParserModel.bindProductToTable(data)
      toast.success(t(TranslationKey['Data exported successfully']))
    } catch (error) {
      toast.error(t(TranslationKey['Error while exporting data']))
    } finally {
      runInAction(() => (this.open = false))
      this.clearSelection()
    }
  }

  onChangeTableOptions = (value: string[][]) => {
    const hasAllOption = value.some(item => item.includes('select-all-tables'))
    const allOptionSelected = this.selectedTableOptions.some(item => item.includes('select-all-tables'))
    const allOptions = getTableOptions().map(table => [table.value])
    const tablesOptions = allOptions.filter(item => !item.includes('select-all-tables'))
    const arraysMatch =
      value.length === tablesOptions.length && value.every(ids => tablesOptions.flat().includes(ids[0]))

    if (hasAllOption && !allOptionSelected) {
      this.selectedTableOptions = allOptions
    } else if (!hasAllOption && allOptionSelected) {
      this.selectedTableOptions = []
    } else if (arraysMatch) {
      this.selectedTableOptions = allOptions
    } else if (allOptionSelected) {
      this.selectedTableOptions = value.filter(item => !item.includes('select-all-tables'))
    } else {
      this.selectedTableOptions = value
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
