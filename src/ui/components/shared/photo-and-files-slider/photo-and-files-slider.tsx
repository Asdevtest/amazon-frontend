import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'

import { t } from '@utils/translations'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './photo-and-files-slider.style'

import { NoDocumentIcon, NoPhotoIcon } from '../svg-icons'

import { Slider } from './slider'
import { WIDTH_INCREASE_FACTOR } from './slider/slider.constants'
import { usePhotoAndFilesSlider } from './use-photo-and-files-slider'

interface Props {
  files: Array<string | IUploadFile>
  column?: boolean
  withoutPhotos?: boolean
  withoutFiles?: boolean
  withAllFiles?: boolean
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  alignLeft?: boolean
  alignRight?: boolean
  isHideCounter?: boolean
  customGap?: number
  customSlideHeight?: number
  showPreviews?: boolean
  isEditable?: boolean
  photosTitles?: string[]
  photosComments?: string[]
  withoutMakeMainImage?: boolean
  mainClasses?: string
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void
}

/**
 * Custom slider with split into photos and documents(files) and display them in 2 slider format.
 *
 * @param {Array<string>} files - takes an array of files(strings) and filters them for photos and documents.
 * @param {Boolean} column - changes orientation to vertical.
 * @param {Boolean} withoutPhotos - removes the photo block.
 * @param {Boolean} withoutFiles - removes the document(file) block.
 * @param {Boolean} withAllFiles - display all photos and files in one slider.
 * @param {Boolean} smallSlider - slider size for use in tables.
 * @param {Boolean} mediumSlider - slider size is bigger than the standard slider size.
 * @param {Boolean} bigSlider- biggest slider size
 * @param {Boolean} alignLeft - shifting slider content to the left in a row.
 * @param {Boolean} alignRight - shifting slider content to the right in a row.
 * @param {Boolean} isHideCounter - removes the line with the number of slides.
 * @param {Number} customGap - custom gap between photo and document slider.
 * @param {Number} customSlideHeight - custom height to resize the slider to the desired size.
 * @param {Boolean} showPreviews - adds a photo preview on the left side of the photo modal window.
 * @param {Boolean} isEditable - adds the ability to work with photos in the photo modal window (adds a panel with buttons).
 * @param {Array<string>} photosTitles - takes an array of strings with names for photos.
 * @param {Array<string>} photosComments - takes an array of strings with comments for photos.
 * @param {Boolean} withoutMakeMainImage - removes the ability to select the main photo in the photo modal window.
 * @param {String} mainClasses - custom styles for the main wrapper.
 * @param {Function} onChangeImagesForLoad - method to change the array of transferred files from outside the component.
 * @returns {HTMLElement} return custom slider for photos and documents.
 */
export const PhotoAndFilesSlider: FC<Props> = memo(
  ({
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
  }) => {
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
  },
)
