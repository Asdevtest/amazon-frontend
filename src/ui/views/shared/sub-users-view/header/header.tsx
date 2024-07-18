import { ChangeEventHandler, FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './header.style'

interface HeaderProps {
  onChangeUnserverSearchValue: ChangeEventHandler<HTMLInputElement>
  onToggleAddSubUserModal: VoidFunction
}

export const Header: FC<HeaderProps> = memo(props => {
  const { onChangeUnserverSearchValue, onToggleAddSubUserModal } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.header}>
      <CustomButton type="primary">{t(TranslationKey['Assign permissions'])}</CustomButton>
      <CustomInputSearch allowClear placeholder="Search by name, email" onChange={onChangeUnserverSearchValue} />
      <CustomButton type="primary" icon={<FiPlus />} onClick={onToggleAddSubUserModal}>
        {t(TranslationKey['Add a user'])}
      </CustomButton>
    </div>
  )
})
