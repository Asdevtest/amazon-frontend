import { RadioChangeEvent } from 'antd'
import { FC } from 'react'

import {
  TaskOperationType,
  mapTaskOperationTypeKeyToEnum,
  taskOperationTypeTranslate,
} from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

interface BuyerTypeTaskSelectProps {
  curTaskType: string | null
  onClickOperationTypeBtn: (value: RadioChangeEvent) => void
}

export const BuyerTypeTaskSelect: FC<BuyerTypeTaskSelectProps> = props => {
  const { curTaskType, onClickOperationTypeBtn } = props

  return (
    <CustomRadioButton
      size="large"
      options={[
        { label: t(TranslationKey['All tasks']), value: null },

        ...Object.keys(mapTaskOperationTypeKeyToEnum)
          .filter(el => el !== TaskOperationType.EDIT_BY_STOREKEEPER)
          .map(type => ({ label: taskOperationTypeTranslate(type) || '', value: type })),
      ]}
      defaultValue={curTaskType}
      onChange={onClickOperationTypeBtn}
    />
  )
}
