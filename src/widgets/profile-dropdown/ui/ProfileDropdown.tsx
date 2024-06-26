import { Dropdown, MenuProps, Space } from 'antd'
import { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CgProfile } from 'react-icons/cg'
import { GoChevronDown } from 'react-icons/go'
import { IoExitOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixedWithDollarSign } from '@utils/text'

import { Roles } from '@typings/enums/roles'
import { isResearcher } from '@typings/guards/roles'

import { ProfileDropdownModel } from '../model/ProfileDropdown.model'

import classes from './ProfileDropdown.module.scss'

interface ProfileDropdownProps {}

export const ProfileDropdown: FC<ProfileDropdownProps> = memo(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [viewModel] = useState(() => new ProfileDropdownModel())

  const handleExit = () => {
    toast.dismiss()
    toast.clearWaitingQueue()
    viewModel.signOut()
  }

  const items: MenuProps['items'] = [
    {
      label: t('Profile'),
      icon: <CgProfile />,
      onClick: () => navigate(`/profile`),
      key: '0',
    },
    {
      label: t('Exit'),
      icon: <IoExitOutline />,
      onClick: handleExit,
      key: '1',
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          <div className={classes.profileContainer}>
            <div>
              <img className={classes.avatar} src={getUserAvatarSrc(viewModel.userInfo?._id)} />
            </div>

            <div className={classes.userContainer}>
              <p className={classes.userName}>{viewModel.userInfo?.name}</p>

              {!isResearcher(Roles[viewModel.userInfo?.role]) && (
                <p className={classes.balance}>{toFixedWithDollarSign(viewModel.userInfo?.balance)}</p>
              )}
            </div>
          </div>
          <GoChevronDown />
        </Space>
      </a>
    </Dropdown>
  )
})
