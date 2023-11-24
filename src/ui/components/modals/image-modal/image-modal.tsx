import { FC, memo } from 'react'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Slider } from '@components/shared/photo-and-files-slider/slider'
import { usePhotoAndFilesSlider } from '@components/shared/photo-and-files-slider/use-photo-and-files-slider'

import { getShortenStringIfLongerThanCount } from '@utils/text'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './image-modal.styles'

import { ButtonControls, ShowPreviews } from './components'

interface Props {
  isOpenModal: boolean
  imageList: Array<string | IUploadFile>
  currentImageIndex: number
  handleOpenModal: () => void
  handleCurrentImageIndex: (index: number) => void
  photosTitles?: string[]
  photosComments?: string[]
  showPreviews?: boolean
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void
}

export const ImageModal: FC<Props> = memo(props => {
  const {
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
  } = props

  const { classes: styles, cx } = useStyles()
  const {
    openImageEditModal,
    onOpenImageEditModal,
    openImageZoomModal,
    onOpenImageZoomModal,

    photos,
    photoIndex,
    setPhotoIndex,

    isPlaying,
    setIsPlaying,

    onClickMakeMainImageObj,
    onUploadFile,
    onClickRemoveImageObj,
    onClickEditImageSubmit,
    onClickDownloadPhoto,
    updateImagesForLoad,
  } = usePhotoAndFilesSlider(imageList, onChangeImagesForLoad, currentImageIndex)

  return (
    <Modal
      openModal={isOpenModal}
      setOpenModal={() => {
        handleOpenModal()
        handleCurrentImageIndex(photoIndex)
        updateImagesForLoad()
      }}
      dialogClassName={styles.modalContainer}
    >
      <div className={styles.wrapper}>
        <ShowPreviews
          photos={photos}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          setIsPlaying={setIsPlaying}
          showPreviews={showPreviews}
          photosTitles={photosTitles}
        />

        <div className={styles.body}>
          {photosTitles?.[photoIndex] && <p className={styles.title}>{photosTitles?.[photoIndex]}</p>}

          <Slider
            controls
            isHideCounter
            customSlideHeight={500}
            slides={photos}
            currentIndex={photoIndex}
            setCurrentIndex={setPhotoIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />

          {photosComments?.[photoIndex] && (
            <p className={cx(styles.title, styles.clientComment)}>
              {getShortenStringIfLongerThanCount(photosComments?.[photoIndex], 200)}
            </p>
          )}

          <ButtonControls
            isEditable={isEditable}
            image={photos?.[photoIndex]}
            imageIndex={photoIndex}
            withoutMakeMainImage={withoutMakeMainImage}
            onClickMakeMainImageObj={onClickMakeMainImageObj}
            onImageEditToggle={onOpenImageEditModal}
            onUploadFile={onUploadFile}
            onClickRemoveImageObj={onClickRemoveImageObj}
            onClickDownloadPhoto={onClickDownloadPhoto}
            onOpenImageZoomModal={onOpenImageZoomModal}
          />
        </div>
      </div>

      <ZoomModal
        images={photos}
        currentImageIndex={photoIndex}
        isOpenModal={openImageZoomModal}
        setIsOpenModal={onOpenImageZoomModal}
        setCurrentImageIndex={setPhotoIndex}
      />

      <Modal openModal={openImageEditModal} setOpenModal={onOpenImageEditModal}>
        <ImageEditForm
          item={photos?.[photoIndex]}
          setOpenModal={onOpenImageEditModal}
          onSave={onClickEditImageSubmit}
        />
      </Modal>
    </Modal>
  )
})
