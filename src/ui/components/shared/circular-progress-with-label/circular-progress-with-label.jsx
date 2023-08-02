import { cx } from '@emotion/css'
import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { useClassNames } from './circular-progress-with-label.style'

export const CircularProgressWithLabel = ({ value, title, wrapperClassName }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div
      className={cx(classNames.mainWrapper, {
        [wrapperClassName]: !!wrapperClassName,
      })}
    >
      <div className={classNames.progressContainer}>
        {title ? (
          <Typography variant="h4" className={classNames.standartText}>
            {title}
          </Typography>
        ) : null}

        {value ? (
          <div className={classNames.progressWrapper}>
            <CircularProgress variant="determinate" value={value} size={85} />
            {title ? (
              <div className={classNames.subWrapper}>
                <Typography className={classNames.text}>{`${Math.round(value)}%`}</Typography>
              </div>
            ) : null}
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  )
}
