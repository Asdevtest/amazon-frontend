import React, {FC} from 'react'

import clsx from 'clsx'

import {useClassNames} from './label-value-double-block.style'

export interface LabelValuePair {
  label: string
  value: string
}

interface Props {
  bgColor: 'white' | 'green'
  labelValueDouble: [LabelValuePair, LabelValuePair]
}

export const LabelValueDoubleBlock: FC<Props> = ({labelValueDouble, bgColor}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.root, {[classNames.rootGreen]: bgColor === 'green'})}>
      <div className={classNames.row}>
        <div className={classNames.labelWrapper}>
          <p className={classNames.labelText}>{labelValueDouble[0].label}</p>
        </div>
        <div className={classNames.valueWrapper}>
          <p className={classNames.valueText}>{labelValueDouble[0].value}</p>
        </div>
      </div>
      <div className={clsx(classNames.row, classNames.rowNotFirst)}>
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
