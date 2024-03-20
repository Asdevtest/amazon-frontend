import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSwitcher } from '@components/shared/custom-switcher'

import { t } from '@utils/translations'

import { Specs } from '@typings/enums/specs'
import { ISpec } from '@typings/shared/spec'

interface FreelanceTypeTaskSelectProps {
  selectedSpec: number
  specs: ISpec[]
  onClickSpec: (value: number) => void
}

export const FreelanceTypeTaskSelect: FC<FreelanceTypeTaskSelectProps> = memo(
  ({ selectedSpec, specs, onClickSpec }) => {
    const customSwitcherSettings = [
      {
        label: () => t(TranslationKey.All) || '',
        value: Specs.DEFAULT,
      },
      ...(specs || []).map(spec => ({
        label: () => spec?.title || '',
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
