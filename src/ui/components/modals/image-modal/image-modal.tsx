import { FC, memo } from 'react'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { MediaButtonControls } from '@components/shared/media-button-controls'
import { Modal } from '@components/shared/modal'
import { Slider } from '@components/shared/photo-and-files-slider/slider'
import { usePhotoAndFilesSlider } from '@components/shared/photo-and-files-slider/use-photo-and-files-slider'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './image-modal.style'

import { Comment } from './comment'
import { ShowPreviews } from './show-previews'

interface ImageModalProps {
  files: UploadFileType[]
  currentFileIndex: number
  onCurrentFileIndex: (index: number) => void
  openModal: boolean
  onOpenModal: () => void
  photosTitles?: string[]
  photosComments?: string[]
  showPreviews?: boolean
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  isRequestResult?: boolean
  onChangeImagesForLoad?: (array: UploadFileType[]) => void
}

export const ImageModal: FC<ImageModalProps> = memo(props => {
  const {
    files,
    currentFileIndex,
    onCurrentFileIndex,
    openModal,
    onOpenModal,
    photosTitles,
    photosComments,
    showPreviews,
    isEditable,
    withoutMakeMainImage,
    isRequestResult = false,
    onChangeImagesForLoad,
  } = props

  const { classes: styles } = useStyles()

  if (!openModal) {
    return null
  }

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
      openModal={openModal}
      setOpenModal={() => {
        onOpenModal()
        onCurrentFileIndex(mediaFileIndex)
        updateImagesForLoad()
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

          <MediaButtonControls
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

      <ZoomModal
        mediaFiles={mediaFiles}
        currentMediaFileIndex={mediaFileIndex}
        openModal={openImageZoomModal}
        setOpenModal={onOpenImageZoomModal}
        setCurrentMediaFileIndex={setMediaFileIndex}
      />

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
