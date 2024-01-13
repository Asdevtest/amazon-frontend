import { FC, memo } from 'react'
import { ImageType } from 'react-images-uploading-alex76457-version'

import { UploadFilesInput } from '@components/shared/upload-files-input'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './chat-files-input.style'

interface ChatFilesInputProps {
  files: ImageType[]
  setFiles: (e: IUploadFile[]) => void
}

export const ChatFilesInput: FC<ChatFilesInputProps> = memo(({ files, setFiles }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <UploadFilesInput withoutLinks fullWidth images={files} setImages={setFiles} maxNumber={50} acceptType={['']} />
    </div>
  )
})
