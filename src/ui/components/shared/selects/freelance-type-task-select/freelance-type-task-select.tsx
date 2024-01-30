import { FC, memo } from 'react'

import { freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'

import { CustomSwitcher } from '@components/shared/custom-switcher'

import { Specs } from '@typings/enums/specs'
import { ISpec } from '@typings/spec'

interface FreelanceTypeTaskSelectProps {
  selectedSpec: number
  specs: ISpec[]
  onClickSpec: (value: number) => void
}

export const FreelanceTypeTaskSelect: FC<FreelanceTypeTaskSelectProps> = memo(
  ({ selectedSpec, specs, onClickSpec }) => {
    const customSwitcherSettings = [
      {
        label: () => freelanceRequestTypeTranslate(Specs[Specs.DEFAULT], true) || '',
        value: Specs.DEFAULT,
      },
      ...(specs || []).map(spec => ({
        label: () => freelanceRequestTypeTranslate(spec?.title) || '',
        value: spec?.type,
      })),
    ]

    return (
      <CustomSwitcher
        switchMode="medium"
        condition={selectedSpec}
        switcherSettings={customSwitcherSettings}
        changeConditionHandler={value => onClickSpec(value as number)} // bugs with  CustomSwitcher types
      />
    )
  },
)
