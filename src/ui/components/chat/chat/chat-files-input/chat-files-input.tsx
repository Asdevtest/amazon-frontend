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

  const isMobileResolution = window.innerWidth < 768

  return (
    <div className={classNames.root}>
      <UploadFilesInput
        withoutLinks
        oneLine={files.length !== 0 && isMobileResolution}
        fullWidth={files.length === 0 && isMobileResolution}
        images={files}
        setImages={setFiles}
        maxNumber={50}
        acceptType={['']}
      />
    </div>
  )
}
