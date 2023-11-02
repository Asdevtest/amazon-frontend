import { FC, memo } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'

import { CustomSwitcher } from '@components/shared/custom-switcher'

interface FreelanceTypeTaskSelectProps {
  selectedTaskType: number
  onClickTaskType: (value: number) => void
}

export const FreelanceTypeTaskSelect: FC<FreelanceTypeTaskSelectProps> = memo(
  ({ selectedTaskType, onClickTaskType }) => {
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
  },
)
