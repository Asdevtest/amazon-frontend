import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { AsinOption } from '@components/modals/report-modal/components/header/asin-option'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { IChangeData, getDefaultOption } from './asin-select.config'
import { AsinSelectModel } from './asin-select.model'

interface AsinSelectProps extends Omit<CustomSelectProps, 'options'> {
  onChangeData: IChangeData
  defaultData?: BaseOptionType
}

export const AsinSelect: FC<AsinSelectProps> = observer(props => {
  const { onChangeData, defaultData, ...restProps } = props

  const viewModel = useMemo(() => new AsinSelectModel(), [])
  const defaultOption = useMemo(() => getDefaultOption(defaultData), [defaultData])

  return (
    <CustomSelect
      {...restProps}
      showSearch
      filterOption={false}
      defaultActiveFirstOption={false}
      options={viewModel.asinOptions}
      value={defaultOption}
      optionRender={({ data }) => <AsinOption data={data} />}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onSearchSubmit}
      onPopupScroll={viewModel.loadMoreData}
      onSelect={(_, option) => onChangeData(option)}
    />
  )
})
