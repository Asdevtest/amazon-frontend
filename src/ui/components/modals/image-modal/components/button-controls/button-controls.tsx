import { observer } from 'mobx-react'
import { ChangeEvent, FC } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'

import { Button } from '@components/shared/buttons/button'

import { checkIsVideoLink } from '@utils/checks'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './button-controls.style'

interface ButtonControlsProps {
  mediaFile: string | UploadFileType
  mediaFileIndex: number
  withoutMakeMainImage?: boolean
  isEditable?: boolean
  onRemoveFile: (mediaFileIndex: number) => void
  onUploadFile: (event: ChangeEvent<HTMLInputElement>, mediaFileIndex: number) => void
  onMakeMainFile: (mediaFile: string | UploadFileType, mediaFileIndex: number) => void
  onDownloadFile: (mediaFile: string | UploadFileType) => void
  onOpenImageZoomModal: () => void
  onImageEditToggle?: () => void
}

export const ButtonControls: FC<ButtonControlsProps> = observer(
  ({
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
  }) => {
    const { classes: styles, cx } = useStyles()

    const isVideoType = checkIsVideoLink(typeof mediaFile === 'string' ? mediaFile : mediaFile?.file?.name)

    return (
      <div className={styles.controls}>
        <Button onClick={() => onDownloadFile(mediaFile)}>
          <DownloadOutlinedIcon />
        </Button>

        <Button onClick={onOpenImageZoomModal}>
          <ZoomOutMapOutlinedIcon />
        </Button>

        {isEditable && !withoutMakeMainImage && (
          <>
            {mediaFileIndex === 0 ? (
              <div className={cx(styles.button, styles.activeMainIcon)}>
                <StarOutlinedIcon />
              </div>
            ) : (
              <Button
                disabled={mediaFileIndex === 0}
                className={styles.button}
                onClick={() => onMakeMainFile(mediaFile, mediaFileIndex)}
              >
                <StarOutlinedIcon />
              </Button>
            )}
          </>
        )}

        {isEditable && !isVideoType && (
          <Button className={styles.button} onClick={() => (onImageEditToggle ? onImageEditToggle() : undefined)}>
            <ModeOutlinedIcon />
          </Button>
        )}

        {isEditable && (
          <Button className={styles.button}>
            <AutorenewIcon />

            <input
              type="file"
              className={styles.pasteInput}
              defaultValue={''}
              onChange={event => onUploadFile(event, mediaFileIndex)}
            />
          </Button>
        )}

        {isEditable && (
          <Button danger className={styles.button} onClick={() => onRemoveFile(mediaFileIndex)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        )}
      </div>
    )
  },
)
