import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/upload-file'

import { useStyles } from './photo-and-files-slider.style'

import { NoDocumentIcon, NoPhotoIcon } from '../svg-icons'

import { Slider } from './slider'
import { WIDTH_INCREASE_FACTOR } from './slider/slider.constants'
import { usePhotoAndFilesSlider } from './use-photo-and-files-slider'

interface PhotoAndFilesSliderProps {
  files: UploadFileType[]
  column?: boolean
  withoutPhotos?: boolean
  withoutFiles?: boolean
  withAllFiles?: boolean
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  alignLeft?: boolean
  alignRight?: boolean
  smallPhotos?: boolean
  isHideCounter?: boolean
  customGap?: number
  customSlideHeight?: number
  showPreviews?: boolean
  isEditable?: boolean
  photosTitles?: string[]
  photosComments?: string[]
  withoutMakeMainImage?: boolean
  mainClasses?: string
  onChangeImagesForLoad?: (array: UploadFileType[]) => void
}

/**
 * Custom slider with split into photos and documents(files) and display them in 2 slider format.
 *
 * @param {Array<string>} files - Takes an array of files(strings) and filters them for photos and documents.
 * @param {Boolean} column - Changes orientation to vertical.
 * @param {Boolean} withoutPhotos - Removes the photo block.
 * @param {Boolean} withoutFiles - Removes the document(file) block.
 * @param {Boolean} withAllFiles - Display all photos and files in one slider.
 * @param {Boolean} smallSlider - Slider size for use in tables.
 * @param {Boolean} mediumSlider - Slider size is bigger than the standard slider size.
 * @param {Boolean} bigSlider- Biggest slider size
 * @param {Boolean} alignLeft - Shifting slider content to the left in a row.
 * @param {Boolean} alignRight - Shifting slider content to the right in a row.
 * @param {Boolean} smallPhotos - Adds postfix '.preview.webp' to photos to reduce their quality.
 * @param {Boolean} isHideCounter - Removes the line with the number of slides.
 * @param {Number} customGap - Custom gap between photo and document slider.
 * @param {Number} customSlideHeight - Custom height to resize the slider to the desired size.
 * @param {Boolean} showPreviews - Adds a photo preview on the left side of the photo modal window.
 * @param {Boolean} isEditable - Adds the ability to work with photos in the photo modal window (adds a panel with buttons).
 * @param {Array<string>} photosTitles - Takes an array of strings with names for photos.
 * @param {Array<string>} photosComments - Takes an array of strings with comments for photos.
 * @param {Boolean} withoutMakeMainImage - Removes the ability to select the main photo in the photo modal window.
 * @param {String} mainClasses - Custom styles for the main wrapper.
 * @param {Function} onChangeImagesForLoad - Method to change the array of transferred files from outside the component.
 * @returns {HTMLElement} Return custom slider for photos and documents.
 */
export const PhotoAndFilesSlider: FC<PhotoAndFilesSliderProps> = memo(props => {
  const {
    files,
    column = false,
    withoutPhotos = false,
    withoutFiles = false,
    withAllFiles = false,
    smallSlider = false,
    mediumSlider = false,
    bigSlider = false,
    alignLeft = false,
    alignRight = false,
    smallPhotos = false,
    isHideCounter = false,
    customGap,
    customSlideHeight,
    showPreviews = false,
    isEditable = false,
    photosTitles,
    photosComments,
    withoutMakeMainImage = false,
    mainClasses,
    onChangeImagesForLoad,
  } = props

  const { classes: styles, cx } = useStyles()
  const {
    openImageModal,
    onOpenImageModal,

    mediaFiles,
    mediaFileIndex,
    setMediaFileIndex,

    documents,
    documentIndex,
    setDocumentIndex,
  } = usePhotoAndFilesSlider(files, onChangeImagesForLoad)

  const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR

  return (
    <>
      {files?.length ? (
        <div
          className={cx(
            styles.mainWrapper,
            {
              [styles.column]: column,
              [styles.wrapperAlignLeft]: alignLeft,
              [styles.wrapperAlignRight]: alignRight,
            },
            mainClasses,
          )}
          style={{ gap: customGap }}
        >
          {!withoutPhotos && !withAllFiles ? (
            <Slider
              slides={mediaFiles}
              currentIndex={mediaFileIndex}
              setCurrentIndex={setMediaFileIndex}
              smallSlider={smallSlider}
              mediumSlider={mediumSlider}
              bigSlider={bigSlider}
              alignLeft={alignLeft}
              alignRight={alignRight}
              customSlideHeight={customSlideHeight}
              isHideCounter={isHideCounter}
              smallPhotos={smallPhotos}
              onPhotosModalToggle={onOpenImageModal}
            />
          ) : null}

          {!withoutFiles && !withAllFiles ? (
            <Slider
              slides={documents}
              currentIndex={documentIndex}
              setCurrentIndex={setDocumentIndex}
              smallSlider={smallSlider}
              mediumSlider={mediumSlider}
              bigSlider={bigSlider}
              alignLeft={alignLeft}
              alignRight={alignRight}
              customSlideHeight={customSlideHeight}
              isHideCounter={isHideCounter}
              withoutFiles={!withoutFiles}
            />
          ) : null}

          {withAllFiles ? (
            <Slider
              slides={files}
              currentIndex={documentIndex}
              setCurrentIndex={setDocumentIndex}
              smallSlider={smallSlider}
              mediumSlider={mediumSlider}
              bigSlider={bigSlider}
              alignLeft={alignLeft}
              alignRight={alignRight}
              customSlideHeight={customSlideHeight}
              smallPhotos={smallPhotos}
              isHideCounter={isHideCounter}
              onPhotosModalToggle={onOpenImageModal}
            />
          ) : null}
        </div>
      ) : (
        <div className={cx(styles.noFileWrapper, mainClasses)}>
          <div
            className={cx(styles.slideWrapper, {
              [styles.slideSmall]: smallSlider,
              [styles.slideMedium]: mediumSlider,
              [styles.slideBig]: bigSlider,
            })}
            style={{ width: customSlideWidth, height: customSlideHeight }}
          >
            {withoutFiles ? (
              <NoPhotoIcon className={styles.slide} />
            ) : (
              <NoDocumentIcon className={cx(styles.slide, styles.slideNoDocuments)} />
            )}
          </div>

          {!isHideCounter ? (
            <p
              className={cx(styles.text, {
                [styles.smallText]: smallSlider,
                [styles.mediumText]: mediumSlider,
                [styles.bigText]: bigSlider,
              })}
            >
              {withoutFiles ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
            </p>
          ) : null}
        </div>
      )}

      {openImageModal && (
        <ImageModal
          files={mediaFiles}
          currentFileIndex={mediaFileIndex}
          handleCurrentFileIndex={setMediaFileIndex}
          isOpenModal={openImageModal}
          handleOpenModal={onOpenImageModal}
          photosTitles={photosTitles}
          photosComments={photosComments}
          showPreviews={showPreviews}
          isEditable={isEditable}
          withoutMakeMainImage={withoutMakeMainImage}
          onChangeImagesForLoad={onChangeImagesForLoad}
        />
      )}
    </>
  )
})
