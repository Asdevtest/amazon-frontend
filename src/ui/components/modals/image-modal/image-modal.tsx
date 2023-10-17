import { observer } from 'mobx-react'
import { FC } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { useImageModalStyles } from '@components/modals/image-modal/image-modal.styles'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Modal } from '@components/shared/modal'
import { Slider } from '@components/shared/photo-and-files-slider/slider'
import { usePhotoAndFilesSlider } from '@components/shared/photo-and-files-slider/use-photo-and-files-slider'
import { VideoPlayer } from '@components/shared/video-player'

import { checkIsVideoLink } from '@utils/checks'
import { getShortenStringIfLongerThanCount } from '@utils/text'

import { IUploadFile } from '@typings/upload-file'

import { ButtonControls } from './button-controls'

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
        missClickModalOn={undefined}
        isWarning={false}
        dialogContextClassName={styles.modalContainer}
      >
        <div className={styles.wrapper}>
          {showPreviews && (
            <div className={styles.imagesList}>
              {photos?.map((photo, index) => {
                const currentPhoto = typeof photo === 'string' ? photo : photo?.data_url
                const isVideoType = checkIsVideoLink(currentPhoto)

                return (
                  <div
                    key={index}
                    className={cx(styles.imagesListItem, {
                      [styles.imagesListItemActive]: index === photoIndex,
                    })}
                    onClick={() => setPhotoIndex(index)}
                  >
                    {isVideoType ? (
                      <div className={styles.preloaderContainer}>
                        <VideoPlayer videoSource={currentPhoto} />
                        <div className={styles.preloader}>
                          <PlayCircleFilledWhiteOutlinedIcon className={styles.preloaderIcon} />
                        </div>
                      </div>
                    ) : (
                      <img src={currentPhoto} alt={`Photo ${photoIndex}`} />
                    )}

                    {photosTitles?.length && (
                      <p className={cx(styles.imagesListItemTitle, styles.shortText)}>{photosTitles?.[photoIndex]}</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div className={styles.body}>
            {photosTitles?.length && <p className={styles.title}>{photosTitles?.[photoIndex]}</p>}

            <Slider
              controls
              customSlideHeight={500}
              slides={photos}
              currentIndex={photoIndex}
              setCurrentIndex={setPhotoIndex}
            />

            {photosComments?.length && (
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
            item={photos?.[photoIndex]}
            setOpenModal={onOpenImageEditModal}
            onSave={onClickEditImageSubmit}
          />
        </Modal>
      </Modal>
    )
  },
)
