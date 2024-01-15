import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { useClassNames } from './custom-switcher.style'

import { BulbIcon } from '../svg-icons'

export interface ISwitcherSettings {
  label?: () => string | number
  value: string | number | null | undefined
  icon?: JSX.Element | boolean
}

interface CustomSwitcherProps {
  fullWidth?: boolean
  switchMode?: 'small' | 'default' | 'medium' | 'big' | 'header'
  switcherSettings: ISwitcherSettings[]
  condition: string | number | null | undefined
  customCondition?: (vale: string | number | null | undefined | Object) => boolean
  changeConditionHandler: (condition: string | number | null | undefined) => void
}

export const CustomSwitcher: FC<CustomSwitcherProps> = observer(props => {
  const { classes: classNames, cx } = useClassNames()
  const {
    switchMode = 'default',
    condition,
    switcherSettings,
    fullWidth,
    changeConditionHandler,
    customCondition,
  } = props

  const [switchOptionsToRender, setSwitchOptionsToRender] = useState<ISwitcherSettings[]>(switcherSettings)

  useEffect(() => {
    setSwitchOptionsToRender(switcherSettings)
  }, [switcherSettings])

  return (
    <div
      className={cx(classNames.switcherWrapper, {
        [classNames.fullWidthWrapper]: fullWidth,
        [classNames.headerStylesSwitcherWrapper]: switchMode === 'header',
        [classNames.mediumGapWrapper]: switchMode === 'medium',
      })}
    >
      {switchOptionsToRender.map((option, optionIndex) => (
        <div
          key={optionIndex}
          className={cx(classNames.optionWrapper, {
            [classNames.headerOptionWrapper]: switchMode === 'header',
            [classNames.mediumOptionWrapper]: switchMode === 'medium' || switchMode === 'big',
            [classNames.smallOptionWrapper]: switchMode === 'small',
          })}
        >
          <button
            className={cx(classNames.switcherOption, {
              [classNames.mediumOptionStyles]: switchMode === 'medium',
              [classNames.bigOptionStyles]: switchMode === 'big',
              [classNames.smallOptionStyles]: switchMode === 'small',
              [classNames.headerOptionStyles]: switchMode === 'header',
              [classNames.activeOption]: condition === option.value || customCondition?.(option.value),
              [classNames.headerActiveOptionStyles]:
                switchMode === 'header' && (condition === option.value || customCondition?.(option.value)),
            })}
            onClick={() => {
              if (condition !== option.value || !customCondition?.(option.value)) {
                changeConditionHandler(option.value)
              }
            }}
          >
            {!!option.label && option.label()}

            {!!option?.icon &&
              (typeof option?.icon === 'boolean' ? <BulbIcon className={classNames.icon} /> : option?.icon)}
          </button>
        </div>
      ))}
    </div>
  )
})
