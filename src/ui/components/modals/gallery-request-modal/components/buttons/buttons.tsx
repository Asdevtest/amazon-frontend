import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

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
      <Button disabled={disabled} onClick={onClick}>
        {buttonText ? (
          buttonText
        ) : (
          <>
            <FiPlus style={{ width: 16, height: 16 }} />
            {t(TranslationKey['Add to request'])}
          </>
        )}
      </Button>
    </div>
  )
})
