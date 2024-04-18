import { Dispatch, SetStateAction, useMemo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'

import { sizeSwitcherSettings } from './size-switcher.config'

interface SizeSwitcherProps<T> {
  sizeSetting: T
  onChangeCondition: VoidFunction | Dispatch<SetStateAction<T>>
}

export const SizeSwitcher = <T,>({ sizeSetting, onChangeCondition }: SizeSwitcherProps<T>) => {
  const memoizedOnChangeCondition = useMemo(
    () => (value: T) => {
      onChangeCondition(value)
    },
    [onChangeCondition],
  )

  return (
    <CustomSwitcher
      switchMode="small"
      condition={sizeSetting}
      switcherSettings={sizeSwitcherSettings}
      changeConditionHandler={memoizedOnChangeCondition}
    />
  )
}
