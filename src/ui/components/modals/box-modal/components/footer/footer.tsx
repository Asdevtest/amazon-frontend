import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
        <Button styleType={ButtonStyle.SUCCESS} disabled={disableSaveButton} onClick={handleSubmitChangeFields}>
          {t(TranslationKey.Save)}
        </Button>
      ) : null}

      <Button styleType={ButtonStyle.CASUAL} onClick={onToggleModal}>
        {t(TranslationKey.Close)}
      </Button>
    </div>
  )
})
