import { observer } from 'mobx-react'
import { FC, UIEvent, useCallback, useMemo, useState } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

import { IChangeData, getDefaultUserOption, getUserOptions } from './performer-select.config'
import { PerformerSelectModel } from './performer-select.model'
import { PerformerOption } from './request-option'

interface PerformerSelectProps extends Omit<CustomSelectProps, 'options'> {
  onChangeData: IChangeData
  spec?: ISpec
  defaultPerformer?: IFullUser
}

export const PerformerSelect: FC<PerformerSelectProps> = observer(props => {
  const { onChangeData, spec, defaultPerformer, ...restProps } = props

  const [viewModel] = useState(() => new PerformerSelectModel())

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
        viewModel.onGetUsers()
      }
    },
    [viewModel.onGetUsers],
  )
  const defaultUserOption = useMemo(() => getDefaultUserOption(defaultPerformer), [defaultPerformer])
  const userOptions = useMemo(
    () => getUserOptions(viewModel.currentPermissionsData, spec, defaultPerformer),
    [viewModel.currentPermissionsData],
  )

  return (
    <div onClick={e => e.stopPropagation()}>
      <CustomSelect
        {...restProps}
        filterOption={false}
        defaultActiveFirstOption={false}
        placeholder="Select performer"
        options={userOptions}
        value={defaultUserOption}
        optionRender={({ data }) => <PerformerOption data={data} onChangeData={onChangeData} />}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        onSearch={viewModel.onClickSubmitSearch}
        onPopupScroll={handlePopupScroll}
      />
    </div>
  )
})
