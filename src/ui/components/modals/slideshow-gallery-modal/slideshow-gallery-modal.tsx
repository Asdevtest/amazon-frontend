import { FC, memo } from 'react'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Gallery } from '@components/shared/slideshow-gallery/components'

import { UploadFileType } from '@typings/upload-file'

import { useStyles } from './slideshow-gallery-modal.style'

import { ButtonControls, Comment, Title } from './components'
import { useSlideshowGalleryModal } from './use-slideshow-gallery-modal'

interface SlideshowGalleryModalProps {
  files: UploadFileType[]
  currentFileIndex: number
  isOpenModal: boolean
  onCurrentFileIndex: (index: number) => void
  onOpenModal: () => void
  withComments?: boolean
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onChangeImagesForLoad?: (array: UploadFileType[]) => void
}

export const SlideshowGalleryModal: FC<SlideshowGalleryModalProps> = memo(props => {
  const {
    files,
    currentFileIndex,
    onCurrentFileIndex,
    isOpenModal,
    onOpenModal,
    isEditable,
    withoutMakeMainImage,
    onChangeImagesForLoad,
  } = props

  const { classes: styles } = useStyles()

  const {
    mediaFiles,
    mediaFileIndex,
    setMediaFileIndex,

    isTransitioning,
    setIsTransitioning,

    openImageEditModal,
    onOpenImageEditModal,
    openImageZoomModal,
    onOpenImageZoomModal,

    onMakeMainFile,
    onUploadFile,
    onRemoveFile,
    onEditRotateFile,
    onDownloadFile,
    updateImagesForLoad,
  } = useSlideshowGalleryModal(files, onChangeImagesForLoad, currentFileIndex)

  return (
    <Modal
      openModal={isOpenModal}
      setOpenModal={() => {
        onOpenModal()
        onCurrentFileIndex(mediaFileIndex)
        updateImagesForLoad()
      }}
    >
      <div className={styles.wrapper}>
        <Title />

        <Gallery
          isModalSize
          leftPreviews
          mediaFiles={mediaFiles}
          currentMediaFileIndex={mediaFileIndex}
          isTransitioning={isTransitioning}
          setCurrentMediaFileIndex={setMediaFileIndex}
          setIsTransitioning={setIsTransitioning}
          onOpenImageModal={onOpenImageZoomModal}
        />

        <Comment />

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
