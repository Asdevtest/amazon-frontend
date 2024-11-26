import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { FC, UIEvent, useCallback, useMemo } from 'react'

import { ProductCell } from '@components/data-grid/data-grid-cells'
import { AsinOption } from '@components/modals/report-modal/components/header/asin-option'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { IChangeData, getDefaultOption, getOptions } from './asin-select.config'
import { AsinSelectModel } from './asin-select.model'

interface AsinSelectProps extends Omit<CustomSelectProps, 'options'> {
  onChangeData: IChangeData
  defaultData?: BaseOptionType
}

export const AsinSelect: FC<AsinSelectProps> = observer(props => {
  const { onChangeData, defaultData, ...restProps } = props

  const viewModel = useMemo(() => new AsinSelectModel(), [])

  const handlePopupScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      const element = e.target as HTMLElement
      const scrollTop = element?.scrollTop
      const containerHeight = element?.clientHeight
      const contentHeight = element?.scrollHeight

      if (contentHeight - (scrollTop + containerHeight) < 128) {
        viewModel.loadMoreDataHadler()
      }
    },
    [viewModel.loadMoreDataHadler],
  )
  const handleDropdownVisibleChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        viewModel.onGetData()
      }
    },
    [viewModel.onGetData],
  )

  const options = useMemo(() => getOptions(viewModel.currentPermissionsData), [viewModel.currentPermissionsData])
  const defaultOption = useMemo(() => getDefaultOption(defaultData), [defaultData])

  return (
    <CustomSelect
      {...restProps}
      showSearch
      filterOption={false}
      defaultActiveFirstOption={false}
      options={options}
      value={defaultOption}
      optionRender={({ data }) => <AsinOption data={data} />}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onSearch={viewModel.onClickSubmitSearch}
      onPopupScroll={handlePopupScroll}
      onSelect={(_, option) => onChangeData(option)}
    />
  )
})
