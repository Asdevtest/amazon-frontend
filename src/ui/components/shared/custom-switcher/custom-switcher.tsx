import { cx } from '@emotion/css'
import React, { FC, useState } from 'react'

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

  const [switchOptionsToRender] = useState([
    {
      name: nameFirstArg,
      value: firstArgValue,
    },
    {
      name: nameSecondArg,
      value: secondArgValue,
    },
  ])

  return (
    <div className={cx(classNames.switcherWrapper, { [classNames.bigSwitcherWrapper]: bigSwitch })}>
      {switchOptionsToRender.map((option, optionIndex) => {
        return (
          <Button
            key={optionIndex}
            className={cx(classNames.switcherOption, {
              [classNames.activeOption]: condition === option.value,
              [classNames.bigSwitcherOption]: bigSwitch,
            })}
            btnWrapperStyle={classNames.btnWrapperStyle}
            onClick={() => {
              if (condition !== option.value) {
                changeConditionHandler(option.value)
              }
            }}
          >
            {option.name}
          </Button>
        )
      })}
    </div>
  )
}
