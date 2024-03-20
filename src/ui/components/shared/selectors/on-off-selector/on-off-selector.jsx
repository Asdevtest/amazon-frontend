import { Typography } from '@mui/material'

import { useStyles } from './on-off-selector.style'

export const OnOffSelector = ({ value, onClick }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.mainWrapper}>
      <Typography className={cx(styles.option, { [styles.offSelected]: !value })} onClick={value && onClick}>
        {'Off'}
      </Typography>

      <Typography className={cx(styles.option, { [styles.onSelected]: value })} onClick={!value && onClick}>
        {'On'}
      </Typography>
    </div>
  )
}
