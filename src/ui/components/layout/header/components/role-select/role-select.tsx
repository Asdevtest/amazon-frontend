import { FC, memo, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { CustomSelect } from '@components/shared/custom-select'

import { useStyles } from './role-select.style'

import { RoleSelectModel } from './role-select.model'

export const RoleSelect: FC = memo(() => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const [viewModel] = useState(() => new RoleSelectModel(history))

  return (
    <CustomSelect
      isRow
      label="Your role:"
      value={viewModel.userInfo?.role}
      options={viewModel.roles}
      disabled={viewModel.disabledRoleSelect}
      className={styles.root}
      onChange={viewModel.onChangeUserInfo}
    />
  )
})
