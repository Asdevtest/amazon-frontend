import { cx } from '@emotion/css'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Avatar, Link, Typography } from '@mui/material'

import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { BigImagesModal } from '@components/modals/big-images-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { NoDocumentIcon, NoPhotoIcon } from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { checkAndMakeAbsoluteUrl, shortenDocumentString } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './photo-and-files-carousel.styles'
import { openPdfFile } from '@utils/open-pdf-file/open-pdf-file'
import { CustomSlider } from '../custom-slider'

export const PhotoAndFilesCarousel = props => {
  const { classes: classNames } = useClassNames()
  const {
    files,
    width,
    small = false,
    direction = 'row',
    notToShowEmpty = false,
    withoutPhotos,
    whithoutFiles,
    imagesTitles = [],

    imagesForLoad,
    onChangeImagesForLoad,
    isEditable,
    withoutMakeMainImage,
  } = props

  const [imageEditOpen, setImageEditOpen] = useState(false)
  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyFiles = files?.length ? files.filter(el => !checkIsImageLink(el?.file?.name || el)) : []

  const filteredImagesTitles = imagesTitles.length
    ? imagesTitles.filter((el, i) => checkIsImageLink(files[i]?.file?.name || files[i]))
    : []

  const notEmptyPhotos = files?.length ? files.filter(el => checkIsImageLink(el?.file?.name || el)) : []

  const onClickRemoveImageObj = imageIndex => {
    const newArr = imagesForLoad.filter((el, i) => i !== imageIndex)

    onChangeImagesForLoad(newArr)
    setBigImagesOptions(() => ({
      ...bigImagesOptions,
      imgIndex: bigImagesOptions.imgIndex - 1 < 0 ? 0 : bigImagesOptions.imgIndex - 1,
      images: newArr,
    }))

    if (!newArr.length) {
      setShowPhotosModal(false)
    }
  }

  const onUploadFile = imageIndex => async evt => {
    if (evt.target.files.length === 0) {
      return
    } else {
      const filesArr = Array.from(evt.target.files)

      evt.preventDefault()

      const readyFilesArr = filesArr.map(el => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el.name?.replace(/ /g, ''), {
          type: el.type,
          lastModified: el.lastModified,
        }),
      }))

      onChangeImagesForLoad(imagesForLoad.map((el, i) => (i === imageIndex ? readyFilesArr[0] : el)))
      setBigImagesOptions(() => ({
        ...bigImagesOptions,
        images: imagesForLoad.map((el, i) => (i === imageIndex ? readyFilesArr[0] : el)),
      }))
    }
  }

  const onClickMakeMainImageObj = (imageIndex, image) => {
    onChangeImagesForLoad([image, ...imagesForLoad.filter((el, i) => i !== imageIndex)])
    setBigImagesOptions(() => ({
      ...bigImagesOptions,
      imgIndex: 0,
      images: [image, ...imagesForLoad.filter((el, i) => i !== imageIndex)],
    }))
  }

  const onClickEditImage = () => {
    setImageEditOpen(!imageEditOpen)
  }

  const onClickEditImageSubmit = image => {
    onChangeImagesForLoad(imagesForLoad.map((el, i) => (i === bigImagesOptions.imgIndex ? image : el)))
    setBigImagesOptions(() => ({
      ...bigImagesOptions,
      images: imagesForLoad.map((el, i) => (i === bigImagesOptions.imgIndex ? image : el)),
    }))
  }

  const bigImagesModalControls = (imageIndex, image) => (
    <>
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
                className={cx(classNames.imagesModalBtn)}
                onClick={() => onClickMakeMainImageObj(imageIndex, image)}
              >
                <StarOutlinedIcon />
              </Button>
            )}
          </>
        )}

        <Button className={cx(classNames.imagesModalBtn)} onClick={() => onClickEditImage()}>
          <ModeOutlinedIcon />
        </Button>

        <Button className={cx(classNames.imagesModalBtn)}>
          <AutorenewIcon />
          <input
            type={'file'}
            className={classNames.pasteInput}
            defaultValue={''}
            onChange={onUploadFile(imageIndex)}
          />
        </Button>

        <Button danger className={cx(classNames.imagesModalBtn)} onClick={() => onClickRemoveImageObj(imageIndex)}>
          <DeleteOutlineOutlinedIcon />
        </Button>
      </>
    </>
  )

  return files?.length ? (
    <div
      className={direction === 'column' ? classNames.imagesAndFilesWrapperColumn : classNames.imagesAndFilesWrapper}
      style={{
        width,
        flexDirection: direction === 'column' ? 'column' : 'row',
      }}
    >
      {!withoutPhotos && (
        <>
          {(notToShowEmpty && notEmptyPhotos?.length) || !notToShowEmpty ? (
            <div className={cx(classNames.imagesWrapper, { [classNames.notToShowEmptyWrapper]: notToShowEmpty })}>
              {notEmptyPhotos?.length ? (
                <CustomSlider>
                  {(isEditable
                    ? imagesForLoad.filter(el => checkIsImageLink(el?.file?.name || el))
                    : notEmptyPhotos
                  )?.map((photo, index) => (
                    <div key={index} className={classNames.imageSubWrapper}>
                      <>
                        <Avatar
                          key={index}
                          variant="square"
                          alt={'!'}
                          src={photo?.data_url || photo}
                          className={classNames.image}
                          classes={{ img: small ? classNames.smallImage : classNames.image }}
                          onClick={() => {
                            setShowPhotosModal(!showPhotosModal)

                            setBigImagesOptions({
                              images: (isEditable ? imagesForLoad : files)
                                .filter(el => checkIsImageLink(el?.file?.name || el))
                                .map(img => img?.data_url || img),
                              imgIndex: index,
                            })
                          }}
                        />

                        {filteredImagesTitles[index] && (
                          <Typography className={classNames.imageTitle}>{filteredImagesTitles[index]}</Typography>
                        )}
                      </>
                    </div>
                  ))}
                </CustomSlider>
              ) : (
                <div className={classNames.emptyIconWrapper}>
                  <div className={classNames.emptyWrapper}>
                    <div className={classNames.emptyIcon}>
                      <NoPhotoIcon className={classNames.noPhotoIcon} />
                    </div>

                    <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}

      {!whithoutFiles && (
        <>
          {((notToShowEmpty && notEmptyFiles?.length) || !notToShowEmpty) && (
            <div className={cx(classNames.documentsWrapper, { [classNames.notToShowEmptyWrapper]: notToShowEmpty })}>
              {notEmptyFiles?.length ? (
                <CustomSlider>
                  {notEmptyFiles.map((file, index) =>
                    file?.data_url ? (
                      <div
                        key={index}
                        className={classNames.documentWrapper}
                        onClick={() => file.data_url && openPdfFile(file.data_url)}
                      >
                        <InsertDriveFileIcon color="primary" style={{ width: '40px', height: '40px' }} />
                        <Typography className={classNames.documentTitle}>
                          {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                        </Typography>
                        <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                      </div>
                    ) : (
                      <Link
                        key={index}
                        href={checkAndMakeAbsoluteUrl(file)}
                        className={classNames.documentWrapper}
                        target="__blank"
                      >
                        <InsertDriveFileIcon color="primary" style={{ width: '40px', height: '40px' }} />
                        <Typography className={classNames.documentTitle}>
                          {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                        </Typography>
                        <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                      </Link>
                    ),
                  )}
                </CustomSlider>
              ) : (
                <div className={classNames.emptyIconWrapper}>
                  <div className={classNames.emptyWrapper}>
                    <div className={classNames.emptyIcon}>
                      <NoDocumentIcon className={classNames.noDocumentIcon} />
                    </div>
                    <Typography className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</Typography>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <Modal openModal={imageEditOpen} setOpenModal={() => setImageEditOpen(!imageEditOpen)}>
        <ImageEditForm
          item={bigImagesOptions.images[bigImagesOptions.imgIndex]}
          setOpenModal={() => setImageEditOpen(!imageEditOpen)}
          onSave={onClickEditImageSubmit}
        />
      </Modal>

      <BigImagesModal
        showPreviews
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
        setImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        controls={isEditable ? bigImagesModalControls : undefined}
        getComment={index => filteredImagesTitles[index]}
      />

      {/* <BigImagesModal */}
      {/*   showPreviews */}
      {/*   openModal={showPhotosModal} */}
      {/*   setOpenModal={() => setShowPhotosModal(!showPhotosModal)} */}
      {/*   images={bigImagesOptions.images} */}
      {/*   imgIndex={bigImagesOptions.imgIndex} */}
      {/*   setImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))} */}
      {/*   controls={isEditable ? bigImagesModalControls : undefined} */}
      {/*   getComment={index => filteredImagesTitles[index]} */}
      {/* /> */}
    </div>
  ) : (
    <div className={classNames.emptyIconWrapper}>
      <div className={classNames.emptyWrapper}>
        <div className={classNames.emptyIcon}>
          <NoDocumentIcon className={classNames.noDocumentIcon} />
        </div>
        <Typography className={classNames.noDocumentText}>{t(TranslationKey['No files'])}</Typography>
      </div>
    </div>
  )
}
