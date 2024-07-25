import { observer } from 'mobx-react'
import { ChangeEvent, FC } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'

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
        <DownloadOutlinedIcon className={styles.icon} />
      </Button>

      <Button className={styles.button} onClick={onOpenImageZoomModal}>
        <ZoomOutMapOutlinedIcon className={styles.icon} />
      </Button>

      {isEditable ? (
        <>
          {!withoutMakeMainImage ? (
            <Button
              disabled={mediaFileIndex === 0}
              className={styles.button}
              onClick={() => onMakeMainFile(mediaFile, mediaFileIndex)}
            >
              <StarOutlinedIcon className={cx({ [styles.starIcon]: mediaFileIndex === 0 })} />
            </Button>
          ) : null}

          {isImageType ? (
            <Button className={styles.button} onClick={() => onImageEditToggle?.()}>
              <ModeOutlinedIcon className={styles.icon} />
            </Button>
          ) : null}

          <Button className={styles.button}>
            <AutorenewIcon className={styles.icon} />

            <input
              type="file"
              defaultValue=""
              className={styles.pasteInput}
              onChange={event => onUploadFile(event, mediaFileIndex)}
            />
          </Button>

          <Button styleType={ButtonStyle.DANGER} className={styles.button} onClick={() => onRemoveFile(mediaFileIndex)}>
            <DeleteOutlineOutlinedIcon className={styles.icon} />
          </Button>
        </>
      ) : null}
    </div>
  )
})
