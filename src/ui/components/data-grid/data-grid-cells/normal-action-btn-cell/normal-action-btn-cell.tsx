import { FC, MouseEvent, memo } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './normal-action-btn-cell.style'

interface NormalActionBtnCellProps {
  bTnText: string
  tooltipText?: string
  onClickOkBtn?: () => void
  isShowCancelButton?: boolean
  disabled?: boolean
  isFirstRow?: boolean
  operationType?: string
  rowId?: string
  boxId?: string
  fullWidthButton?: boolean
  casual?: boolean
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
    casual,
    onClickCancelTask,
  } = props
  const { classes: styles, cx } = useStyles()

  const buttonStyle = cx(styles.button)
  const showCancelButton = isShowCancelButton && operationType !== TaskOperationType.RECEIVE

  return (
    <div className={styles.wrapper}>
      <Button
        styleType={casual ? ButtonType.CASUAL : ButtonType.PRIMARY}
        disabled={disabled}
        tooltipInfoContent={isFirstRow ? tooltipText : ''}
        className={buttonStyle}
        onClick={(e: MouseEvent) => {
          e.stopPropagation()

          if (onClickOkBtn) {
            onClickOkBtn()
          }
        }}
      >
        {bTnText}
      </Button>

      {showCancelButton && (
        <Button
          styleType={ButtonType.DANGER}
          tooltipInfoContent={
            isFirstRow ? t(TranslationKey['The task will be canceled, the box will keep its previous state']) : ''
          }
          className={buttonStyle}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()

            if (onClickCancelTask) {
              onClickCancelTask(boxId, rowId, operationType)
            }
          }}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      )}
    </div>
  )
})
