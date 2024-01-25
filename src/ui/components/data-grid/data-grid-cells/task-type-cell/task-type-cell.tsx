import { FC, memo } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './task-type-cell.style'

interface TaskTypeCellProps {
  specType: string
}

export const TaskTypeCell: FC<TaskTypeCellProps> = memo(({ specType }) => {
  const { classes: styles } = useStyles()
  const renderTaskDescription = (type: string) => {
    switch (type) {
      case TaskOperationType.MERGE:
        return t(TranslationKey.Merge)
      case TaskOperationType.SPLIT:
        return t(TranslationKey.Split)
      case TaskOperationType.RECEIVE:
        return t(TranslationKey.Receive)
      case TaskOperationType.EDIT:
        return t(TranslationKey.Edit)
      case TaskOperationType.EDIT_BY_STOREKEEPER:
        return t(TranslationKey['Storekeeper edit'])
    }
  }

  return (
    <div className={styles.taskDescriptionScrollWrapper}>
      <p className={styles.operationTypeText}>{renderTaskDescription(specType)}</p>
    </div>
  )
})
