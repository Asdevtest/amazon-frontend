import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { UserOption } from '@components/forms/permissions-form/users-select/user-option'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'

import { IFullUser } from '@typings/shared/full-user'

import { IChangeData } from './asin-select.config'
import { UsersSelectModel } from './asin-select.model'

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
      showSearch
      filterOption={false}
      defaultActiveFirstOption={false}
      style={{ width: '320px' }}
      options={viewModel.userOptions}
      value={viewModel.defaultUserOption}
      optionRender={({ data }) => <UserOption user={data} />}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onClickSubmitSearch}
      onPopupScroll={viewModel.onScroll}
    />
  )
})
