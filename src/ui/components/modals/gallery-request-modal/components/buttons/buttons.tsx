import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './buttonts.style'

interface ButtonsProps {
  disabled: boolean
  onClick: () => void
}

export const Buttons: FC<ButtonsProps> = memo(({ disabled, onClick }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Button disabled={disabled} className={styles.button} onClick={onClick}>
        <CustomPlusIcon />
        {t(TranslationKey['Add to request'])}
      </Button>
    </div>
  )
})
