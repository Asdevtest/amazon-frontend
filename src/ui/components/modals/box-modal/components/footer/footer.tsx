import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './footer.style'

interface FooterProps {
  isEdit: boolean
  disableSaveButton: boolean
  onToggleModal: () => void
  onSubmitChangeFields: () => void
}

export const Footer: FC<FooterProps> = memo(props => {
  const { isEdit, disableSaveButton, onToggleModal, onSubmitChangeFields } = props

  const { classes: styles } = useStyles()

  const handleSubmitChangeFields = () => {
    onSubmitChangeFields()
    onToggleModal()
  }

  return (
    <div className={styles.wrapper}>
      {isEdit ? (
        <CustomButton type="primary" size="large" disabled={disableSaveButton} onClick={handleSubmitChangeFields}>
          {t(TranslationKey.Save)}
        </CustomButton>
      ) : null}

      <CustomButton size="large" onClick={onToggleModal}>
        {t(TranslationKey.Close)}
      </CustomButton>
    </div>
  )
})
