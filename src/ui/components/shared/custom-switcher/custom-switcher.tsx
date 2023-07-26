import { cx } from '@emotion/css'
import React, { FC } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useClassNames } from './custom-switcher.style'

interface CustomSwitcherProps {
  bigSwitch?: boolean
  condition: string
  nameFirstArg: string
  nameSecondArg: string
  firstArgValue: string
  secondArgValue: string
  changeConditionHandler: (condition: string) => void
}

export const CustomSwitcher: FC<CustomSwitcherProps> = props => {
  const { classes: classNames } = useClassNames()

  const { bigSwitch, condition, nameFirstArg, nameSecondArg, firstArgValue, secondArgValue, changeConditionHandler } =
    props

  return (
    <div className={cx(classNames.switcherWrapper, { [classNames.bigSwitcherWrapper]: bigSwitch })}>
      <Button
        className={cx(classNames.switcherOption, {
          [classNames.activeOption]: condition === firstArgValue,
          [classNames.bigSwitcherOption]: bigSwitch,
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
          [classNames.bigSwitcherOption]: bigSwitch,
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
