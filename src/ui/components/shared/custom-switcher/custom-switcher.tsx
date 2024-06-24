/* eslint-disable @typescript-eslint/no-explicit-any */
import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { useStyles } from './custom-switcher.style'

import { BulbIcon } from '../svg-icons'

export interface ISwitcherSettings {
  label?: () => string | number
  value: string | number | null | undefined
  icon?: JSX.Element | boolean
}

interface CustomSwitcherProps {
  condition: any
  switcherSettings: ISwitcherSettings[]
  changeConditionHandler: (condition: any) => void
  fullWidth?: boolean
  switchMode?: 'small' | 'default' | 'medium' | 'big' | 'header'
  className?: string
  circle?: boolean
  customCondition?: (value: any) => boolean
}

export const CustomSwitcher: FC<CustomSwitcherProps> = observer(props => {
  const { classes: styles, cx } = useStyles()
  const {
    switchMode = 'default',
    condition,
    switcherSettings,
    fullWidth,
    className,
    circle,
    changeConditionHandler,
    customCondition,
  } = props

  const [switchOptionsToRender, setSwitchOptionsToRender] = useState<ISwitcherSettings[]>(switcherSettings)

  useEffect(() => {
    setSwitchOptionsToRender(switcherSettings)
  }, [switcherSettings])

  return (
    <div
      className={cx(
        styles.switcherWrapper,
        {
          [styles.fullWidthWrapper]: fullWidth,
          [styles.headerStylesSwitcherWrapper]: switchMode === 'header',
          [styles.mediumGapWrapper]: switchMode === 'medium',
        },
        className,
      )}
    >
      {switchOptionsToRender.map((option, optionIndex) => (
        <div
          key={optionIndex}
          className={cx(styles.optionWrapper, {
            [styles.headerOptionWrapper]: switchMode === 'header',
            [styles.mediumOptionWrapper]: switchMode === 'medium' || switchMode === 'big',
            [styles.smallOptionWrapper]: switchMode === 'small',
          })}
        >
          <button
            className={cx(styles.switcherOption, {
              [styles.mediumOptionStyles]: switchMode === 'medium',
              [styles.bigOptionStyles]: switchMode === 'big',
              [styles.smallOptionStyles]: switchMode === 'small',
              [styles.headerOptionStyles]: switchMode === 'header',
              [styles.activeOption]: isEqual(condition, option.value) || customCondition?.(option.value),
              [styles.headerActiveOptionStyles]:
                switchMode === 'header' && (isEqual(condition, option.value) || customCondition?.(option.value)),
              [styles.circleOptionStyles]: circle,
            })}
            onClick={() => {
              if (!isEqual(condition, option.value) || !customCondition?.(option.value)) {
                changeConditionHandler(option.value)
              }
            }}
          >
            {!!option.label && option.label()}

            {!!option?.icon &&
              (typeof option?.icon === 'boolean' ? <BulbIcon className={styles.icon} /> : option?.icon)}
          </button>
        </div>
      ))}
    </div>
  )
})
