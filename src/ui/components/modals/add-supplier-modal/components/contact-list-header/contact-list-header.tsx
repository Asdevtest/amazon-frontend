import { FC, memo } from 'react'
import { IconType } from 'react-icons'
import { FaPlus } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './contact-list-header.style'

interface ContactListHeaderProps {
  listTitle: keyof typeof TranslationKey
  required?: boolean
  Icon?: IconType
  onClickButton: () => void
}

export const ContactListHeader: FC<ContactListHeaderProps> = memo(props => {
  const { Icon = FaPlus, listTitle, required, onClickButton } = props
  const { classes: styles } = useStyles()

  return (
    <div className={styles.listHeader}>
      <p>{`${t(TranslationKey[listTitle])}${required ? '*' : ''}`}</p>

      <CustomButton type="text" size="small" icon={<Icon size={10} className="icon" />} onClick={onClickButton} />
    </div>
  )
})
