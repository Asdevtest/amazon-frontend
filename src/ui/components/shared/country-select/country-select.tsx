import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/selects/custom-select'

import { CustomSelectProps } from '../selects/custom-select/custom-select'

import { CountryOption } from './country-option'
import { CountrySelectModel } from './country-select.model'

interface CountrySelectProps extends CustomSelectProps {}

export const CountrySelect: FC<CountrySelectProps> = observer(props => {
  const viewModel = useMemo(() => new CountrySelectModel(), [])

  return (
    <CustomSelect
      {...props}
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
    />
  )
})
