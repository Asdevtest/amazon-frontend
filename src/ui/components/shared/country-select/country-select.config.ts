import { action, computed } from 'mobx'

import { ICountry } from '@typings/shared/country'

export const countrySelectConfig = {
  getCountriesOption: computed,

  onDropdownVisibleChange: action.bound,
}

export const getCounryOptions = (coutries: ICountry[]) =>
  coutries?.map(coutry => ({
    ...coutry,
    value: coutry?._id,
    label: coutry?.title,
  }))

export const getDefaultCountryOption = (defaultCountry?: ICountry) => {
  if (defaultCountry) {
    return {
      ...defaultCountry,
      value: defaultCountry?._id,
      label: defaultCountry?.title,
    }
  }
}

export type IChangeData = (data: ICountry) => void
