import { FC, memo } from 'react'

import { IMediaRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { SlideByType } from '@components/shared/slide-by-type'

import { useStyles } from './common-content.style'

interface CommonContentProps {
  file: IMediaRework
  fileIndex: number
  onToggleImageModal: (fileIndex: number) => void
}

export const CommonContent: FC<CommonContentProps> = memo(props => {
  const { file, fileIndex, onToggleImageModal } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.file} onClick={() => onToggleImageModal(fileIndex)}>
      <SlideByType isPreviews mediaFile={file.fileLink} mediaFileIndex={fileIndex} />
    </div>
  )
})
