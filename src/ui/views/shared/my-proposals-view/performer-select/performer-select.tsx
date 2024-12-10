import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/selects/custom-select'
import { CustomSelectProps } from '@components/shared/selects/custom-select/custom-select'

import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

import { PerformerOption } from './performer-option'
import { IChangeData, getDefaultUserOption, getUserOptions } from './performer-select.config'
import { PerformerSelectModel } from './performer-select.model'

interface PerformerSelectProps extends Omit<CustomSelectProps, 'options'> {
  onChangeData: IChangeData
  spec?: ISpec
  defaultPerformer?: IFullUser
}

export const PerformerSelect: FC<PerformerSelectProps> = observer(props => {
  const { onChangeData, spec, defaultPerformer, ...restProps } = props

  const viewModel = useMemo(() => new PerformerSelectModel(), [])
  const defaultUserOption = useMemo(() => getDefaultUserOption(defaultPerformer), [defaultPerformer])
  const userOptions = useMemo(() => getUserOptions(viewModel.data, spec, defaultPerformer), [viewModel.data])

  return (
    <div onClick={e => e.stopPropagation()}>
      <CustomSelect
        {...restProps}
        showSearch
        filterOption={false}
        defaultActiveFirstOption={false}
        placeholder="Select performer"
        options={userOptions}
        value={defaultUserOption}
        optionRender={({ data }) => <PerformerOption data={data} onChangeData={onChangeData} />}
        onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
        onSearch={viewModel.onSearchSubmit}
        onPopupScroll={viewModel.loadMoreData}
      />
    </div>
  )
})
