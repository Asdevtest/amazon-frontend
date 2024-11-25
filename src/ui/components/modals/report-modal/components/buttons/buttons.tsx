import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './buttons.style'

interface ButtonsProps {
  disabledSaveButton: boolean
  onSave: () => void
  onClose: () => void
}

export const Buttons: FC<ButtonsProps> = memo(props => {
  const { disabledSaveButton, onSave, onClose } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.flexRowContainer, styles.flexEnd)}>
      {/* <CustomCheckbox disabled className={styles.checkbox}>
          Add changes to the product
        </CustomCheckbox> */}

      <div className={styles.flexRowContainer}>
        <CustomButton type="primary" disabled={disabledSaveButton} onClick={onSave}>
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
