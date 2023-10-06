import { observer } from 'mobx-react'
import { FC } from 'react'

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { useImageModalStyles } from '@components/modals/image-modal/image-modal.styles'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { ButtonControls } from '@components/shared/photo-and-files-slider/button-controls'
import { Slider } from '@components/shared/photo-and-files-slider/slider'
import { usePhotoAndFilesSlider } from '@components/shared/photo-and-files-slider/use-photo-and-files-slider'

import { getShortenStringIfLongerThanCount } from '@utils/text'

import { IUploadFile } from '@typings/upload-file'

export interface ImageObjectType {
  url: string
  _id?: string
  comment?: string
  file?: unknown
  title?: string
}

interface Props {
  isOpenModal: boolean
  imageList: Array<string | IUploadFile>
  currentImageIndex: number
  photosTitles?: string[]
  photosComments?: string[]
  handleOpenModal: VoidFunction
  handleCurrentImageIndex: (index: number) => void
  showPreviews?: boolean
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void
}

export const ImageModal: FC<Props> = observer(
  ({
    imageList,
    currentImageIndex,
    photosTitles,
    photosComments,
    isOpenModal,
    showPreviews,
    isEditable,
    withoutMakeMainImage,
    handleOpenModal,
    handleCurrentImageIndex,
    onChangeImagesForLoad,
  }) => {
    const { classes: styles, cx } = useImageModalStyles()
    const {
      openImageEditModal,
      onOpenImageEditModal,
      openImageZoomModal,
      onOpenImageZoomModal,

      photos,
      photoIndex,
      setPhotoIndex,

      onClickMakeMainImageObj,
      onUploadFile,
      onClickRemoveImageObj,
      onClickEditImageSubmit,
      onClickDownloadPhoto,
    } = usePhotoAndFilesSlider(imageList, onChangeImagesForLoad, currentImageIndex)

    return (
      <Modal
        openModal={isOpenModal}
        setOpenModal={() => {
          handleOpenModal()
          handleCurrentImageIndex(photoIndex)
        }}
        missClickModalOn={undefined}
        isWarning={false}
        dialogContextClassName={styles.modalContainer}
      >
        <div className={styles.wrapper}>
          {/* Image List */}

          {showPreviews && (
            <div className={styles.imagesList}>
              {photos?.map((photo, index) => {
                return (
                  <div
                    key={index}
                    className={cx(styles.imagesListItem, {
                      [styles.imagesListItemActive]: index === photoIndex,
                    })}
                    onClick={() => setPhotoIndex(index)}
                  >
                    <img src={typeof photo === 'string' ? photo : photo.data_url} alt={`Photo ${photoIndex}`} />

                    {photosTitles?.length && (
                      <p className={cx(styles.imagesListItemTitle, styles.shortText)}>{photosTitles[photoIndex]}</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Slider */}

          <div className={styles.body}>
            {photosTitles?.length && <p className={styles.title}>{photosTitles[photoIndex]}</p>}

            <Slider bigSlider slides={photos} currentIndex={photoIndex} setCurrentIndex={setPhotoIndex} />

            {/* Info */}

            {photosComments?.length && (
              <p className={cx(styles.title, styles.clientComment)}>
                {getShortenStringIfLongerThanCount(photosComments[photoIndex], 200)}
              </p>
            )}

            {/* Controls */}

            <div className={styles.controls}>
              <Button onClick={() => onClickDownloadPhoto(photos[photoIndex])}>
                <DownloadOutlinedIcon />
              </Button>

              <Button onClick={onOpenImageZoomModal}>
                <ZoomOutMapOutlinedIcon />
              </Button>

              {isEditable ? (
                <ButtonControls
                  image={photos[photoIndex]}
                  imageIndex={photoIndex}
                  withoutMakeMainImage={withoutMakeMainImage}
                  onClickMakeMainImageObj={onClickMakeMainImageObj}
                  onImageEditToggle={onOpenImageEditModal}
                  onUploadFile={onUploadFile}
                  onClickRemoveImageObj={onClickRemoveImageObj}
                />
              ) : null}
            </div>
          </div>
        </div>

        {openImageZoomModal ? (
          <ZoomModal
            images={photos}
            currentImageIndex={photoIndex}
            isOpenModal={openImageZoomModal}
            setIsOpenModal={onOpenImageZoomModal}
            setCurrentImageIndex={setPhotoIndex}
          />
        ) : null}

        <Modal openModal={openImageEditModal} setOpenModal={onOpenImageEditModal}>
          <ImageEditForm
            item={photos[photoIndex]}
            setOpenModal={onOpenImageEditModal}
            onSave={onClickEditImageSubmit}
          />
        </Modal>
      </Modal>
    )
  },
)
