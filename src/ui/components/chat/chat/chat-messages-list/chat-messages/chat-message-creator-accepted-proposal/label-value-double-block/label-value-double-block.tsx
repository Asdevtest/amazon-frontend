import { cx } from '@emotion/css'

import React, { FC } from 'react'

import { useClassNames } from './label-value-double-block.style'

export interface LabelValuePair {
  label: string
  value: string
}

interface Props {
  bgColor: 'white' | 'green'
  labelValueDouble: [LabelValuePair, LabelValuePair]
}

export const LabelValueDoubleBlock: FC<Props> = ({ labelValueDouble, bgColor }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div className={cx(classNames.root, { [classNames.rootGreen]: bgColor === 'green' })}>
      <div className={classNames.row}>
        <div className={classNames.labelWrapper}>
          <p className={classNames.labelText}>{labelValueDouble[0].label}</p>
        </div>
        <div className={classNames.valueWrapper}>
          <p className={classNames.valueText}>{labelValueDouble[0].value}</p>
        </div>
      </div>
      <div className={cx(classNames.row, classNames.rowNotFirst)}>
        <div className={classNames.labelWrapper}>
          <p className={classNames.labelText}>{labelValueDouble[0].label}</p>
        </div>
        <div className={classNames.valueWrapper}>
          <p className={classNames.valueText}>{labelValueDouble[0].value}</p>
        </div>
      </div>
    </div>
  )
}
