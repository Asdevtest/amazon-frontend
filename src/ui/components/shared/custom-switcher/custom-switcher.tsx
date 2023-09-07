import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { FC, useEffect, useRef, useState } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useClassNames } from './custom-switcher.style'

interface ISwitcherSettings {
  label: () => string
  value: string
}

interface CustomSwitcherProps {
  switchMode?: 'small' | 'medium' | 'big' | 'header'
  switcherSettings: ISwitcherSettings[]
  condition: string
  changeConditionHandler: (condition: string | number) => void
}

export const CustomSwitcher: FC<CustomSwitcherProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const activeOptionRef = useRef<HTMLDivElement | null>(null)

  const { switchMode = 'small', condition, switcherSettings, changeConditionHandler } = props
  const [switchOptionsToRender, setSwitchOptionsToRender] = useState<ISwitcherSettings[]>(switcherSettings)
  const [indicatorPosition, setIndicatorPosition] = useState<{ left: number; top: number } | undefined>({
    left: 0,
    top: 0,
  })

  const getElementCoordinates = () => {
    const container = containerRef.current
    const element = activeOptionRef.current
    if (container && element) {
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const elementCoordinates = {
        left: elementRect.left - containerRect.left,
        top: elementRect.top - containerRect.top,
      }

      return elementCoordinates
    }
    return undefined
  }

  const handleResize = () => setIndicatorPosition(getElementCoordinates())

  useEffect(() => {
    const container = containerRef.current
    const resizeObserver = new ResizeObserver(handleResize)

    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    setSwitchOptionsToRender(switcherSettings)
    setIndicatorPosition(getElementCoordinates())
  }, [switcherSettings])

  return (
    <div
      className={cx(classNames.switcherWrapper, {
        [classNames.headerStylesSwitcherWrapper]: switchMode === 'header',
      })}
    >
      <div
        ref={containerRef}
        className={cx(classNames.innerContainer, { [classNames.smallInnerContainer]: switchMode === 'small' })}
      >
        {switchOptionsToRender.map((option, optionIndex) => {
          return (
            <div
              ref={condition === option.value ? activeOptionRef : null}
              key={optionIndex}
              className={cx(classNames.optionWrapper, {
                [classNames.headerOptionWrapper]: switchMode === 'header',
                [classNames.mediumOptionWrapper]: switchMode === 'medium' || switchMode === 'big',
              })}
            >
              <Button
                className={cx(classNames.switcherOption, {
                  [classNames.mediumOptionStyles]: switchMode === 'medium',
                  [classNames.bigOptionStyles]: switchMode === 'big',
                  [classNames.headerActiveOptionStyles]: switchMode === 'header' && condition === option.value,
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
            </div>
          )
        })}
        <span
          style={{
            width: `${activeOptionRef?.current?.offsetWidth}px`,
            height: `${activeOptionRef?.current?.offsetHeight}px`,
            left: `${(indicatorPosition?.left || 0) > 0 ? indicatorPosition?.left : 0}px`,
            top: `${(indicatorPosition?.top || 0) > 0 ? indicatorPosition?.top : 0}px`,
          }}
          className={cx(classNames.indicator, {
            [classNames.headerIndicatorStyles]: switchMode === 'header',
          })}
        />
      </div>
    </div>
  )
})
