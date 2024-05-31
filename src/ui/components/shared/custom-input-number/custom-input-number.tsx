import type { InputNumberProps } from 'antd'
import { InputNumber } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './custom-input-number.style'

interface CustomInputNumberProps extends InputNumberProps {
  row?: boolean
  cell?: boolean
  label?: string
  placeholder?: string
  className?: string
  labelClassName?: string
  wrapperClassName?: string
}

export const CustomInputNumber: FC<CustomInputNumberProps> = memo(props => {
  const { row, cell, label, placeholder, className, labelClassName, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: cell, [styles.row]: row }, wrapperClassName)}>
      {label && <p className={cx(styles.label, labelClassName)}>{t(TranslationKey[label as TranslationKey])}</p>}
      <InputNumber
        {...restProps}
        min={0}
        decimalSeparator=","
        controls={false}
        className={cx(styles.input, className)}
        placeholder={placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined}
      />
    </div>
  )
})
