import { BaseOptionType } from 'antd/es/select'
import { makeObservable } from 'mobx'

import { OtherModel } from '@models/other-model'

import { ICountry } from '@typings/shared/country'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { IChangeData, countrySelectConfig, getCounryOptions } from './country-select.config'

export class CountrySelectModel extends UseProductsPermissions {
  countryTemplate?: ICountry
  onChangeData?: IChangeData
  searchValue: string = ''

  get getCountriesOption() {
    const countries = getCounryOptions(this.currentPermissionsData)

    if (this.searchValue) {
      const searchLower = this.searchValue.toLowerCase().trim()
      return countries.filter(
        countryOption =>
          countryOption.title.toLowerCase().includes(searchLower) ||
          countryOption.shortTitle.toLowerCase().includes(searchLower),
      )
    }
    return countries
  }

  constructor(onChangeData: IChangeData) {
    super(OtherModel.getCountries)
    this.onChangeData = onChangeData
    makeObservable(this, countrySelectConfig)
  }

  onSelectCountry = (value: string, option: BaseOptionType) => {
    if (value) {
      this.countryTemplate = option as ICountry
      this.onChangeData?.(this.countryTemplate)
    }
  }

  onGetCounriers = () => {
    this.permissionsData = []
    this.isCanLoadMore = true
    this.setOptions({ offset: 0, filters: '' })
    this.getPermissionsData()
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.onGetCounriers()
    }
  }

  onSearchChange = (searchValue: string) => {
    this.searchValue = searchValue
  }
}
