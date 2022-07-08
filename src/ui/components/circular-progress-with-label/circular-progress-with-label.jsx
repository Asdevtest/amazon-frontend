import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import {useClassNames} from './circular-progress-with-label.style'

export const CircularProgressWithLabel = ({value, title}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.progressContainer}>
        {title ? <Typography variant="h4">{title}</Typography> : null}

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
