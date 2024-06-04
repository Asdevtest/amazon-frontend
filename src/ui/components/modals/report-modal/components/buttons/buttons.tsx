import { Button } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './buttons.style'

interface ButtonsProps {
  disabledSaveButton: boolean
  requestStatus: loadingStatus
  onSave: () => void
  onClose: () => void
}

export const Buttons: FC<ButtonsProps> = memo(props => {
  const { disabledSaveButton, requestStatus, onSave, onClose } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.flexRowContainer, styles.flexEnd)}>
      {/* <Checkbox disabled className={styles.checkbox}>
          {t(TranslationKey['Add changes to the product'])}
        </Checkbox> */}

      <div className={styles.flexRowContainer}>
        <Button
          type="primary"
          disabled={disabledSaveButton}
          loading={requestStatus === loadingStatus.IS_LOADING}
          onClick={onSave}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button danger onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
