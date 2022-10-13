import {cx} from '@emotion/css'

import React, {FC} from 'react'

import {useClassNames} from './label-value-pair-block.style'

interface Props {
  bgColor?: 'white' | 'green'
  label: string
  value: string | undefined | React.ReactNode
}

export const LabelValuePairBlock: FC<Props> = ({bgColor, label, value}) => {
  const {classes: classNames} = useClassNames()
  return (
    <div className={cx(classNames.root, {[classNames.rootGreen]: bgColor === 'green'})}>
      <div className={classNames.labelWrapper}>
        <p className={classNames.labelText}>{label}</p>
      </div>
      <div className={classNames.valueWrapper}>
        <p className={classNames.valueText}>{value}</p>
      </div>
    </div>
  )
}
