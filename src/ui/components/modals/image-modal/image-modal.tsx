import { FC, memo } from 'react'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Slider } from '@components/shared/photo-and-files-slider/slider'
import { usePhotoAndFilesSlider } from '@components/shared/photo-and-files-slider/use-photo-and-files-slider'

import { getShortenStringIfLongerThanCount } from '@utils/text'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './image-modal.style'

import { ButtonControls, ShowPreviews } from './components'

interface ImageModalProps {
  files: Array<string | IUploadFile>
  currentFileIndex: number
  handleCurrentFileIndex: (index: number) => void
  isOpenModal: boolean
  handleOpenModal: () => void
  photosTitles?: string[]
  photosComments?: string[]
  showPreviews?: boolean
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  isRequestResult?: boolean
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void
}

export const ImageModal: FC<ImageModalProps> = memo(props => {
  const {
    files,
    currentFileIndex,
    handleCurrentFileIndex,
    isOpenModal,
    handleOpenModal,
    photosTitles,
    photosComments,
    showPreviews,
    isEditable,
    withoutMakeMainImage,
    isRequestResult = false,
    onChangeImagesForLoad,
  } = props

  const { classes: styles, cx } = useStyles()
  const {
    openImageEditModal,
    onOpenImageEditModal,
    openImageZoomModal,
    onOpenImageZoomModal,

    mediaFiles,
    mediaFileIndex,
    setMediaFileIndex,

    isPlaying,
    setIsPlaying,

    onClickMakeMainImageObj,
    onUploadFile,
    onClickRemoveImageObj,
    onClickEditImageSubmit,
    onClickDownloadPhoto,
    updateImagesForLoad,
  } = usePhotoAndFilesSlider(files, onChangeImagesForLoad, currentFileIndex)

  return (
    <Modal
      openModal={isOpenModal}
      setOpenModal={() => {
        handleOpenModal()
        handleCurrentFileIndex(mediaFileIndex)
        updateImagesForLoad()
      }}
      dialogClassName={styles.modalContainer}
    >
      <div className={styles.wrapper}>
        <ShowPreviews
          mediaFiles={mediaFiles}
          mediaFileIndex={mediaFileIndex}
          setMediaFileIndex={setMediaFileIndex}
          setIsPlaying={setIsPlaying}
          showPreviews={showPreviews}
          photosTitles={photosTitles}
        />

        <div className={styles.body}>
          {photosTitles?.[mediaFileIndex] && <p className={styles.title}>{photosTitles?.[mediaFileIndex]}</p>}

          <Slider
            controls
            isHideCounter
            customSlideHeight={500}
            slides={mediaFiles}
            currentIndex={mediaFileIndex}
            setCurrentIndex={setMediaFileIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />

          {photosComments?.[mediaFileIndex] && (
            <p
              title={photosComments?.[mediaFileIndex].length > 200 ? photosComments?.[mediaFileIndex] : ''}
              className={cx(styles.title, { [styles.titleError]: isRequestResult })}
            >
              {getShortenStringIfLongerThanCount(photosComments?.[mediaFileIndex], 200)}
            </p>
          )}

          <ButtonControls
            isEditable={isEditable}
            mediaFile={mediaFiles?.[mediaFileIndex]}
            mediaFileIndex={mediaFileIndex}
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

      {openImageZoomModal && (
        <ZoomModal
          mediaFiles={mediaFiles}
          currentMediaFileIndex={mediaFileIndex}
          isOpenModal={openImageZoomModal}
          setIsOpenModal={onOpenImageZoomModal}
          setCurrentMediaFileIndex={setMediaFileIndex}
        />
      )}

      <Modal openModal={openImageEditModal} setOpenModal={onOpenImageEditModal}>
        <ImageEditForm
          item={mediaFiles?.[mediaFileIndex]}
          setOpenModal={onOpenImageEditModal}
          onSave={onClickEditImageSubmit}
        />
      </Modal>
    </Modal>
  )
})
