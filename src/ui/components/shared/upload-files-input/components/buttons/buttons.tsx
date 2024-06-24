import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './buttons.style'

interface ButtonsProps {
  quantity: number
  disabled: boolean
  showImages: boolean
  onShowImages: () => void
  onRemoveAllFiles: () => void
  maxNumber?: number
}

export const Buttons: FC<ButtonsProps> = memo(props => {
  const { quantity, disabled, showImages, onShowImages, onRemoveAllFiles, maxNumber = 50 } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttonsWrapper}>
      <Button disabled={disabled} variant={ButtonVariant.OUTLINED} onClick={onShowImages}>
        {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
      </Button>

      <p className={styles.imagesCount}>
        <span className={styles.imagesCountSpan}>{`${quantity || 0}/${maxNumber}`}</span>
        {t(TranslationKey.files)}
      </p>

      <Button
        disabled={disabled}
        styleType={ButtonStyle.DANGER}
        variant={ButtonVariant.OUTLINED}
        onClick={onRemoveAllFiles}
      >
        {t(TranslationKey['Remove all'])}
      </Button>
    </div>
  )
})
