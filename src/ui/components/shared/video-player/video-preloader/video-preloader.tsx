import { FC, memo } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { useStyles } from './video-preloader.style'

import { VideoPlayer } from '../video-player'

interface VideoPreloaderProps {
  videoSource: string
  height?: number
  wrapperClassName?: string
  preloaderClassName?: string
  iconPlayClassName?: string
  onClick?: () => void
}

/**
 * A React component for preloading video without the ability to view them.
 *
 * @param {String} videoSource - The url of a video or song to play.
 * @param {Number} height - Сustom video preloader height.
 * @param {String} wrapperClassName - Custom styles for the main wrapper.
 * @param {String} preloaderClassName - Custom styles for the play icon.
 * @param {String} iconPlayClassName - Custom styles for the play icon.
 * @param {Function} onClick - Click function when pressing a video preloader.
 * @returns {HTMLElement} Returns a video preloader.
 */
export const VideoPreloader: FC<VideoPreloaderProps> = memo(props => {
  const { videoSource, height, wrapperClassName, preloaderClassName, iconPlayClassName, onClick } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, wrapperClassName)} onClick={onClick}>
      <VideoPlayer videoSource={videoSource} height={height} />
      <div className={cx(styles.preloader, preloaderClassName)}>
        <PlayCircleFilledWhiteOutlinedIcon className={cx(styles.preloaderIcon, iconPlayClassName)} />
      </div>
    </div>
  )
})
