/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'

import { CustomSwitcher } from '@components/shared/custom-switcher'

import { useClassNames } from './freelance-type-task-select.styles'

interface FreelanceTypeTaskSelectProps {
  selectedTaskType: number
  onClickTaskType: (value: number) => void
}

export const FreelanceTypeTaskSelect: FC<FreelanceTypeTaskSelectProps> = props => {
  const { selectedTaskType, onClickTaskType } = props
  const { classes: classNames } = useClassNames()

  return (
    <CustomSwitcher
      switchMode={'medium'}
      condition={selectedTaskType}
      switcherSettings={[
        ...Object.keys(freelanceRequestTypeByCode).map(taskType => ({
          label: () => freelanceRequestTypeTranslate(freelanceRequestTypeByCode[Number(taskType)], true) || '',
          value: Number(taskType),
        })),
      ]}
      changeConditionHandler={value => {
        if (typeof value === 'number') {
          onClickTaskType(value)
        }
      }}
    />
  )
}
