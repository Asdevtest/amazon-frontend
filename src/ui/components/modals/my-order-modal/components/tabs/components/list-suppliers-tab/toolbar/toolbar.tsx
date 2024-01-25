import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

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
          <button className={styles.visibilityButton} onClick={onAddOrEditSupplierModal}>
            <EyeIcon className={styles.visibilityIcon} />
          </button>
        )}
      </div>
    </div>
  )
})
