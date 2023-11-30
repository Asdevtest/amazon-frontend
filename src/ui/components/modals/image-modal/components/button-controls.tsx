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

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from '../image-modal.style'

interface ButtonControlsProps {
  mediaFile: string | IUploadFile
  mediaFileIndex: number
  withoutMakeMainImage?: boolean
  isEditable?: boolean
  onClickRemoveImageObj: (mediaFileIndex: number) => void
  onUploadFile: (event: ChangeEvent<HTMLInputElement>, mediaFileIndex: number) => void
  onClickMakeMainImageObj: (mediaFile: string | IUploadFile, mediaFileIndex: number) => void
  onClickDownloadPhoto: (mediaFile: string | IUploadFile) => void
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
    onClickRemoveImageObj,
    onUploadFile,
    onClickMakeMainImageObj,
    onClickDownloadPhoto,
    onOpenImageZoomModal,
  }) => {
    const { classes: styles, cx } = useStyles()

    const isVideoType = checkIsVideoLink(typeof mediaFile === 'string' ? mediaFile : mediaFile?.file?.name)

    return (
      <div className={styles.controls}>
        <Button onClick={() => onClickDownloadPhoto(mediaFile)}>
          <DownloadOutlinedIcon />
        </Button>

        <Button onClick={onOpenImageZoomModal}>
          <ZoomOutMapOutlinedIcon />
        </Button>

        {isEditable && !withoutMakeMainImage && (
          <>
            {mediaFileIndex === 0 ? (
              <div className={cx(styles.imagesModalBtn, styles.activeMainIcon)}>
                <StarOutlinedIcon />
              </div>
            ) : (
              <Button
                disabled={mediaFileIndex === 0}
                className={styles.imagesModalBtn}
                onClick={() => onClickMakeMainImageObj(mediaFile, mediaFileIndex)}
              >
                <StarOutlinedIcon />
              </Button>
            )}
          </>
        )}

        {isEditable && !isVideoType && (
          <Button
            className={styles.imagesModalBtn}
            onClick={() => (onImageEditToggle ? onImageEditToggle() : undefined)}
          >
            <ModeOutlinedIcon />
          </Button>
        )}

        {isEditable && (
          <Button className={styles.imagesModalBtn}>
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
          <Button danger className={styles.imagesModalBtn} onClick={() => onClickRemoveImageObj(mediaFileIndex)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        )}
      </div>
    )
  },
)
