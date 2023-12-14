import { FC, memo } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './normal-action-btn-cell.style'

interface NormalActionBtnCellProps {
  bTnText: string
  tooltipText: string
  onClickOkBtn: () => void
  isShowCancelButton?: boolean
  disabled?: boolean
  isFirstRow?: boolean
  operationType?: string
  rowId?: string
  boxId?: string
  onClickCancelTask?: (boxId?: string, rowId?: string, operationType?: string) => void
}

export const NormalActionBtnCell: FC<NormalActionBtnCellProps> = memo(props => {
  const {
    onClickOkBtn,
    bTnText,
    tooltipText,
    disabled,
    isFirstRow,
    isShowCancelButton,
    operationType,
    rowId,
    boxId,
    onClickCancelTask,
  } = props
  const { classes: styles } = useStyles()

  const showCancelButton = isShowCancelButton && operationType !== TaskOperationType.RECEIVE

  return (
    <div className={styles.wrapper}>
      <Button
        disabled={disabled}
        tooltipInfoContent={isFirstRow ? tooltipText : ''}
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={onClickOkBtn}
      >
        {bTnText}
      </Button>

      {showCancelButton && (
        <Button
          danger
          tooltipInfoContent={
            isFirstRow ? t(TranslationKey['The task will be canceled, the box will keep its previous state']) : ''
          }
          className={styles.button}
          onClick={() => (onClickCancelTask ? onClickCancelTask(boxId, rowId, operationType) : undefined)}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      )}
    </div>
  )
})
