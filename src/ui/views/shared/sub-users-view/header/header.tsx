import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './header.style'

interface HeaderProps {
  onChangeUnserverSearchValue: (value: string) => void
  onToggleAddSubUserModal: () => void
}

export const Header: FC<HeaderProps> = memo(props => {
  const { onChangeUnserverSearchValue, onToggleAddSubUserModal } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.header}>
      {/* <CustomButton type="primary">{t(TranslationKey['Assign permissions'])}</CustomButton> */}
      <div />
      <CustomInputSearch
        enterButton
        allowClear
        size="large"
        placeholder="Search by name, email"
        onSearch={onChangeUnserverSearchValue}
      />
      <CustomButton type="primary" size="large" icon={<FiPlus />} onClick={onToggleAddSubUserModal}>
        {t(TranslationKey['Add a user'])}
      </CustomButton>
    </div>
  )
})
