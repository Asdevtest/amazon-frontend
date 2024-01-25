import { FC, memo } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './normal-action-btn-cell.style'

interface NormalActionBtnCellProps {
  bTnText: string
  tooltipText?: string
  onClickOkBtn?: () => void
  isShowCancelButton?: boolean
  disabled?: boolean
  isFirstRow?: boolean
  specType?: string
  rowId?: string
  boxId?: string
  fullWidthButton?: boolean
  casual?: boolean
  onClickCancelTask?: (boxId?: string, rowId?: string, specType?: string) => void
}

export const NormalActionBtnCell: FC<NormalActionBtnCellProps> = memo(props => {
  const {
    onClickOkBtn,
    bTnText,
    tooltipText,
    disabled,
    isFirstRow,
    isShowCancelButton,
    specType,
    rowId,
    boxId,
    fullWidthButton,
    casual,
    onClickCancelTask,
  } = props
  const { classes: styles, cx } = useStyles()

  const buttonStyle = cx(styles.button, { [styles.fullWidthButton]: fullWidthButton })
  const showCancelButton = isShowCancelButton && specType !== TaskOperationType.RECEIVE

  return (
    <div className={styles.wrapper}>
      <Button
        casual={casual}
        disabled={disabled}
        tooltipInfoContent={isFirstRow ? tooltipText : ''}
        variant="contained"
        color="primary"
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
          danger
          tooltipInfoContent={
            isFirstRow ? t(TranslationKey['The task will be canceled, the box will keep its previous state']) : ''
          }
          className={buttonStyle}
          onClick={(e: MouseEvent) => {
            e.stopPropagation()

            if (onClickCancelTask) {
              onClickCancelTask(boxId, rowId, specType)
            }
          }}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      )}
    </div>
  )
})
