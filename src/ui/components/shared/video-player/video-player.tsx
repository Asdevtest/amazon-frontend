import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import { useClassNames } from './video-player.styles'

interface Props {
  videoSource: string
  controls?: boolean
  i?: boolean
}

export const VideoPlayer: FC<Props> = observer(({ videoSource, controls, i }) => {
  const { classes: styles } = useClassNames()

  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        muted
        controls={controls}
        playing={i}
        url={'https://blog.addpipe.com/static/the-web-is-always-changing.webm'}
        width="100%"
        height="auto"
      />
      {/* <video
        muted
        preload="metadata"
        playsInline={i}
        controls={contrlols}
        src={'https://blog.addpipe.com/static/the-web-is-always-changing.webm'}
        className={styles.video}
      /> */}
    </div>
  )
})
