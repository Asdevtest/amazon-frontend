import { CheckboxOptionType, Radio, RadioGroupProps } from 'antd'
import { FC, memo, useEffect, useRef } from 'react'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'
import { ScrollType } from '@typings/types/scroll'

import { useStyles } from './custom-radio.style'

interface CustomRadioProps extends RadioGroupProps, IDefaultPropsExtensionAntdComponent {
  options: CheckboxOptionType[]
  onScroll?: ScrollType
}

export const CustomRadio: FC<CustomRadioProps> = memo(props => {
  const { options, wrapperClassName, isRow, onScroll, ...restProps } = props

  const { classes: styles, cx } = useStyles()
  const radioGroupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = radioGroupRef.current
    if (element && onScroll) {
      element.addEventListener('scroll', onScroll as any)

      return () => {
        element.removeEventListener('scroll', onScroll as any)
      }
    }
  }, [onScroll])

  return (
    <Radio.Group
      ref={radioGroupRef}
      {...restProps}
      className={cx(styles.root, { [styles.row]: isRow }, wrapperClassName)}
    >
      {options.map((option, index) => (
        <Radio key={index} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  )
})
