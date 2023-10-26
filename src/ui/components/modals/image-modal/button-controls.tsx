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

import { useImageModalStyles } from './image-modal.styles'

interface Props {
  image: string | IUploadFile
  imageIndex: number
  withoutMakeMainImage?: boolean
  onClickRemoveImageObj: (imageIndex: number) => void
  onUploadFile: (event: ChangeEvent<HTMLInputElement>, imageIndex: number) => void
  onClickMakeMainImageObj: (image: string | IUploadFile, imageIndex: number) => void
  onClickDownloadPhoto: (image: string | IUploadFile) => void
  onOpenImageZoomModal: VoidFunction
  isEditable?: boolean
  onImageEditToggle?: VoidFunction
}

export const ButtonControls: FC<Props> = observer(
  ({
    image,
    imageIndex,
    withoutMakeMainImage,
    isEditable,
    onImageEditToggle,
    onClickRemoveImageObj,
    onUploadFile,
    onClickMakeMainImageObj,
    onClickDownloadPhoto,
    onOpenImageZoomModal,
  }) => {
    const { classes: classNames, cx } = useImageModalStyles()
    const isVideoType = checkIsVideoLink(typeof image === 'string' ? image : image?.file?.name)

    return (
      <>
        <Button onClick={() => onClickDownloadPhoto(image)}>
          <DownloadOutlinedIcon />
        </Button>

        {!isVideoType && (
          <Button onClick={onOpenImageZoomModal}>
            <ZoomOutMapOutlinedIcon />
          </Button>
        )}

        {isEditable && !withoutMakeMainImage && (
          <>
            {imageIndex === 0 ? (
              <div className={cx(classNames.imagesModalBtn, classNames.activeMainIcon)}>
                <StarOutlinedIcon />
              </div>
            ) : (
              <Button
                disabled={imageIndex === 0}
                className={classNames.imagesModalBtn}
                onClick={() => onClickMakeMainImageObj(image, imageIndex)}
              >
                <StarOutlinedIcon />
              </Button>
            )}
          </>
        )}

        {isEditable && !isVideoType && (
          <Button
            className={classNames.imagesModalBtn}
            onClick={() => (onImageEditToggle ? onImageEditToggle() : undefined)}
          >
            <ModeOutlinedIcon />
          </Button>
        )}

        {isEditable && (
          <Button className={classNames.imagesModalBtn}>
            <AutorenewIcon />

            <input
              type="file"
              className={classNames.pasteInput}
              defaultValue={''}
              onChange={event => onUploadFile(event, imageIndex)}
            />
          </Button>
        )}

        {isEditable && (
          <Button danger className={classNames.imagesModalBtn} onClick={() => onClickRemoveImageObj(imageIndex)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        )}
      </>
    )
  },
)
