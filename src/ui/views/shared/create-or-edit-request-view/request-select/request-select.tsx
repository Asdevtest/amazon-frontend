import { observer } from 'mobx-react'
import { FC, UIEvent, useCallback, useMemo, useState } from 'react'

import { CustomSelect } from '@components/shared/custom-select'

import { IRequest } from '@typings/models/requests/request'

import { RequestOption } from './request-option'
import { getRequestTemplateOptions } from './request-select.config'
import { RequestSelectModel } from './request-select.model'

interface RequestSelectProps {
  setData: (data: IRequest) => void
}

export const RequestSelect: FC<RequestSelectProps> = observer(({ setData }) => {
  const [viewModel] = useState(() => new RequestSelectModel(setData))

  const handlePopupScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      const element = e.target as HTMLElement
      const scrollTop = element?.scrollTop
      const containerHeight = element?.clientHeight
      const contentHeight = element?.scrollHeight

      if (contentHeight - (scrollTop + containerHeight) < 90) {
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

  return (
    <CustomSelect
      showSearch
      size="large"
      label="Use data from an exist"
      filterOption={false}
      defaultActiveFirstOption={false}
      placeholder="Select request ID"
      options={requestTemplateOptions}
      optionRender={({ data }) => <RequestOption data={data} />}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onSearch={viewModel.onClickSubmitSearch}
      onPopupScroll={handlePopupScroll}
      onChange={viewModel.onSelectProduct}
    />
  )
})
