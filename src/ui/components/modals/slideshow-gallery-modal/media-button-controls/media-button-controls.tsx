import { observer } from 'mobx-react'
import { ChangeEvent, FC } from 'react'
import { BsDownload, BsFileEarmarkArrowDown } from 'react-icons/bs'
import { MdAutorenew, MdDeleteOutline, MdOutlineModeEdit, MdOutlineStar, MdZoomOutMap } from 'react-icons/md'

import { CustomButton } from '@components/shared/custom-button'
import { DownloadAll } from '@components/shared/svg-icons'

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

  const isImageType = checkIsImageLink(isString(mediaFile) ? mediaFile : '.' + mediaFile?.file?.name) // checkIsImageLink accepts .extension

  const downloadMenuItems = [
    {
      key: 'download',
      label: <BsFileEarmarkArrowDown size={20} />,
      onClick: () => onDownloadFile(mediaFile),
    },
    {
      key: 'download-all',
      label: <DownloadAll className={styles.icon} />,
      onClick: onDownloadFiles,
    },
  ]

  return (
    <div className={styles.controls}>
      <div>
        <CustomButton dropdown type="primary" menuItems={downloadMenuItems} icon={<BsDownload size={20} />} />
      </div>

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
