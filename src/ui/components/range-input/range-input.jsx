import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {Input} from '@components/input'

import {useClassNames} from './range-input.style'

export const RangeInput = ({start, onChangeRangeStart, end, onChangeRangeEnd, className}) => {
  const classNames = useClassNames()

  const isStartBiggerOfEnd = end < start

  const renderField = (label, value, onChange, alert) => (
    <div className={classNames.field}>
      <Typography className={classNames.label}>{label}</Typography>
      <Input className={clsx(classNames.input, {[classNames.alarm]: alert})} value={value} onChange={onChange} />
    </div>
  )

  return (
    <div className={clsx(classNames.root, className)}>
      {renderField('From', start, onChangeRangeStart)}
      {renderField('To', end, onChangeRangeEnd, isStartBiggerOfEnd)}
    </div>
  )
}
