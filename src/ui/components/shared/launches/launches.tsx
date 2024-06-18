import { FC, memo } from 'react'

import { ILaunch } from '@typings/shared/launch'

import { getLaunchStyle } from './helpers/get-launch-style'
import { useStyles } from './launches.style'

import { getLaunchName } from './helpers/get-launch-name'
import { getLaunchValue } from './helpers/get-launch-value'

interface LaunchesProps {
  launches: ILaunch[]
  isCell?: boolean
}

export const Launches: FC<LaunchesProps> = memo(props => {
  const { launches, isCell } = props

  const { classes: styles, theme, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.cell]: isCell })}>
      {launches.map((launch, index) => (
        <p key={index} style={getLaunchStyle(launch.type, theme)} className={styles.text}>
          {`${getLaunchName(launch.type, true)} ${getLaunchValue(launch.value)}`}
        </p>
      ))}
    </div>
  )
})
