import { Dropdown, MenuProps } from 'antd'
import { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CgProfile } from 'react-icons/cg'
import { GoChevronDown } from 'react-icons/go'
import { IoExitOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CustomAvatar } from '@components/shared/custom-avatar'
import { CustomText } from '@components/shared/custom-text'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixedWithDollarSign } from '@utils/text'

import { Roles } from '@typings/enums/roles'
import { isResearcher } from '@typings/guards/roles'

import { ProfileDropdownModel } from '../model/model'

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
        <div className={classes.flexContainer}>
          <div className={classes.flexContainer}>
            <CustomAvatar size={36} src={getUserAvatarSrc(viewModel.userInfo?._id)} />

            <div className={classes.userContainer}>
              <CustomText>{viewModel.userInfo?.name}</CustomText>

              {!isResearcher(Roles[viewModel.userInfo?.role]) && (
                <CustomText>{toFixedWithDollarSign(viewModel.userInfo?.balance)}</CustomText>
              )}
            </div>
          </div>
          <GoChevronDown />
        </div>
      </a>
    </Dropdown>
  )
})
