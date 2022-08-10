import React, {FC} from 'react'

import clsx from 'clsx'

import {useClassNames} from './label-value-pair-block.style'

interface Props {
  bgColor?: 'white' | 'green'
  label: string
  value: string | undefined | React.ReactNode
}

export const LabelValuePairBlock: FC<Props> = ({bgColor, label, value}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.root, {[classNames.rootGreen]: bgColor === 'green'})}>
      <div className={classNames.labelWrapper}>
        <p className={classNames.labelText}>{label}</p>
      </div>
      <div className={classNames.valueWrapper}>
        <p className={classNames.valueText}>{value}</p>
      </div>
    </div>
  )
}
