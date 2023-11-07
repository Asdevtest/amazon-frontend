import React, { FC } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './warehouse-my-tasks-btns-cell.style'

interface WarehouseMyTasksBtnsCellProps {
  operationType: string
  rowId: string
  boxId: string
  handlers: {
    onClickResolveBtn: (rowId: string) => void
    onClickCancelTask: (boxId: string, rowId: string, operationType: string) => void
  }
  isFirstRow?: boolean
}

export const WarehouseMyTasksBtnsCell: FC<WarehouseMyTasksBtnsCellProps> = React.memo(props => {
  const { classes: styles, cx } = useDataGridCellStyles()
  const { handlers, isFirstRow, operationType, rowId, boxId } = props

  return (
    <div className={styles.warehouseMyTasksBtnsWrapper}>
      <Button
        success
        tooltipInfoContent={isFirstRow ? t(TranslationKey['Open a window to perform a task']) : ''}
        className={styles.warehouseMyTasksSuccessBtn}
        onClick={() => handlers.onClickResolveBtn(rowId)}
      >
        {t(TranslationKey.Resolve)}
      </Button>

      {operationType !== TaskOperationType.RECEIVE && (
        <Button
          danger
          tooltipInfoContent={
            isFirstRow ? t(TranslationKey['The task will be canceled, the box will keep its previous state']) : ''
          }
          className={cx(styles.rowCancelBtn, styles.warehouseMyTasksCancelBtn)}
          onClick={() => {
            handlers.onClickCancelTask(boxId, rowId, operationType)
          }}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      )}
    </div>
  )
})
