import { FC, memo } from 'react'

import { ILaunch } from '@typings/shared/launch'

import { getLaunchStyle } from './helpers/get-launch-style'
import { useStyles } from './launches.style'

import { getLaunchName } from './helpers/get-launch-name'

interface LaunchesProps {
  launches: ILaunch[]
  cell?: boolean
}

export const Launches: FC<LaunchesProps> = memo(({ launches, cell }) => {
  const { classes: styles, theme, cx } = useStyles()

  return (
    <div className={cx(styles.launches, { [styles.cell]: cell })}>
      {launches.map((launch, index) => (
        <p key={index} style={getLaunchStyle(launch.type, theme)} className={styles.text}>
          {`${getLaunchName(launch.type, true)} ${launch.value} %`}
        </p>
      ))}
    </div>
  )
})
