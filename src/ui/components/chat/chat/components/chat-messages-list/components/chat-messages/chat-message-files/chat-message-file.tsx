import { FC, memo, useEffect, useState } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { downloadFileByLink, getFileWeight } from '@utils/upload-files'

import { useStyles } from './chat-message-files.style'

interface ChatMessageFileProps {
  src: string
}

export const ChatMessageFile: FC<ChatMessageFileProps> = memo(({ src }) => {
  const { classes: styles } = useStyles()

  const [fileSize, setFileSize] = useState('0 byte')

  const recreatedFile = getFileNameFromUrl(src)

  useEffect(() => {
    getFileWeight(src).then(res => setFileSize(res))
  }, [])

  return (
    <div className={styles.fileWrapper} onClick={() => downloadFileByLink(src, recreatedFile?.name)}>
      <div className={styles.logo}>
        {checkIsVideoLink(src) ? (
          <VideoPreloader videoSource={getAmazonImageUrl(src)} />
        ) : checkIsImageLink(src) ? (
          <img src={getAmazonImageUrl(src)} alt="message_file_icon" />
        ) : (
          recreatedFile.type && <FileIcon fileExtension={recreatedFile.type} className={styles.fileIcon} />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.nameWrapper}>
          <p className={styles.fileName}>{recreatedFile?.name}</p>
          <p>.{recreatedFile?.type}</p>
        </div>

        <p className={styles.fileSize}>{fileSize}</p>
      </div>
    </div>
  )
})
