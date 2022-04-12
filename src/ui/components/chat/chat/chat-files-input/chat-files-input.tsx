import React, {FC} from 'react'

import {ImageType} from 'react-images-uploading'

import {UploadFilesInput} from '@components/upload-files-input'

import {useClassNames} from './chat-files-input.style'

interface Props {
  files: ImageType[]
  setFiles: (e: any) => void
}

export const ChatFilesInput: FC<Props> = ({files, setFiles}) => {
  const classNames = useClassNames()
  console.log('files ', files)
  return (
    <div className={classNames.root}>
      <UploadFilesInput
        withoutLinks
        images={files}
        setImages={setFiles}
        maxNumber={50}
        acceptType={['jpg', 'gif', 'png', 'pdf']}
      />
    </div>
  )
}
