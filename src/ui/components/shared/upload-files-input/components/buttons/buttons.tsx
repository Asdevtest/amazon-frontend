import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

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
      <CustomButton disabled={disabled} variant="outlined" onClick={onShowImages}>
        {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
      </CustomButton>

      <p className={styles.imagesCount}>
        <span className={styles.imagesCountSpan}>{`${quantity || 0}/${maxNumber}`}</span>
        {t(TranslationKey.files)}
      </p>

      <CustomButton danger disabled={disabled} type="primary" onClick={onRemoveAllFiles}>
        {t(TranslationKey['Remove all'])}
      </CustomButton>
    </div>
  )
})
