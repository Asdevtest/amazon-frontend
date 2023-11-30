import { FC, memo } from 'react'
import ReactPlayer from 'react-player'

import { useStyles } from './video-player.style'

interface Props {
  videoSource: string
  controls?: boolean
  isPlaying?: boolean
  height?: string
  wrapperClass?: string
  videoPlayerClass?: string
  setIsPlaying?: (isPlaying: boolean) => void
}

/**
 * A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura.
 *
 * @param {String} videoSource - The url of a video or song to play.
 * @param {Boolean} controls - Set to true or false to display native player controls.
 * @param {Boolean} isPlaying - Set to true or false to pause or play the media.
 * @param {String} height - Сustom video height.
 * @param {String} wrapperClass - custom styles for the main wrapper.
 * @param {String} videoPlayerClass - custom styles for the video player.
 * @param {Function} setIsPlaying - A callback function that can be used to set the playing state of the media. When called with `true`, the media will play, and when called with `false`, the media will pause.
 * @returns {HTMLElement} Returns a video player.
 */
export const VideoPlayer: FC<Props> = memo(props => {
  const { videoSource, controls, isPlaying, height, wrapperClass, videoPlayerClass, setIsPlaying } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, wrapperClass)}>
      <ReactPlayer
        playsinline
        volume={0.1}
        playing={isPlaying}
        controls={controls}
        url={videoSource}
        width="100%"
        height={height || 'auto'}
        className={cx(styles.videoPlayer, videoPlayerClass)}
        onPlay={() => (setIsPlaying ? setIsPlaying(true) : undefined)} // fix a bug when changing focus from video to photo
      />
    </div>
  )
})
