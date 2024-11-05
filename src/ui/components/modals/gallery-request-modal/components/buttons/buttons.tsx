import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './buttonts.style'

interface ButtonsProps {
  disabled: boolean
  onClick: () => void
  buttonText?: string
}

export const Buttons: FC<ButtonsProps> = memo(({ disabled, onClick, buttonText }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <CustomButton icon={!buttonText && <FiPlus size={16} />} disabled={disabled} onClick={onClick}>
        {buttonText || t(TranslationKey['Add to request'])}
      </CustomButton>
    </div>
  )
})
