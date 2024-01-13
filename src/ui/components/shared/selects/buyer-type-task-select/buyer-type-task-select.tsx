/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'

import {
  TaskOperationType,
  mapTaskOperationTypeKeyToEnum,
  taskOperationTypeTranslate,
} from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSwitcher } from '@components/shared/custom-switcher'

import { t } from '@utils/translations'

import { useStyles } from './buyer-type-task-select.style'

interface BuyerTypeTaskSelectProps {
  curTaskType: string | null
  onClickOperationTypeBtn: (value: string | null) => void
}

export const BuyerTypeTaskSelect: FC<BuyerTypeTaskSelectProps> = props => {
  const { curTaskType, onClickOperationTypeBtn } = props
  const { classes: styles } = useStyles()

  return (
    <CustomSwitcher
      switchMode={'medium'}
      condition={curTaskType}
      switcherSettings={[
        { label: () => t(TranslationKey['All tasks']), value: null },

        ...Object.keys(mapTaskOperationTypeKeyToEnum)
          .filter(el => el !== TaskOperationType.EDIT_BY_STOREKEEPER)
          .map(type => ({ label: () => taskOperationTypeTranslate(type) || '', value: type })),
      ]}
      changeConditionHandler={value => {
        if (typeof value === 'string' || value === null) {
          onClickOperationTypeBtn(value)
        }
      }}
    />
  )
}
