import { FC, memo } from 'react'

import { UploadFilesInput } from '@components/shared/upload-files-input'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './chat-files-input.style'

interface ChatFilesInputProps {
  files: UploadFileType[]
  setFiles: (e: UploadFileType[]) => void
}

export const ChatFilesInput: FC<ChatFilesInputProps> = memo(({ files, setFiles }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <UploadFilesInput withoutLinks images={files} setImages={setFiles} />
    </div>
  )
})
