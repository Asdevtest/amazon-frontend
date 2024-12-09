import { makeObservable } from 'mobx'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { OtherModel } from '@models/other-model'

import { ICountry } from '@typings/shared/country'

import { countrySelectConfig, getCounryOptions } from './country-select.config'

export class CountrySelectModel extends InfiniteScrollModel<ICountry> {
  searchValue: string = ''

  get getCountriesOption() {
    const countries = getCounryOptions(this.data)

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

  constructor() {
    super({ method: OtherModel.getCountries })
    makeObservable(this, countrySelectConfig)
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }

  onSearchChange = (searchValue: string) => {
    this.searchValue = searchValue
  }
}
