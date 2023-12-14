import { cx } from '@emotion/css'

import { Typography } from '@mui/material'

import { useClassNames } from './on-off-selector.style'

export const OnOffSelector = ({ value, onClick }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Typography className={cx(classNames.option, { [classNames.offSelected]: !value })} onClick={value && onClick}>
        {'Off'}
      </Typography>

      <Typography className={cx(classNames.option, { [classNames.onSelected]: value })} onClick={!value && onClick}>
        {'On'}
      </Typography>
    </div>
  )
}
