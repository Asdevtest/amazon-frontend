import { action, computed } from 'mobx'

import { ICountry } from '@typings/shared/country'

export const countrySelectConfig = {
  getCountriesOption: computed,
  onDropdownVisibleChange: action.bound,
  onSearchChange: action.bound,
}

export const getCounryOptions = (coutries: ICountry[]) =>
  coutries?.map(coutry => ({
    ...coutry,
    value: coutry?._id,
    label: coutry?.title,
  }))
