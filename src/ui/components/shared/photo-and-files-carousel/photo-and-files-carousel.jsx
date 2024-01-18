import { useState } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Avatar, Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { NoDocumentIcon, NoPhotoIcon } from '@components/shared/svg-icons'

import { checkIsMediaFileLink } from '@utils/checks'
import { openPdfFile } from '@utils/open-pdf-file/open-pdf-file'
import { checkAndMakeAbsoluteUrl, shortenDocumentString } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './photo-and-files-carousel.style'

import { CustomSlider } from '../custom-slider'

export const PhotoAndFilesCarousel = props => {
  const { classes: styles, cx } = useStyles()
  const [imageEditOpen, setImageEditOpen] = useState(false)

  const {
    files,
    width,
    small = false,
    direction = 'row',
    notToShowEmpty = false,
    withoutPhotos,
    withoutFiles,
    imagesTitles = [],
    isHideCounter = false,
    imagesForLoad,
    onChangeImagesForLoad,
    isEditable,
    withoutMakeMainImage,
    customAvatarStyles,
    customImgStyles,
  } = props
  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyFiles = files?.length ? files.filter(el => !checkIsMediaFileLink(el?.file?.name || el)) : []

  const filteredImagesTitles = imagesTitles.length
    ? imagesTitles.filter((el, i) => checkIsMediaFileLink(files[i]?.file?.name || files[i]))
    : []

  const notEmptyPhotos = files?.length ? files.filter(el => checkIsMediaFileLink(el?.file?.name || el)) : []

  const onRemoveFile = imageIndex => {
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
        images: imagesForLoad.map((el, i) => (i === imageIndex ? readyFilesArr[0].data_url : el)),
      }))
    }
  }

  const onMakeMainFile = (imageIndex, image) => {
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

  const onEditRotateFile = image => {
    onChangeImagesForLoad(imagesForLoad.map((el, i) => (i === bigImagesOptions.imgIndex ? image : el)))
    setBigImagesOptions(() => ({
      ...bigImagesOptions,
      images: imagesForLoad.map((el, i) => (i === bigImagesOptions.imgIndex ? image.data_url : el)),
    }))
  }

  const bigImagesModalControls = (imageIndex, image) => (
    <>
      <>
        {!withoutMakeMainImage && (
          <>
            {imageIndex === 0 ? (
              <div className={cx(styles.imagesModalBtn, styles.activeMainIcon)}>
                <StarOutlinedIcon />
              </div>
            ) : (
              <Button
                disabled={imageIndex === 0}
                className={cx(styles.imagesModalBtn)}
                onClick={() => onMakeMainFile(imageIndex, image)}
              >
                <StarOutlinedIcon />
              </Button>
            )}
          </>
        )}

        <Button className={cx(styles.imagesModalBtn)} onClick={() => onClickEditImage()}>
          <ModeOutlinedIcon />
        </Button>

        <Button className={cx(styles.imagesModalBtn)}>
          <AutorenewIcon />
          <input type={'file'} className={styles.pasteInput} defaultValue={''} onChange={onUploadFile(imageIndex)} />
        </Button>

        <Button danger className={cx(styles.imagesModalBtn)} onClick={() => onRemoveFile(imageIndex)}>
          <DeleteOutlineOutlinedIcon />
        </Button>
      </>
    </>
  )

  return files?.length ? (
    <div
      className={direction === 'column' ? styles.imagesAndFilesWrapperColumn : styles.imagesAndFilesWrapper}
      style={{
        width,
        flexDirection: direction === 'column' ? 'column' : 'row',
      }}
    >
      {!withoutPhotos && (
        <>
          {(notToShowEmpty && notEmptyPhotos?.length) || !notToShowEmpty ? (
            <div className={cx(styles.imagesWrapper, { [styles.fullImagesWrapper]: withoutFiles })}>
              {notEmptyPhotos?.length ? (
                <CustomSlider isHideCounter={isHideCounter}>
                  {(isEditable
                    ? imagesForLoad.filter(el => checkIsMediaFileLink(el?.file?.name || el))
                    : notEmptyPhotos
                  )?.map((photo, index) => (
                    <div key={index} className={styles.imageSubWrapper}>
                      <>
                        <Avatar
                          key={index}
                          variant="square"
                          alt={'!'}
                          src={photo?.data_url || photo}
                          classes={{ img: small ? styles.smallImage : styles.image }}
                          imgProps={{ style: customImgStyles }}
                          sx={customAvatarStyles}
                          onClick={() => {
                            setShowPhotosModal(!showPhotosModal)

                            setBigImagesOptions({
                              images: (isEditable ? imagesForLoad : files)
                                .filter(el => checkIsMediaFileLink(el?.file?.name || el))
                                .map(img => img?.data_url || img),
                              imgIndex: index,
                            })
                          }}
                        />

                        {filteredImagesTitles[index] && (
                          <Typography className={styles.imageTitle}>{filteredImagesTitles[index]}</Typography>
                        )}
                      </>
                    </div>
                  ))}
                </CustomSlider>
              ) : (
                <div className={styles.emptyIconWrapper}>
                  <div className={styles.emptyWrapper}>
                    <div className={styles.emptyIcon}>
                      <NoPhotoIcon className={cx(styles.noPhotoIcon, { [styles.noIconSmall]: small })} />
                    </div>

                    <Typography className={styles.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}

      {!withoutFiles && (
        <>
          {((notToShowEmpty && notEmptyFiles?.length) || !notToShowEmpty) && (
            <div className={cx(styles.documentsWrapper, { [styles.notToShowEmptyWrapper]: notToShowEmpty })}>
              {notEmptyFiles?.length ? (
                <CustomSlider isHideCounter={isHideCounter}>
                  {notEmptyFiles.map((file, index) =>
                    file?.data_url ? (
                      <div
                        key={index}
                        className={styles.documentWrapper}
                        onClick={() => file.data_url && openPdfFile(file.data_url)}
                      >
                        <InsertDriveFileIcon color="primary" style={{ width: '40px', height: '40px' }} />
                        <Typography className={styles.documentTitle}>
                          {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                        </Typography>
                        <span className={styles.documentHover}>{file?.file?.name || file}</span>
                      </div>
                    ) : (
                      <Link
                        key={index}
                        href={checkAndMakeAbsoluteUrl(file)}
                        className={styles.documentWrapper}
                        target="__blank"
                      >
                        <InsertDriveFileIcon color="primary" style={{ width: '40px', height: '40px' }} />
                        <Typography className={styles.documentTitle}>
                          {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                        </Typography>
                        <span className={styles.documentHover}>{file?.file?.name || file}</span>
                      </Link>
                    ),
                  )}
                </CustomSlider>
              ) : (
                <div className={styles.emptyIconWrapper}>
                  <div className={styles.emptyWrapper}>
                    <div className={styles.emptyIcon}>
                      <NoDocumentIcon className={cx(styles.noDocumentIcon, { [styles.noIconSmall]: small })} />
                    </div>
                    <Typography className={styles.noPhotoText}>{t(TranslationKey['No files'])}</Typography>
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
          onSave={onEditRotateFile}
        />
      </Modal>

      {showPhotosModal && (
        <ImageModal
          showPreviews
          isOpenModal={showPhotosModal}
          controls={isEditable ? bigImagesModalControls : undefined}
          files={bigImagesOptions.images.map((el, i) => ({
            url: el,
            comment: filteredImagesTitles[i],
          }))}
          currentFileIndex={bigImagesOptions.imgIndex}
          onOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          onCurrentFileIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />
      )}
    </div>
  ) : (
    <div className={styles.emptyIconWrapper}>
      <div className={styles.emptyWrapper}>
        <div className={styles.emptyIcon}>
          <NoDocumentIcon className={cx(styles.noDocumentIcon, { [styles.noIconSmall]: small })} />
        </div>
        <Typography className={styles.noPhotoText}>{t(TranslationKey['No files'])}</Typography>
      </div>
    </div>
  )
}
