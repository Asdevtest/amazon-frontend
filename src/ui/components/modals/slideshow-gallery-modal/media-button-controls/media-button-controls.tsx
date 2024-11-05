import { observer } from 'mobx-react'
import { ChangeEvent, FC, useState } from 'react'
import { BsDownload } from 'react-icons/bs'
import { MdAutorenew, MdDeleteOutline, MdOutlineModeEdit, MdOutlineStar, MdZoomOutMap } from 'react-icons/md'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'

import { checkIsImageLink } from '@utils/checks'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './media-button-controls.style'

interface MediaButtonControlsProps {
  mediaFile: UploadFileType
  mediaFileIndex: number
  onRemoveFile: (mediaFileIndex: number) => void
  onUploadFile: (event: ChangeEvent<HTMLInputElement>, mediaFileIndex: number) => void
  onMakeMainFile: (mediaFile: UploadFileType, mediaFileIndex: number) => void
  onDownloadFile: (mediaFile: UploadFileType) => void
  onDownloadFiles: () => void
  onOpenImageZoomModal: () => void
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onImageEditToggle?: () => void
}

export const MediaButtonControls: FC<MediaButtonControlsProps> = observer(props => {
  const {
    mediaFile,
    mediaFileIndex,
    withoutMakeMainImage,
    isEditable,
    onImageEditToggle,
    onRemoveFile,
    onUploadFile,
    onDownloadFiles,
    onMakeMainFile,
    onDownloadFile,
    onOpenImageZoomModal,
  } = props

  const { classes: styles, cx } = useStyles()

  const [downloadAll, setDownloadAll] = useState(false)

  const isImageType = checkIsImageLink(isString(mediaFile) ? mediaFile : '.' + mediaFile?.file?.name) // checkIsImageLink accepts .extension

  const handleDownload = () => {
    downloadAll ? onDownloadFiles() : onDownloadFile(mediaFile)
    setDownloadAll(false)
  }

  return (
    <div className={styles.controls}>
      <CustomCheckbox checked={downloadAll} onChange={e => setDownloadAll(e.target.checked)}>
        Select all
      </CustomCheckbox>
      <CustomButton icon={<BsDownload size={16} onClick={handleDownload} />} />

      <CustomButton icon={<MdZoomOutMap size={20} />} onClick={onOpenImageZoomModal} />

      {isEditable ? (
        <>
          {!withoutMakeMainImage ? (
            <CustomButton
              icon={<MdOutlineStar size={20} className={cx({ [styles.starIcon]: mediaFileIndex === 0 })} />}
              disabled={mediaFileIndex === 0}
              onClick={() => onMakeMainFile(mediaFile, mediaFileIndex)}
            />
          ) : null}

          {isImageType ? <CustomButton icon={<MdOutlineModeEdit size={20} />} onClick={onImageEditToggle} /> : null}

          <div className={styles.button}>
            <CustomButton icon={<MdAutorenew size={20} />} />
            <input
              type="file"
              defaultValue=""
              className={styles.pasteInput}
              onChange={event => onUploadFile(event, mediaFileIndex)}
            />
          </div>

          <CustomButton danger icon={<MdDeleteOutline size={20} />} onClick={() => onRemoveFile(mediaFileIndex)} />
        </>
      ) : null}
    </div>
  )
})
