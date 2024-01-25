import { FC, memo } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './warehouse-my-tasks-btns-cell.style'

interface WarehouseMyTasksBtnsCellProps {
  specType: string
  rowId: string
  boxId: string
  handlers: {
    onClickResolveBtn: (rowId: string) => void
    onClickCancelTask: (boxId: string, rowId: string, specType: string) => void
  }
  isFirstRow?: boolean
}

export const WarehouseMyTasksBtnsCell: FC<WarehouseMyTasksBtnsCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { handlers, isFirstRow, specType, rowId, boxId } = props

  return (
    <div className={styles.warehouseMyTasksBtnsWrapper}>
      <Button
        success
        tooltipInfoContent={isFirstRow ? t(TranslationKey['Open a window to perform a task']) : ''}
        className={styles.button}
        onClick={() => handlers.onClickResolveBtn(rowId)}
      >
        {t(TranslationKey.Resolve)}
      </Button>

      {specType !== TaskOperationType.RECEIVE && (
        <Button
          danger
          tooltipInfoContent={
            isFirstRow ? t(TranslationKey['The task will be canceled, the box will keep its previous state']) : ''
          }
          className={styles.button}
          onClick={() => handlers.onClickCancelTask(boxId, rowId, specType)}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      )}
    </div>
  )
})
