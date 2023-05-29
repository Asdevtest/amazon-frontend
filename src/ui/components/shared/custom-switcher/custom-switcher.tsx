import React, { FC } from 'react'

import { useClassNames } from './custom-switcher.style'
import { Button } from '@components/shared/buttons/button'
import { cx } from '@emotion/css'
import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'

interface CustomSwitcherProps {
  condition: string
  changeConditionHandler: (condition: string) => void
}

export const CustomSwitcher: FC<CustomSwitcherProps> = props => {
  const { classes: classNames } = useClassNames()

  const { condition = unitsOfChangeOptions.EU, changeConditionHandler } = props

  return (
    <div className={classNames.switcherWrapper}>
      <Button
        className={cx(classNames.switcherOption, { [classNames.activeOption]: condition === unitsOfChangeOptions.EU })}
        onClick={() => {
          if (condition !== unitsOfChangeOptions.EU) {
            changeConditionHandler(unitsOfChangeOptions.EU)
          }
        }}
      >
        {'EU'}
      </Button>
      <Button
        className={cx(classNames.switcherOption, { [classNames.activeOption]: condition === unitsOfChangeOptions.US })}
        onClick={() => {
          if (condition !== unitsOfChangeOptions.US) {
            changeConditionHandler(unitsOfChangeOptions.US)
          }
        }}
      >
        {'US'}
      </Button>
    </div>
  )
}
