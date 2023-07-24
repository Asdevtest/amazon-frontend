import { cx } from '@emotion/css'
import React, { FC } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useClassNames } from './custom-switcher.style'

interface CustomSwitcherProps {
  condition: string
  nameFirstArg: string
  nameSecondArg: string
  firstArgValue: string
  secondArgValue: string
  changeConditionHandler: (condition: string) => void
}

export const CustomSwitcher: FC<CustomSwitcherProps> = props => {
  const { classes: classNames } = useClassNames()

  const { condition, nameFirstArg, nameSecondArg, firstArgValue, secondArgValue, changeConditionHandler } = props

  return (
    <div className={classNames.switcherWrapper}>
      <Button
        className={cx(classNames.switcherOption, {
          [classNames.activeOption]: condition === firstArgValue,
        })}
        onClick={() => {
          if (condition !== firstArgValue) {
            changeConditionHandler(firstArgValue)
          }
        }}
      >
        {nameFirstArg}
      </Button>
      <Button
        className={cx(classNames.switcherOption, {
          [classNames.activeOption]: condition === secondArgValue,
        })}
        onClick={() => {
          if (condition !== secondArgValue) {
            changeConditionHandler(secondArgValue)
          }
        }}
      >
        {nameSecondArg}
      </Button>
    </div>
  )
}
