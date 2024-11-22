import { action, computed, observable } from 'mobx'

import { ICountry } from '@typings/shared/country'

export const countrySelectConfig = {
  countryTemplate: observable,
  onChangeData: observable,

  getCountriesOption: computed,

  onSelectCountry: action.bound,
  onGetCounriers: action.bound,
  onDropdownVisibleChange: action.bound,
}

export const getCounryOptions = (coutries: any[], defaultPerformer?: ICountry) => {
  const filteredCountries = coutries.filter(coutry => coutry?._id !== defaultPerformer?._id)

  const generatedUsetOptions = filteredCountries?.map(coutry => ({
    ...coutry,
    value: coutry?._id,
    label: coutry?.title,
  }))
  // const defaultUserOption = { value: null, label: t(TranslationKey['Select user']) }

  return generatedUsetOptions /* [defaultUserOption, ...generatedUsetOptions] */
}

export type IChangeData = (data: ICountry) => void
