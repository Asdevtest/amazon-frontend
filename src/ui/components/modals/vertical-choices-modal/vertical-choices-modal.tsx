import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './vertical-choices-modal.style'

interface VerticalChoicesFormProps {
  title?: string
  firstButtonText?: string
  onClickFirstButton?: () => void
  secondButtonText?: string
  onClickSecondButton?: () => void
  thirdButtonText?: string
  onClickThirdButton?: () => void
}

export const VerticalChoicesModal: FC<VerticalChoicesFormProps> = memo(props => {
  const {
    title,
    firstButtonText,
    onClickFirstButton,
    secondButtonText,
    onClickSecondButton,
    thirdButtonText,
    onClickThirdButton,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      {title ? <p className={styles.title}>{t(TranslationKey[title as TranslationKey])}</p> : null}

      {firstButtonText && onClickFirstButton ? (
        <CustomButton block size="large" type="primary" onClick={onClickFirstButton}>
          {t(TranslationKey[firstButtonText as TranslationKey])}
        </CustomButton>
      ) : null}

      {secondButtonText && onClickSecondButton ? (
        <CustomButton block size="large" onClick={onClickSecondButton}>
          {t(TranslationKey[secondButtonText as TranslationKey])}
        </CustomButton>
      ) : null}

      {thirdButtonText && onClickThirdButton ? (
        <CustomButton block size="large" onClick={onClickThirdButton}>
          {t(TranslationKey[thirdButtonText as TranslationKey])}
        </CustomButton>
      ) : null}
    </div>
  )
})
