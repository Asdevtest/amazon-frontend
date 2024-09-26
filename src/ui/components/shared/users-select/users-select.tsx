import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { IFullUser } from '@typings/shared/full-user'

import { UserOption } from './user-option'
import { IChangeData } from './users-selec.config'
import { UsersSelectModel } from './users-select.model'

interface UsersSelectProps extends Omit<CustomSelectProps, 'options'> {
  defaultUser?: IFullUser
  onChangeData?: IChangeData
}

export const UsersSelect: FC<UsersSelectProps> = observer(props => {
  const { defaultUser, onChangeData, ...restProps } = props

  const viewModel = useMemo(() => new UsersSelectModel(defaultUser), [])

  return (
    <CustomSelect
      {...restProps}
      filterOption={false}
      defaultActiveFirstOption={false}
      placeholder="Select user"
      options={viewModel.userOptions}
      value={viewModel.defaultUserOption}
      optionRender={({ data }) => <UserOption user={data} onChangeData={onChangeData} />}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onClickSubmitSearch}
      onPopupScroll={viewModel.onScroll}
    />
  )
})
