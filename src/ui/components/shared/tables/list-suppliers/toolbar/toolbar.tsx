import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './toolbar.style'

interface ToolbarProps {
  showVisibilityButton: boolean
  onAddOrEditSupplierModal: () => void
}

export const Toolbar: FC<ToolbarProps> = memo(({ showVisibilityButton, onAddOrEditSupplierModal }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.toolbar}>
      <p className={styles.tableTitle}>{t(TranslationKey['List of suppliers'])}</p>

      <div className={styles.actionsButtons}>
        {showVisibilityButton && (
          <Button styleType={ButtonType.CASUAL} className={styles.visibilityButton} onClick={onAddOrEditSupplierModal}>
            <EyeIcon className={styles.visibilityIcon} />
          </Button>
        )}
      </div>
    </div>
  )
})
