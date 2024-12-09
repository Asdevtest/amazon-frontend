import { action, computed, observable } from 'mobx'

import { ICountry } from '@typings/shared/country'

export const countrySelectConfig = {
  countryTemplate: observable,
  onChangeData: observable,

  getCountriesOption: computed,
  getDefaultCountryOption: computed,

  onSelectCountry: action.bound,
  onDropdownVisibleChange: action.bound,
}

export const getCounryOptions = (coutries: ICountry[], defaultPerformer?: ICountry) => {
  const filteredCountries = coutries.filter(coutry => coutry?._id !== defaultPerformer?._id)

  const generatedUsetOptions = filteredCountries?.map(coutry => ({
    ...coutry,
    value: coutry?._id,
    label: coutry?.title,
  }))

  return generatedUsetOptions
}

export const getDefaultCountryOption = (defaultPerformer?: ICountry) => {
  if (defaultPerformer) {
    return {
      ...defaultPerformer,
      value: defaultPerformer?._id,
      label: defaultPerformer?.title,
    }
  }
}

export type IChangeData = (data: ICountry) => void
