import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'
import { CustomSelectProps } from '@components/shared/custom-select/custom-select'
import { Text } from '@components/shared/text'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'

interface RolesSelectProps extends Omit<CustomSelectProps, 'options'> {
  user?: IFullUser
  onChangeRole: (role: Roles) => void
}

export const RolesSelect: FC<RolesSelectProps> = observer(props => {
  const { user, onChangeRole, ...restProps } = props

  if (!user || user.allowedRoles.length <= 1) {
    return null
  }

  const options = useMemo(() => user.allowedRoles.map(role => ({ value: role, label: Roles[role] })), [])

  return (
    <CustomSelect
      {...restProps}
      size="large"
      filterOption={false}
      defaultActiveFirstOption={false}
      options={options}
      defaultValue={user.role}
      optionRender={({ label }) => <Text copyable={false} text={label as string} />}
      onChange={onChangeRole}
    />
  )
})
