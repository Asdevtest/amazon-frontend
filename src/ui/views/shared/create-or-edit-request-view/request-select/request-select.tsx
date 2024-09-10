import { observer } from 'mobx-react'
import { FC, UIEvent, useCallback, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { debounce } from '@utils/debounce'

import { RequestOption } from './request-option'
import { IChangeData, getRequestTemplateOptions } from './request-select.config'
import { RequestSelectModel } from './request-select.model'

interface RequestSelectProps extends CustomSelectProps {
  onChangeData: IChangeData
}

export const RequestSelect: FC<RequestSelectProps> = observer(({ onChangeData, ...restProps }) => {
  const viewModel = useMemo(() => new RequestSelectModel(onChangeData), [])

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
        viewModel.onGetProducts()
      }
    },
    [viewModel.onGetProducts],
  )

  const requestTemplateOptions = useMemo(
    () => getRequestTemplateOptions(viewModel.requestTemplateOptions),
    [viewModel.requestTemplateOptions],
  )

  const handleSearch = debounce((value: string) => viewModel.onClickSubmitSearch(value))

  return (
    <CustomSelect
      {...restProps}
      showSearch
      allowClear
      size="large"
      label="Request templates"
      filterOption={false}
      defaultActiveFirstOption={false}
      placeholder="Select request ID"
      options={requestTemplateOptions}
      optionRender={({ data }) => <RequestOption data={data} />}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onSearch={handleSearch}
      onPopupScroll={handlePopupScroll}
      onChange={viewModel.onSelectProduct}
    />
  )
})
