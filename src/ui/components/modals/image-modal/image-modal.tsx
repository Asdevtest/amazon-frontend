import { FC, memo } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Slider } from '@components/shared/photo-and-files-slider/slider'
import { usePhotoAndFilesSlider } from '@components/shared/photo-and-files-slider/use-photo-and-files-slider'
import { VideoPlayer } from '@components/shared/video-player'

import { checkIsVideoLink } from '@utils/checks'
import { getShortenStringIfLongerThanCount } from '@utils/text'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './image-modal.styles'

import { ButtonControls } from './button-controls'

interface Props {
  isOpenModal: boolean
  imageList: Array<string | IUploadFile>
  currentImageIndex: number
  handleOpenModal: VoidFunction
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
        {showPreviews && (
          <div className={styles.imagesList}>
            {photos?.map((photo, index) => {
              const currentPhoto = typeof photo === 'string' ? photo : photo?.data_url
              const isVideoType = checkIsVideoLink(typeof photo === 'string' ? photo : photo?.file?.name)

              return (
                <div
                  key={index}
                  className={cx(styles.imagesListItem, {
                    [styles.imagesListItemActive]: index === photoIndex,
                  })}
                  onClick={() => {
                    setPhotoIndex(index)
                    setIsPlaying(false)
                  }}
                >
                  {isVideoType ? (
                    <div className={styles.preloaderContainer}>
                      <VideoPlayer videoSource={currentPhoto} height="74px" />
                      <div className={styles.preloader}>
                        <PlayCircleFilledWhiteOutlinedIcon className={styles.preloaderIcon} />
                      </div>
                    </div>
                  ) : (
                    <img src={currentPhoto} alt={`Photo ${photoIndex}`} />
                  )}

                  {photosTitles?.[index] && (
                    <p className={cx(styles.imagesListItemTitle, styles.shortText)}>{photosTitles?.[index]}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}

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

          <div className={styles.controls}>
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
