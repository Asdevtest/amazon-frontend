import { Dispatch, SetStateAction, useMemo } from 'react'

import { CustomRadioButton } from '../custom-radio-button'

import { sizeSwitcherSettings } from './size-switcher.config'

interface SizeSwitcherProps<T> {
  condition: T
  onChangeCondition: VoidFunction | Dispatch<SetStateAction<T>>
}

export const SizeSwitcher = <T,>({ condition, onChangeCondition }: SizeSwitcherProps<T>) => {
  const memoizedOnChangeCondition = useMemo(
    () => (value: T) => {
      onChangeCondition(value)
    },
    [onChangeCondition],
  )

  return (
    <CustomRadioButton
      size="small"
      options={sizeSwitcherSettings}
      value={condition}
      onChange={e => memoizedOnChangeCondition(e?.target?.value)}
    />
  )
}
