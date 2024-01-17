import { FC, memo } from 'react'

import { UploadFilesInput } from '@components/shared/upload-files-input'

import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from './chat-files-input.style'

interface ChatFilesInputProps {
  files: IUploadFile[]
  setFiles: (e: IUploadFile[]) => void
}

export const ChatFilesInput: FC<ChatFilesInputProps> = memo(({ files, setFiles }) => {
  const { classes: styles } = useClassNames()

  return (
    <div className={styles.root}>
      <UploadFilesInput withoutLinks fullWidth images={files} setImages={setFiles} maxNumber={50} acceptType={['']} />
    </div>
  )
})
