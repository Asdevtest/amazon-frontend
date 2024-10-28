import { FC, memo } from 'react'

import { VideoPreloader } from '@components/shared/video-preloader'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './chat-info-videos.style'

interface ChatInfoVideosProps {
  videos: string[]
  onClickOpenPreview: (videoIndex: number) => void
}

export const ChatInfoVideos: FC<ChatInfoVideosProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { videos, onClickOpenPreview } = props

  return (
    <>
      {videos?.map((video, videoIndex) => (
        <VideoPreloader
          key={videoIndex}
          wrapperClassName={styles.videoWrapper}
          videoSource={getAmazonImageUrl(video)}
          onClick={() => onClickOpenPreview(videoIndex)}
        />
      ))}
    </>
  )
})
