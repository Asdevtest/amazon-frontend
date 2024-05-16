import { FC, memo } from 'react'

import { ILaunch } from '@typings/shared/launch'

import { getLaunchStyle } from './helpers/get-launch-style'
import { useStyles } from './launches-cell.style'

import { getLaunchName } from './helpers/get-launch-name'

interface LaunchesCellProps {
  launches: ILaunch[]
}

export const LaunchesCell: FC<LaunchesCellProps> = memo(({ launches }) => {
  const { classes: styles, theme } = useStyles()

  return (
    <div className={styles.launches}>
      {launches.map((launch, index) => (
        <p key={index} style={getLaunchStyle(launch.type, theme)} className={styles.text}>
          {`${getLaunchName(launch.type, true)} ${launch.value} %`}
        </p>
      ))}
    </div>
  )
})
