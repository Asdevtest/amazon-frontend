import { cx } from '@emotion/css'
import React, { FC, useEffect, useState } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useClassNames } from './custom-switcher.style'

interface ISwitcherSettings {
  label: () => string
  value: string
}

interface CustomSwitcherProps {
  switchMode?: 'small' | 'medium' | 'big'
  switcherSettings: ISwitcherSettings[]
  condition: string
  changeConditionHandler: (condition: string) => void
}

export const CustomSwitcher: FC<CustomSwitcherProps> = props => {
  const { classes: classNames } = useClassNames()

  const { switchMode = 'small', condition, switcherSettings, changeConditionHandler } = props

  const [switchOptionsToRender, setSwitchOptionsToRender] = useState<ISwitcherSettings[]>(switcherSettings)

  const findCurrentOption = switchOptionsToRender.findIndex(option => option.value === condition)

  useEffect(() => {
    setSwitchOptionsToRender(switcherSettings)
  }, [switcherSettings])

  return (
    <div
      className={cx(classNames.switcherWrapper, {
        [classNames.mediumStylesSwitcherWrapper]: switchMode === 'medium' || switchMode === 'big',
      })}
    >
      <div className={classNames.innerContainer}>
        {switchOptionsToRender.map((option, optionIndex) => {
          return (
            <Button
              key={optionIndex}
              className={cx(classNames.switcherOption, {
                [classNames.mediumOptionStyles]: switchMode === 'medium',
                [classNames.bigOptionStyles]: switchMode === 'big',
                [classNames.activeOption]: condition === option.value,
              })}
              btnWrapperStyle={classNames.btnWrapperStyle}
              onClick={() => {
                if (condition !== option.value) {
                  changeConditionHandler(option.value)
                }
              }}
            >
              {option.label()}
            </Button>
          )
        })}
        <span
          style={{
            width: `calc(100% / ${switchOptionsToRender?.length})`,
            left: `calc((100% / ${switchOptionsToRender?.length}) * ${findCurrentOption > 0 ? findCurrentOption : 0})`,
          }}
          className={classNames.indicator}
        />
      </div>
    </div>
  )
}
