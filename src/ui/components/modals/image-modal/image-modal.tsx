import { FC, memo } from 'react'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Slider } from '@components/shared/photo-and-files-slider/slider'
import { usePhotoAndFilesSlider } from '@components/shared/photo-and-files-slider/use-photo-and-files-slider'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './image-modal.style'

import { ButtonControls, Comment, ShowPreviews } from './components'

interface ImageModalProps {
  files: Array<string | IUploadFile>
  currentFileIndex: number
  onCurrentFileIndex: (index: number) => void
  isOpenModal: boolean
  onOpenModal: () => void
  photosTitles?: string[]
  photosComments?: string[]
  showPreviews?: boolean
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  isRequestResult?: boolean
  isModalOpenedFromSlider?: boolean
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void
}

export const ImageModal: FC<ImageModalProps> = memo(props => {
  const {
    files,
    currentFileIndex,
    onCurrentFileIndex,
    isOpenModal,
    onOpenModal,
    photosTitles,
    photosComments,
    showPreviews,
    isEditable,
    withoutMakeMainImage,
    isRequestResult = false,
    isModalOpenedFromSlider = false,
    onChangeImagesForLoad,
  } = props

  const { classes: styles } = useStyles()
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

    onMakeMainFile,
    onUploadFile,
    onRemoveFile,
    onEditRotateFile,
    onDownloadFile,
    updateImagesForLoad,
  } = usePhotoAndFilesSlider(files, onChangeImagesForLoad, currentFileIndex)

  return (
    <Modal
      openModal={isOpenModal}
      setOpenModal={() => {
        onOpenModal()
        onCurrentFileIndex(mediaFileIndex)
        !isModalOpenedFromSlider && updateImagesForLoad()
        isModalOpenedFromSlider && onChangeImagesForLoad ? onChangeImagesForLoad(mediaFiles) : undefined
      }}
      dialogClassName={styles.modalContainer}
    >
      <div className={styles.wrapper}>
        <ShowPreviews
          slides={isRequestResult ? files : mediaFiles} // use files only in request results for viewing (no actions)
          currentIndex={mediaFileIndex}
          setCurrentIndex={setMediaFileIndex}
          setIsPlaying={setIsPlaying}
          showPreviews={showPreviews}
          photosTitles={photosTitles}
        />

        <div className={styles.body}>
          {photosTitles?.[mediaFileIndex] ? <p className={styles.title}>{photosTitles?.[mediaFileIndex]}</p> : null}

          <Slider
            controls
            isHideCounter
            customSlideHeight={500}
            slides={isRequestResult ? files : mediaFiles} // use files only in request results for viewing (no actions)
            currentIndex={mediaFileIndex}
            setCurrentIndex={setMediaFileIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />

          <Comment mediaFileIndex={mediaFileIndex} isRequestResult={isRequestResult} photosComments={photosComments} />

          <ButtonControls
            isEditable={isEditable}
            mediaFile={mediaFiles?.[mediaFileIndex]}
            mediaFileIndex={mediaFileIndex}
            withoutMakeMainImage={withoutMakeMainImage}
            onMakeMainFile={onMakeMainFile}
            onImageEditToggle={onOpenImageEditModal}
            onUploadFile={onUploadFile}
            onRemoveFile={onRemoveFile}
            onDownloadFile={onDownloadFile}
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
          onSave={onEditRotateFile}
        />
      </Modal>
    </Modal>
  )
})
