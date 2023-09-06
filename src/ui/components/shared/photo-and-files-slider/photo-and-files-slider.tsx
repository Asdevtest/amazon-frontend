import { cx } from '@emotion/css'
import { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ImageModal, ImageObjectType } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { checkIsDocumentLink, checkIsImageLink, checkIsNotValidLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './photo-and-files-slider.styles'

import { NoDocumentIcon, NoPhotoIcon } from '../svg-icons'

import { UploadFile } from './photo-and-files-slider.types'
import { Slider } from './slider'
import { WIDTH_INCREASE_FACTOR } from './slider/slider.constants'

interface Props {
  files: Array<string | UploadFile> | undefined | null
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  alignLeft?: boolean
  alignRight?: boolean
  isHideCounter?: boolean
  customSlideHeight?: number
  column?: boolean
  withoutPhotos?: boolean
  withoutFiles?: boolean
  customGap?: number
  showPreviews?: boolean
  isEditable?: boolean
  imagesTitles?: string[]
  withoutMakeMainImage?: boolean
  mainClasses?: string
  onChangeImagesForLoad?: (array: Array<string | UploadFile>) => void
}

/**
 * Custom slider with split into photos and documents(files) and display them in 2 slider format.
 *
 * @param {Array<string>} files - takes an array of files(strings) and filters them for photos and documents.
 * @param {Boolean} column - changes orientation to vertical.
 * @param {Boolean} withoutPhotos - removes the photo block.
 * @param {Boolean} withoutFiles - removes the document(file) block.
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
 * @param {Function} onChangeImagesForLoad - method to change the array of transferred files from outside the component.
 * @param {String} mainClasses - custom styles for the main wrapper .
 * @returns {HTMLElement} return custom slider for photos and documents.
 */
export const PhotoAndFilesSlider: FC<Props> = ({
  files,
  column = false,
  withoutPhotos = false,
  withoutFiles = false,
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
  const { classes: classNames } = useClassNames()

  const [imageEditOpen, setImageEditOpen] = useState(false)
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const handleImageEditToggle = () => setImageEditOpen(!imageEditOpen)
  const handlePhotosModalToggle = () => setShowPhotosModal(!showPhotosModal)

  const documents = (files || []).filter(el => typeof el === 'string' && checkIsDocumentLink(el))

  const [photos, setPhotos] = useState<Array<string | UploadFile>>([])
  const [photoIndex, setPhotoIndex] = useState(0)
  const [fileIndex, setFileIndex] = useState(0)

  useEffect(() => {
    const photoFiltering = (files || []).reduce((result: Array<string | UploadFile>, el) => {
      const isImage = checkIsImageLink(typeof el === 'string' ? el : '')
      const isDocument = checkIsDocumentLink(typeof el === 'string' ? el : '')
      const isNotValid = checkIsNotValidLink(typeof el === 'string' ? el : '')

      if (isNotValid) {
        return result
      } else if (isImage) {
        result.push(el)
      } else if (!isImage && !isDocument) {
        if (typeof el === 'string') {
          result.push(getAmazonImageUrl(el, true))
        } else if ('data_url' in el && el.data_url.length > 0) {
          result.push(el)
        } else {
          result.push('/assets/icons/file.png')
        }
      }

      return result
    }, [])

    setPhotos(photoFiltering)
  }, [files])

  const filteredImagesTitles = files?.length ? (imagesTitles || []).filter((el, i) => checkIsImageLink(files[i])) : []

  const updateImagesForLoad = (newPhotos: Array<string | UploadFile>) => {
    if (onChangeImagesForLoad) {
      onChangeImagesForLoad([...documents, ...newPhotos])
    }
  }

  const onClickEditImageSubmit = (image: string) => {
    const editingPhotos = photos.map((slide, index) => (index === photoIndex ? image : slide))
    setPhotos(editingPhotos)
    updateImagesForLoad(editingPhotos)
  }

  const onClickRemoveImageObj = (imageIndex: number) => {
    const filteringPhotos = photos.filter((_, index) => index !== imageIndex)
    setPhotos(filteringPhotos)
    updateImagesForLoad(filteringPhotos)

    if (!filteringPhotos.length) {
      handlePhotosModalToggle
    }
  }

  const onUploadFile = async (event: ChangeEvent<HTMLInputElement>, imageIndex: number) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    event.preventDefault()

    const filesArr: File[] = Array.from(event.target.files)
    const readyFilesArr = filesArr.map((el: File) => ({
      data_url: URL.createObjectURL(el),
      file: new File([el], el.name?.replace(/ /g, ''), {
        type: el.type,
        lastModified: el.lastModified,
      }),
    }))
    const editingPhotos = photos.map((photo, index) => (index === imageIndex ? readyFilesArr[0] : photo))

    setPhotos(editingPhotos)
    updateImagesForLoad(editingPhotos)
  }

  const onClickMakeMainImageObj = (imageIndex: number, image: string | ImageObjectType) => {
    const selectedImage = image as string
    const filteringPhotos = photos.filter((_, index) => index !== imageIndex)
    const editingPhotos = [selectedImage, ...filteringPhotos]

    setPhotos(editingPhotos)
    updateImagesForLoad(editingPhotos)
    setPhotoIndex(0)
  }

  const onClickEditImage = () => {
    setImageEditOpen(!imageEditOpen)
  }

  const imageModalControls = (imageIndex: number, image: ImageObjectType | string): ReactNode => (
    <>
      {!withoutMakeMainImage && (
        <>
          {imageIndex === 0 ? (
            <div className={cx(classNames.imagesModalBtn, classNames.activeMainIcon)}>
              <StarOutlinedIcon />
            </div>
          ) : (
            <Button
              disabled={imageIndex === 0}
              className={classNames.imagesModalBtn}
              onClick={() => {
                if (typeof image === 'string') {
                  onClickMakeMainImageObj(imageIndex, image)
                } else {
                  onClickMakeMainImageObj(imageIndex, image.url)
                }
              }}
            >
              <StarOutlinedIcon />
            </Button>
          )}
        </>
      )}

      <Button className={classNames.imagesModalBtn} onClick={() => onClickEditImage()}>
        <ModeOutlinedIcon />
      </Button>

      <Button className={classNames.imagesModalBtn}>
        <AutorenewIcon />

        <input
          type="file"
          className={classNames.pasteInput}
          defaultValue={''}
          onChange={event => onUploadFile(event, imageIndex)}
        />
      </Button>

      <Button danger className={classNames.imagesModalBtn} onClick={() => onClickRemoveImageObj(imageIndex)}>
        <DeleteOutlineOutlinedIcon />
      </Button>
    </>
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
          {!withoutPhotos ? (
            <Slider
              slides={photos}
              currentIndex={photoIndex}
              setCurrentIndex={setPhotoIndex}
              smallSlider={smallSlider}
              mediumSlider={mediumSlider}
              bigSlider={bigSlider}
              alignLeft={alignLeft}
              alignRight={alignRight}
              customSlideHeight={customSlideHeight}
              isHideCounter={isHideCounter}
              onPhotosModalToggle={handlePhotosModalToggle}
            />
          ) : null}

          {!withoutFiles ? (
            <Slider
              slides={documents}
              currentIndex={fileIndex}
              setCurrentIndex={setFileIndex}
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
        </div>
      ) : (
        <div className={classNames.noFileWrapper}>
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

      <Modal openModal={imageEditOpen} setOpenModal={handleImageEditToggle}>
        <ImageEditForm item={photos[photoIndex]} setOpenModal={handleImageEditToggle} onSave={onClickEditImageSubmit} />
      </Modal>

      <ImageModal
        showPreviews={showPreviews}
        isOpenModal={showPhotosModal}
        handleOpenModal={handlePhotosModalToggle}
        imageList={photos.map((photo, index) => ({
          url: typeof photo === 'string' ? photo : photo.data_url,
          comment: filteredImagesTitles[index],
        }))}
        currentImageIndex={photoIndex}
        handleCurrentImageIndex={imgIndex => setPhotoIndex(imgIndex)}
        controls={isEditable ? imageModalControls : undefined}
      />
    </>
  )
}
