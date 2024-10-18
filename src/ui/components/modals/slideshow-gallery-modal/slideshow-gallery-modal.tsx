import { FC, memo } from 'react'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Gallery } from '@components/shared/slideshow-gallery/components'

import { useStyles } from './slideshow-gallery-modal.style'

import { Comment } from './comment'
import { MediaButtonControls } from './media-button-controls'
import { SlideshowGalleryModalProps } from './slideshow-gallery-modal.type'
import { Title } from './title'
import { useSlideshowGalleryModal } from './use-slideshow-gallery-modal'

export const SlideshowGalleryModal: FC<SlideshowGalleryModalProps> = memo(props => {
  const { onCurrentFileIndex, openModal, onOpenModal, isEditable, withoutMakeMainImage } = props

  const { classes: styles } = useStyles()

  const {
    mediaFiles,
    commentsByPerformer,
    commentsByClient,
    fileIndex,
    setFileIndex,

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
    onDownloadFiles,
    updateImagesForLoad,
  } = useSlideshowGalleryModal(props)

  return (
    <Modal
      openModal={openModal}
      setOpenModal={() => {
        onOpenModal()
        onCurrentFileIndex?.(fileIndex)
        updateImagesForLoad(mediaFiles)
      }}
    >
      <div className={styles.wrapper}>
        {commentsByPerformer?.[fileIndex] ? <Title text={commentsByPerformer?.[fileIndex]} /> : null}

        <Gallery
          isModalSize
          leftPreviews
          mediaFiles={mediaFiles}
          currentMediaFileIndex={fileIndex}
          isTransitioning={isTransitioning}
          setCurrentMediaFileIndex={setFileIndex}
          setIsTransitioning={setIsTransitioning}
          onOpenImageModal={onOpenImageZoomModal}
        />

        {commentsByClient?.[fileIndex] ? <Comment text={commentsByClient?.[fileIndex]} /> : null}

        <MediaButtonControls
          isEditable={isEditable}
          mediaFile={mediaFiles?.[fileIndex]}
          mediaFileIndex={fileIndex}
          withoutMakeMainImage={withoutMakeMainImage}
          onMakeMainFile={onMakeMainFile}
          onImageEditToggle={onOpenImageEditModal}
          onUploadFile={onUploadFile}
          onRemoveFile={onRemoveFile}
          onDownloadFile={onDownloadFile}
          onDownloadFiles={onDownloadFiles}
          onOpenImageZoomModal={onOpenImageZoomModal}
        />
      </div>

      {openImageZoomModal ? (
        <ZoomModal
          mediaFiles={mediaFiles}
          currentMediaFileIndex={fileIndex}
          openModal={openImageZoomModal}
          setOpenModal={onOpenImageZoomModal}
          setCurrentMediaFileIndex={setFileIndex}
        />
      ) : null}

      <Modal openModal={openImageEditModal} setOpenModal={onOpenImageEditModal}>
        <ImageEditForm item={mediaFiles?.[fileIndex]} setOpenModal={onOpenImageEditModal} onSave={onEditRotateFile} />
      </Modal>
    </Modal>
  )
})
