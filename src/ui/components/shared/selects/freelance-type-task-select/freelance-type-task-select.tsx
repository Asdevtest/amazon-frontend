import { RadioChangeEvent } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

import { Specs } from '@typings/enums/specs'
import { ISpec } from '@typings/shared/spec'

interface FreelanceTypeTaskSelectProps {
  specs: ISpec[]
  selectedSpec: number
  onClickSpec: (e: RadioChangeEvent) => void
}

export const FreelanceTypeTaskSelect: FC<FreelanceTypeTaskSelectProps> = memo(
  ({ selectedSpec, specs, onClickSpec }) => {
    const radioButtonOptions = [
      {
        label: t(TranslationKey.All),
        value: Specs.DEFAULT,
      },
      ...(specs || []).map(spec => ({
        label: spec?.title,
        value: spec?.type,
      })),
    ]

    return (
      <CustomRadioButton
        size="large"
        buttonStyle="solid"
        options={radioButtonOptions}
        defaultValue={selectedSpec}
        onChange={onClickSpec}
      />
    )
  },
)
