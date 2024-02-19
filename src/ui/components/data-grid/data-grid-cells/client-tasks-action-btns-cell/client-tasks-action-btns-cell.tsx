/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TaskOperationType, mapTaskOperationTypeKeyToEnum } from '@constants/task/task-operation-type'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './client-tasks-action-btns-cell.style'

interface ClientTasksActionBtnsCellProps {
  row: any
  handlers: {
    onClickTaskInfo: (row: any) => void
    onClickCancelBtn: (boxId: string, taskId: string, operationType: string) => void
  }
}

export const ClientTasksActionBtnsCell: FC<ClientTasksActionBtnsCellProps> = memo(({ row, handlers }) => {
  const { classes: styles } = useStyles()

  const checkIfTaskCouldBeCanceled = (status: string) => {
    // @ts-ignore
    if (status === mapTaskStatusEmumToKey[TaskStatus.NEW]) {
      return true
    }
    return false
  }

  const renderTaskInfoBtn = () => (
    <Button className={styles.infoBtn} onClick={() => handlers.onClickTaskInfo(row)}>
      {t(TranslationKey.Details)}
    </Button>
  )

  const renderHistoryItem = () => {
    // @ts-ignore
    switch (mapTaskOperationTypeKeyToEnum[row.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <Button
                styleType={ButtonType.DANGER}
                className={styles.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]?._id, row._id, 'merge')}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            )}
          </>
        )
      case TaskOperationType.SPLIT:
        return (
          <>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <Button
                styleType={ButtonType.DANGER}
                className={styles.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]?._id, row._id, 'split')}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            )}
          </>
        )
      case TaskOperationType.RECEIVE:
        return <>{renderTaskInfoBtn()}</>
      case TaskOperationType.EDIT_BY_STOREKEEPER:
      case TaskOperationType.EDIT:
        return (
          <>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <Button
                styleType={ButtonType.DANGER}
                className={styles.cancelTaskBtn}
                onClick={() => {
                  handlers.onClickCancelBtn(row.boxes?.at(0)?._id || row.boxesBefore?.at(0)?._id, row._id, 'edit')
                }}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            )}
          </>
        )
    }
  }

  return <div className={styles.clientTasksActionBtnsWrapper}>{renderHistoryItem()}</div>
})
