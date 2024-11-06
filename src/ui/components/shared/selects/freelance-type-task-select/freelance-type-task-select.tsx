import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { Specs } from '@typings/enums/specs'
import { ISpec } from '@typings/shared/spec'

interface FreelanceTypeTaskSelectProps {
  specs: ISpec[]
  selectedSpec: number
  onChangeSpec: (value: Specs) => void
}

export const FreelanceTypeTaskSelect: FC<FreelanceTypeTaskSelectProps> = ({ selectedSpec, specs, onChangeSpec }) => {
  const options = [
    {
      label: t(TranslationKey.All),
      value: Specs.DEFAULT,
    },
    ...(specs || []).map(spec => ({
      label: spec?.title,
      value: spec?.type,
    })),
  ]

  return <CustomSelect size="large" options={options} value={selectedSpec} onChange={onChangeSpec} />
}
