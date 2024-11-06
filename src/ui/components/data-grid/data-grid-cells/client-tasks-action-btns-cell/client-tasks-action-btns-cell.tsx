/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TaskOperationType, mapTaskOperationTypeKeyToEnum } from '@constants/task/task-operation-type'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

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
    <CustomButton block type="primary" size="small" onClick={() => handlers.onClickTaskInfo(row)}>
      {t(TranslationKey.Details)}
    </CustomButton>
  )

  const renderHistoryItem = () => {
    // @ts-ignore
    switch (mapTaskOperationTypeKeyToEnum[row.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <CustomButton
                block
                danger
                type="primary"
                size="small"
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]?._id, row._id, 'merge')}
              >
                {t(TranslationKey.Cancel)}
              </CustomButton>
            )}
          </>
        )
      case TaskOperationType.SPLIT:
        return (
          <>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <CustomButton
                block
                danger
                type="primary"
                size="small"
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]?._id, row._id, 'split')}
              >
                {t(TranslationKey.Cancel)}
              </CustomButton>
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
              <CustomButton
                block
                danger
                type="primary"
                size="small"
                onClick={() =>
                  handlers.onClickCancelBtn(row.boxes?.at(0)?._id || row.boxesBefore?.at(0)?._id, row._id, 'edit')
                }
              >
                {t(TranslationKey.Cancel)}
              </CustomButton>
            )}
          </>
        )
    }
  }

  return <div className={styles.root}>{renderHistoryItem()}</div>
})
