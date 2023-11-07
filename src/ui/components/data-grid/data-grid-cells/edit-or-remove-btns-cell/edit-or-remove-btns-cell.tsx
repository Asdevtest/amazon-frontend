/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './edit-or-remove-btns-cell.style'

interface EditOrRemoveBtnsCellProps {
  row: any
  handlers: {
    onClickEditBtn: (row: any) => void
    onClickRemoveBtn: (row: any) => void
  }
  isSubUsersTable?: boolean
  disableActionBtn?: boolean
  tooltipFirstButton?: string
  tooltipSecondButton?: string
  isFirstRow?: boolean
}

export const EditOrRemoveBtnsCell: FC<EditOrRemoveBtnsCellProps> = React.memo(props => {
  const { classes: styles } = useDataGridCellStyles()
  const { row, handlers, isSubUsersTable, disableActionBtn, tooltipFirstButton, tooltipSecondButton, isFirstRow } =
    props

  return (
    <div className={styles.editOrRemoveBtnsCell}>
      <Button
        tooltipInfoContent={isFirstRow ? tooltipFirstButton : ''}
        variant="contained"
        color="primary"
        disabled={disableActionBtn}
        className={`${styles.rowCancelBtn}, ${styles.addPermissionBtn}`}
        onClick={() => handlers.onClickEditBtn(row)}
      >
        {isSubUsersTable ? t(TranslationKey['Assign permissions']) : t(TranslationKey.Edit)}
      </Button>

      <Button
        danger
        tooltipInfoContent={isFirstRow ? tooltipSecondButton : ''}
        disabled={disableActionBtn}
        className={styles.rowCancelBtn}
        onClick={() => {
          handlers.onClickRemoveBtn(row)
        }}
      >
        {t(TranslationKey.Remove)}
      </Button>
    </div>
  )
})
