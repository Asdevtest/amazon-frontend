/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, useEffect, useState } from 'react'

import { Box } from '@mui/material'

import { imageTypes } from '@constants/image-types'

import { useChatMessageFileStyles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files.styles'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { downloadFileByLink, getFileWeight } from '@utils/upload-files'

interface ChatMessageFileProps {
  src: string
}

export const ChatMessageFile: FC<ChatMessageFileProps> = props => {
  const { src } = props
  const { classes: styles } = useChatMessageFileStyles()

  const [fileSize, setFileSize] = useState('0 byte')

  const fileName = getFileNameFromUrl(src)

  useEffect(() => {
    getFileWeight(src).then(res => setFileSize(res))
  }, [])

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'doc':
      case 'docx':
        return 'doc.svg'
      case 'pdf':
        return 'pdf.svg'
      case 'xlsx':
      case 'xls':
        return 'xlsx.svg'
      default:
        return 'default.svg'
    }
  }

  return (
    <div className={styles.fileWrapper} onClick={() => downloadFileByLink(src, fileName.name)}>
      <div className={styles.logo}>
        <img
          src={
            imageTypes.includes(fileName.type!)
              ? getAmazonImageUrl(src)
              : `/assets/icons/fileTypes/${getFileTypeIcon(fileName.type!)}`
          }
          alt="Img"
        />
      </div>
      <div className={styles.info}>
        <Box display="flex">
          <p className={styles.fileName}>{fileName.name}</p>
          <p className={styles.fileType}>.{fileName.type}</p>
        </Box>

        <p className={styles.fileSize}>{fileSize}</p>
      </div>
    </div>
  )
}
