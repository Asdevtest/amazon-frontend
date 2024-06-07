import { Button } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

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
      {/* <Checkbox disabled className={styles.checkbox}>
          {t(TranslationKey['Add changes to the product'])}
        </Checkbox> */}

      <div className={styles.flexRowContainer}>
        <Button type="primary" disabled={disabledSaveButton} onClick={onSave}>
          {t(TranslationKey.Save)}
        </Button>
        <Button danger onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
