import { FC, memo } from 'react'

import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { CustomImage } from '@components/shared/custom-image'
import { VideoPreloader } from '@components/shared/video-preloader'

import { checkIsDocumentLink, checkIsVideoLink } from '@utils/checks'

import { useStyles } from './media-content-cell.style'

interface MediaContentCellProps {
  file: string
}

export const MediaContentCell: FC<MediaContentCellProps> = memo(({ file }) => {
  const { classes: styles } = useStyles()

  if (!file) {
    return null
  }

  if (checkIsVideoLink(file)) {
    return (
      <div className={styles.wrapper}>
        <VideoPreloader videoSource={file} />
      </div>
    )
  }

  if (checkIsDocumentLink(file)) {
    const documentExtension = file?.split('.')?.slice(-1)?.[0]

    return (
      <div className={styles.wrapper}>
        <CustomFileIcon fileExtension={documentExtension} height="100%" />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <CustomImage preview={false} width={48} height={48} src={file} maskClassName={styles.mask} />
    </div>
  )
})
