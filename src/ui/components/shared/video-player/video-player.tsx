import { observer } from 'mobx-react'
import { FC } from 'react'

import { useClassNames } from './video-player.styles'

interface Props {
  videoSource: string
  contrlols?: boolean
}

export const VideoPlayer: FC<Props> = observer(({ videoSource, contrlols }) => {
  const { classes: styles } = useClassNames()

  return (
    <div className={styles.wrapper}>
      <video controls={contrlols} src={`${videoSource}#t=8`} className={styles.video} />
    </div>
  )
})
