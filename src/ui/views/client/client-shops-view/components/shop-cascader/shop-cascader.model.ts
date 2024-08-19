import { format } from 'date-fns'
import { makeAutoObservable } from 'mobx'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'

import { IExportOption, getExportOptionsForShopsView } from './helpers/get-export-options'

export class ShopsCascaderModel {
  data: IShop[]
  open = false
  inputValue = ''
  exportOptions: IExportOption[] = []
  selectedExportOptions: IExportOption[] = []

  get filteredOptions() {
    const generetadOptions: IExportOption[] = this.data?.map(({ name, _id }) => ({ label: name, value: _id }))

    return getExportOptionsForShopsView(generetadOptions, this.selectedExportOptions, this.inputValue)
  }

  constructor(data: IShop[]) {
    this.data = data

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getShopsExport() {
    try {
      const response = await ClientModel.getShopsExport(this.selectedExportOptions)

      if (response) {
        const jsonData = JSON.stringify(response)
        const blob = new Blob([jsonData], { type: 'application/json' })
        const href = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = href
        const formattedDate = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
        link.download = `permissions-${formattedDate}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
          toast.success(t(TranslationKey['Data exported successfully']))
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      toast.success(t(TranslationKey['Data exported successfully']))
    } finally {
      this.open = false
    }
  }

  onChangeExportOptions = (value: IExportOption[], selectOptions: IExportOption[]) => {
    this.selectedExportOptions = value
  }

  onDropdownVisibleChange(value: boolean) {
    this.open = value
  }

  onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    this.inputValue = event.target.value
  }
}
