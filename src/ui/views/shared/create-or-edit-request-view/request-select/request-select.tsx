import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { RequestOption } from './request-option'
import { IChangeData } from './request-select.config'
import { RequestSelectModel } from './request-select.model'

interface RequestSelectProps extends CustomSelectProps {
  onChangeData: IChangeData
}

export const RequestSelect: FC<RequestSelectProps> = observer(({ onChangeData, ...restProps }) => {
  const viewModel = useMemo(() => new RequestSelectModel(onChangeData), [])

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
      options={viewModel.requestTemplateOptions}
      optionRender={({ data }) => <RequestOption data={data} />}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onSearchSubmit}
      onPopupScroll={viewModel.loadMoreData}
      onChange={viewModel.onSelectProduct}
    />
  )
})
