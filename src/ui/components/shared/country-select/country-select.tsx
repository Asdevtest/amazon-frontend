import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/selects/custom-select'

import { ICountry } from '@typings/shared/country'

import { CountryOption } from './country-option'
import { IChangeData, getDefaultCountryOption } from './country-select.config'
import { CountrySelectModel } from './country-select.model'

interface CountrySelectProps {
  defaultCountry?: ICountry
  onChangeData?: IChangeData
}

export const CountrySelect: FC<CountrySelectProps> = observer(({ defaultCountry, onChangeData }) => {
  const viewModel = useMemo(() => new CountrySelectModel(), [])

  return (
    <CustomSelect
      showSearch
      allowClear
      label="Marketplace"
      filterOption={false}
      defaultActiveFirstOption={false}
      placeholder="Search"
      options={viewModel.getCountriesOption}
      defaultValue={getDefaultCountryOption(defaultCountry)}
      optionRender={({ data }) => <CountryOption data={data} />}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onSearchChange}
      onChange={value => onChangeData?.(value)}
    />
  )
})
