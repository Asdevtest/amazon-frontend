import { FC, memo } from 'react'
import { MdPlayCircle } from 'react-icons/md'

import { useStyles } from './video-preloader.style'

import { VideoPlayer } from '../video-player/video-player'

interface VideoPreloaderProps {
  videoSource: string
  wrapperClassName?: string
  preloaderClassName?: string
  iconPlayClassName?: string
  onClick?: () => void
  onReady?: () => void
}

/**
 * A React component for preloading video without the ability to view them.
 *
 * @param {String} videoSource - The url of a video or song to play.
 * @param {String} wrapperClassName - Custom styles for the main wrapper.
 * @param {String} preloaderClassName - Custom styles for the play icon.
 * @param {String} iconPlayClassName - Custom styles for the play icon.
 * @param {Function} onClick - Click function when pressing a video preloader.
 * @returns {HTMLElement} Returns a video preloader.
 */
export const VideoPreloader: FC<VideoPreloaderProps> = memo(props => {
  const { videoSource, wrapperClassName, preloaderClassName, iconPlayClassName, onClick, onReady } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, wrapperClassName)} onClick={onClick}>
      <VideoPlayer preloader videoSource={videoSource} onReady={onReady} />
      <div className={cx(styles.preloader, preloaderClassName)}>
        <MdPlayCircle size={24} className={cx(styles.preloaderIcon, iconPlayClassName)} />
      </div>
    </div>
  )
})
