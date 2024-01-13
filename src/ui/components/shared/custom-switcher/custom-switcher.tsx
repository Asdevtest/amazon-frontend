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
  fullWidth?: boolean
  switchMode?: 'small' | 'medium' | 'big' | 'header'
  switcherSettings: ISwitcherSettings[]
  condition: string | number | null | undefined
  customCondition?: (vale: string | number | null | undefined | Object) => boolean
  changeConditionHandler: (condition: string | number | null | undefined) => void
}

export const CustomSwitcher: FC<CustomSwitcherProps> = observer(props => {
  const { classes: styles, cx } = useStyles()
  const {
    switchMode = 'small',
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
      className={cx(styles.switcherWrapper, {
        [styles.fullWidthWrapper]: fullWidth,
        [styles.headerStylesSwitcherWrapper]: switchMode === 'header',
        [styles.mediumGapWrapper]: switchMode === 'medium',
      })}
    >
      {switchOptionsToRender.map((option, optionIndex) => (
        <div
          key={optionIndex}
          className={cx(styles.optionWrapper, {
            [styles.headerOptionWrapper]: switchMode === 'header',
            [styles.mediumOptionWrapper]: switchMode === 'medium' || switchMode === 'big',
          })}
        >
          <button
            className={cx(styles.switcherOption, {
              [styles.mediumOptionStyles]: switchMode === 'medium',
              [styles.bigOptionStyles]: switchMode === 'big',
              [styles.headerOptionStyles]: switchMode === 'header',
              [styles.activeOption]: condition === option.value || customCondition?.(option.value),
              [styles.headerActiveOptionStyles]:
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
              (typeof option?.icon === 'boolean' ? <BulbIcon className={styles.icon} /> : option?.icon)}
          </button>
        </div>
      ))}
    </div>
  )
})
