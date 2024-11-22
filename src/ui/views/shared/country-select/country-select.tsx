import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { CountryOption } from './country-option'
import { IChangeData } from './country-select.config'
import { CountrySelectModel } from './country-select.model'

interface CountrySelectProps extends CustomSelectProps {
  onChangeData: IChangeData
}

export const CountrySelect: FC<CountrySelectProps> = observer(({ onChangeData, ...restProps }) => {
  const viewModel = useMemo(() => new CountrySelectModel(onChangeData), [])

  return (
    <CustomSelect
      {...restProps}
      showSearch
      allowClear
      label="Marketplace"
      filterOption={false}
      defaultActiveFirstOption={false}
      placeholder="Search"
      options={viewModel.getCountriesOption}
      optionRender={({ data }) => <CountryOption data={data} />}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onSearchChange}
      onChange={viewModel.onSelectCountry}
    />
  )
})
