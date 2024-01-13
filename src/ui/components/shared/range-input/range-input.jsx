import { Typography } from '@mui/material'

import { Input } from '@components/shared/input'

import { useStyles } from './range-input.style'

export const RangeInput = ({ start, onChangeRangeStart, end, onChangeRangeEnd, className }) => {
  const { classes: styles, cx } = useStyles()

  const isStartBiggerOfEnd = end < start

  const renderField = (label, value, onChange, alert) => (
    <div className={styles.field}>
      <Typography className={styles.label}>{label}</Typography>
      <Input className={cx(styles.input, { [styles.alarm]: alert })} value={value} onChange={onChange} />
    </div>
  )

  return (
    <div className={cx(styles.root, className)}>
      {renderField('From', start, onChangeRangeStart)}
      {renderField('To', end, onChangeRangeEnd, isStartBiggerOfEnd)}
    </div>
  )
}
