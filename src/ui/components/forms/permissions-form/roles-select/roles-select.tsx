import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/selects/custom-select'
import { Text } from '@components/shared/text'

import { Roles } from '@typings/enums/roles'
import { IFullUser } from '@typings/shared/full-user'

interface RolesSelectProps {
  user?: IFullUser
  value?: Roles
  onChangeRole: (role: Roles) => void
}

export const RolesSelect: FC<RolesSelectProps> = observer(props => {
  const { user, value, onChangeRole } = props

  if (!user || user.allowedRoles.length <= 1) {
    return null
  }

  const options = useMemo(() => user.allowedRoles.map(role => ({ value: role, label: Roles[role] })), [])

  return (
    <CustomSelect
      size="large"
      filterOption={false}
      style={{ width: '160px' }}
      defaultActiveFirstOption={false}
      options={options}
      value={value}
      optionRender={({ label }) => <Text copyable={false} text={label as string} />}
      onChange={onChangeRole}
    />
  )
})
