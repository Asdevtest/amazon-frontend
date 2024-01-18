import { FC, memo } from 'react'

import { UploadFilesInput } from '@components/shared/upload-files-input'

import { UploadFileType } from '@typings/upload-file'

import { useClassNames } from './chat-files-input.style'

interface ChatFilesInputProps {
  files: UploadFileType[]
  setFiles: (e: UploadFileType[]) => void
}

export const ChatFilesInput: FC<ChatFilesInputProps> = memo(({ files, setFiles }) => {
  const { classes: styles } = useClassNames()

  return (
    <div className={styles.root}>
      <UploadFilesInput withoutLinks fullWidth images={files} setImages={setFiles} maxNumber={50} acceptType={['']} />
    </div>
  )
})
