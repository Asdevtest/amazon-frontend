import { FC, memo } from 'react'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

interface TaskTypeCellProps {
  operationType: string
}

export const TaskTypeCell: FC<TaskTypeCellProps> = memo(({ operationType }) => {
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
      default:
        return t(TranslationKey.Missing)
    }
  }

  return <Text isCell text={renderTaskDescription(operationType)} />
})
