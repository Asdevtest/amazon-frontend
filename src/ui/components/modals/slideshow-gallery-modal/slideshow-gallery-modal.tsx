import { FC, memo } from 'react'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Gallery } from '@components/shared/slideshow-gallery/components'

import { useStyles } from './slideshow-gallery-modal.style'

import { ButtonControls, Comment, Title } from './components'
import { SlideshowGalleryModalProps } from './slideshow-gallery-modal.type'
import { useSlideshowGalleryModal } from './use-slideshow-gallery-modal'

export const SlideshowGalleryModal: FC<SlideshowGalleryModalProps> = memo(props => {
  const { onCurrentFileIndex, isOpenModal, onOpenModal, isEditable, withoutMakeMainImage } = props

  const { classes: styles } = useStyles()

  const {
    mediaFiles,
    comments,
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
    updateImagesForLoad,
  } = useSlideshowGalleryModal(props)

  return (
    <Modal
      openModal={isOpenModal}
      setOpenModal={() => {
        onOpenModal()
        onCurrentFileIndex(fileIndex)
        updateImagesForLoad()
      }}
    >
      <div className={styles.wrapper}>
        {comments?.[fileIndex] ? <Title text={comments?.[fileIndex]} /> : null}

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

        <ButtonControls
          isEditable={isEditable}
          mediaFile={mediaFiles?.[fileIndex]}
          mediaFileIndex={fileIndex}
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
          currentMediaFileIndex={fileIndex}
          isOpenModal={openImageZoomModal}
          setIsOpenModal={onOpenImageZoomModal}
          setCurrentMediaFileIndex={setFileIndex}
        />
      )}

      <Modal openModal={openImageEditModal} setOpenModal={onOpenImageEditModal}>
        <ImageEditForm item={mediaFiles?.[fileIndex]} setOpenModal={onOpenImageEditModal} onSave={onEditRotateFile} />
      </Modal>
    </Modal>
  )
})
