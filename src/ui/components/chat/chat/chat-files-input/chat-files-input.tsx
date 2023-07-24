import React, { FC } from 'react'
import { ImageType } from 'react-images-uploading-alex76457-version'

import { IFile } from '@components/chat/multiple-chats'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { useClassNames } from './chat-files-input.style'

interface Props {
  files: ImageType[]
  setFiles: (e: IFile[]) => void
}

export const ChatFilesInput: FC<Props> = ({ files, setFiles }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div className={classNames.root}>
      <UploadFilesInput oneLine withoutLinks images={files} setImages={setFiles} maxNumber={50} acceptType={['']} />
    </div>
  )
}
