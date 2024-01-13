import { memo } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { useStyles } from './circular-progress-with-label.style'

export const CircularProgressWithLabel = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { value, title, wrapperClassName, showBackground = false } = props

  return (
    <div
      className={cx(styles.mainWrapper, {
        [wrapperClassName]: !!wrapperClassName,
        [styles.background]: showBackground,
      })}
    >
      <div className={styles.progressContainer}>
        {title ? (
          <Typography variant="h4" className={styles.standartText}>
            {title}
          </Typography>
        ) : null}

        {value ? (
          <div className={styles.progressWrapper}>
            <CircularProgress variant="determinate" value={value} size={85} />
            {title ? (
              <div className={styles.subWrapper}>
                <Typography className={styles.text}>{`${Math.round(value)}%`}</Typography>
              </div>
            ) : null}
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  )
})
