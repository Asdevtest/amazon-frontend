import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CustomSelect } from '@components/shared/custom-select'

import { RoleSelectModel } from '../model/model'

import classes from './RoleSelect.module.scss'

interface RoleSelectProps {}

export const RoleSelect: FC<RoleSelectProps> = memo(() => {
  const history = useNavigate()
  const [viewModel] = useState(() => new RoleSelectModel(history))

  return (
    <CustomSelect
      value={viewModel.userInfo?.role}
      options={viewModel.roles}
      disabled={viewModel.disabledRoleSelect}
      className={classes.root}
      onChange={viewModel.onChangeUserInfo}
    />
  )
})
