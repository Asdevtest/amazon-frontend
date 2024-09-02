import { observer } from 'mobx-react'
import { ChangeEvent, FC } from 'react'
import {
  MdAutorenew,
  MdDeleteOutline,
  MdOutlineDownload,
  MdOutlineModeEdit,
  MdOutlineStar,
  MdZoomOutMap,
} from 'react-icons/md'

import { Button } from '@components/shared/button'

import { checkIsImageLink } from '@utils/checks'

import { ButtonStyle } from '@typings/enums/button-style'
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
    onMakeMainFile,
    onDownloadFile,
    onOpenImageZoomModal,
  } = props

  const { classes: styles, cx } = useStyles()

  const isImageType = checkIsImageLink(isString(mediaFile) ? mediaFile : '.' + mediaFile?.file?.name) // checkIsImageLink accepts .extension

  return (
    <div className={styles.controls}>
      <Button className={styles.button} onClick={() => onDownloadFile(mediaFile)}>
        <MdOutlineDownload size={20} className={styles.icon} />
      </Button>

      <Button className={styles.button} onClick={onOpenImageZoomModal}>
        <MdZoomOutMap size={20} className={styles.icon} />
      </Button>

      {isEditable ? (
        <>
          {!withoutMakeMainImage ? (
            <Button
              disabled={mediaFileIndex === 0}
              className={styles.button}
              onClick={() => onMakeMainFile(mediaFile, mediaFileIndex)}
            >
              <MdOutlineStar size={20} className={cx({ [styles.starIcon]: mediaFileIndex === 0 })} />
            </Button>
          ) : null}

          {isImageType ? (
            <Button className={styles.button} onClick={() => onImageEditToggle?.()}>
              <MdOutlineModeEdit size={20} className={styles.icon} />
            </Button>
          ) : null}

          <Button className={styles.button}>
            <MdAutorenew size={20} className={styles.icon} />
            <input
              type="file"
              defaultValue=""
              className={styles.pasteInput}
              onChange={event => onUploadFile(event, mediaFileIndex)}
            />
          </Button>

          <Button styleType={ButtonStyle.DANGER} className={styles.button} onClick={() => onRemoveFile(mediaFileIndex)}>
            <MdDeleteOutline size={20} className={styles.icon} />
          </Button>
        </>
      ) : null}
    </div>
  )
})
