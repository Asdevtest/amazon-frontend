import { observer } from 'mobx-react'
import { FC, ReactNode } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal, ImageObjectType } from '@components/modals/image-modal/image-modal'

import { t } from '@utils/translations'

import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from './photo-and-files-slider.styles'

import { NoDocumentIcon, NoPhotoIcon } from '../svg-icons'

import { ButtonControls } from './button-controls'
import { Slider } from './slider'
import { WIDTH_INCREASE_FACTOR } from './slider/slider.constants'
import { usePhotoAndFilesSlider } from './use-photo-and-files-slider'

interface Props {
  files: Array<string | IUploadFile> | undefined | null
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
  imagesTitles?: string[]
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
 * @param {Array<string>} imagesTitles - takes an array of strings with names for photos.
 * @param {Boolean} withoutMakeMainImage - removes the ability to select the main photo in the photo modal window.
 * @param {String} mainClasses - custom styles for the main wrapper.
 * @param {Function} onChangeImagesForLoad - method to change the array of transferred files from outside the component.
 * @returns {HTMLElement} return custom slider for photos and documents.
 */
export const PhotoAndFilesSlider: FC<Props> = observer(
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
    imagesTitles,
    withoutMakeMainImage = false,
    mainClasses,
    onChangeImagesForLoad,
  }) => {
    const { classes: classNames, cx } = useClassNames()
    const {
      showPhotosModal,
      onPhotosModalToggle,

      photos,
      photoIndex,
      prevPhotoIndex,
      setPhotoIndex,
      setPrevPhotoIndex,

      documents,
      documentIndex,
      setDocumentIndex,

      onClickMakeMainImageObj,
      onUploadFile,
      onClickRemoveImageObj,
      onClickEditImageSubmit,
    } = usePhotoAndFilesSlider(files, onChangeImagesForLoad)

    const imageModalControls = (
      imageIndex: number,
      image: ImageObjectType | string,
      onImageEditToggle?: VoidFunction,
    ): ReactNode => (
      <ButtonControls
        imageIndex={imageIndex}
        image={image}
        withoutMakeMainImage={withoutMakeMainImage}
        onClickMakeMainImageObj={onClickMakeMainImageObj}
        onImageEditToggle={onImageEditToggle}
        onUploadFile={onUploadFile}
        onClickRemoveImageObj={onClickRemoveImageObj}
      />
    )

    const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR

    return (
      <>
        {files?.length ? (
          <div
            className={cx(
              classNames.mainWrapper,
              {
                [classNames.column]: column,
                [classNames.wrapperAlignLeft]: alignLeft,
                [classNames.wrapperAlignRight]: alignRight,
              },
              mainClasses,
            )}
            style={{ gap: customGap }}
          >
            {!withoutPhotos && !withAllFiles ? (
              <Slider
                slides={photos}
                currentIndex={showPhotosModal ? prevPhotoIndex : photoIndex}
                setCurrentIndex={setPhotoIndex}
                setPrevPhotoIndex={setPrevPhotoIndex}
                smallSlider={smallSlider}
                mediumSlider={mediumSlider}
                bigSlider={bigSlider}
                alignLeft={alignLeft}
                alignRight={alignRight}
                customSlideHeight={customSlideHeight}
                isHideCounter={isHideCounter}
                onPhotosModalToggle={onPhotosModalToggle}
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
                onPhotosModalToggle={onPhotosModalToggle}
              />
            ) : null}
          </div>
        ) : (
          <div className={cx(classNames.noFileWrapper, mainClasses)}>
            <div
              className={cx(classNames.slideWrapper, {
                [classNames.slideSmall]: smallSlider,
                [classNames.slideMedium]: mediumSlider,
                [classNames.slideBig]: bigSlider,
              })}
              style={{ width: customSlideWidth, height: customSlideHeight }}
            >
              {withoutFiles ? (
                <NoPhotoIcon className={classNames.slide} />
              ) : (
                <NoDocumentIcon className={cx(classNames.slide, classNames.slideNoDocuments)} />
              )}
            </div>

            {!isHideCounter ? (
              <p
                className={cx(classNames.text, {
                  [classNames.smallText]: smallSlider,
                  [classNames.mediumText]: mediumSlider,
                  [classNames.bigText]: bigSlider,
                })}
              >
                {withoutFiles ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
              </p>
            ) : null}
          </div>
        )}

        <ImageModal
          showPreviews={showPreviews}
          isOpenModal={showPhotosModal}
          handleOpenModal={onPhotosModalToggle}
          imageList={photos.map((photo, index) => ({
            url: typeof photo === 'string' ? photo : photo.data_url, // не работает изменить-сделать главнойб добавить-сделать главное из-за того, что в модалке я передаю картинку(добаленную или измененную) и передаю ее урл, а не всю картинку, нужно расширить тип коммент и сам файл: string|FILE...
            comment: (imagesTitles ?? [])[index],
          }))}
          currentImageIndex={photoIndex}
          handleCurrentImageIndex={setPhotoIndex}
          controls={isEditable ? imageModalControls : undefined}
          onClickEditImageSubmit={onClickEditImageSubmit}
        />
      </>
    )
  },
)
