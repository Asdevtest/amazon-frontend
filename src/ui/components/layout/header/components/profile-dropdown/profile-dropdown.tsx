import { Dropdown, MenuProps } from 'antd'
import { FC, memo, useMemo } from 'react'
import { CgProfile } from 'react-icons/cg'
import { GoChevronDown } from 'react-icons/go'
import { IoExitOutline } from 'react-icons/io5'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomAvatar } from '@components/shared/custom-avatar'
import { Text } from '@components/shared/text'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { Roles } from '@typings/enums/roles'
import { isResearcher } from '@typings/guards/roles'

import { useStyles } from './profile-dropdown.style'

import { ProfileDropdownModel } from './profile-dropdown.model'

export const ProfileDropdown: FC = memo(() => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const viewModel = useMemo(() => new ProfileDropdownModel(), [])

  const items: MenuProps['items'] = [
    {
      label: t(TranslationKey.Profile),
      icon: <CgProfile size={18} />,
      onClick: () => history.push(`/profile`),
      key: TranslationKey.Profile,
    },
    {
      label: t(TranslationKey.Exit),
      icon: <IoExitOutline size={18} />,
      onClick: viewModel.onExit,
      key: TranslationKey.Exit,
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={e => e.preventDefault()}>
        <div className={styles.flexContainer}>
          <div className={styles.flexContainer}>
            <CustomAvatar size={36} src={getUserAvatarSrc(viewModel.userInfo?._id)} />

            <div className={styles.userContainer}>
              <Text textRows={1} copyable={false} text={viewModel.userInfo?.name} className={styles.text} />

              {!isResearcher(Roles[viewModel.userInfo?.role]) && (
                <Text
                  textRows={1}
                  copyable={false}
                  text={toFixedWithDollarSign(viewModel.userInfo?.balance)}
                  className={styles.text}
                />
              )}
            </div>
          </div>
          <GoChevronDown />
        </div>
      </a>
    </Dropdown>
  )
})
