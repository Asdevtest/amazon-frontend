import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import { Input } from '@components/shared/input'

import { useClassNames } from './range-input.style'

export const RangeInput = ({ start, onChangeRangeStart, end, onChangeRangeEnd, className }) => {
  const { classes: classNames } = useClassNames()

  const isStartBiggerOfEnd = end < start

  const renderField = (label, value, onChange, alert) => (
    <div className={classNames.field}>
      <Typography className={classNames.label}>{label}</Typography>
      <Input className={cx(classNames.input, { [classNames.alarm]: alert })} value={value} onChange={onChange} />
    </div>
  )

  return (
    <div className={cx(classNames.root, className)}>
      {renderField('From', start, onChangeRangeStart)}
      {renderField('To', end, onChangeRangeEnd, isStartBiggerOfEnd)}
    </div>
  )
}
