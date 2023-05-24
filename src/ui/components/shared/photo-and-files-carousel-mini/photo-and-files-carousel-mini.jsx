import { cx } from '@emotion/css'
import InboxIcon from '@mui/icons-material/Inbox'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Avatar, Link, Typography } from '@mui/material'
import { CustomSlider } from '@components/shared/custom-slider'

import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BigImagesModal } from '@components/modals/big-images-modal'

import { checkIsImageLink } from '@utils/checks'
import { shortenDocumentString } from '@utils/text'
import { t } from '@utils/translations'
import { openPdfFile } from '@utils/open-pdf-file/open-pdf-file'

import { useClassNames } from './photo-and-files-carousel-mini.styles'

export const PhotoAndFilesCarouselMini = ({
  files,
  width,
  small = false,
  direction = 'row',
  notToShowEmpty = false,
}) => {
  const { classes: classNames } = useClassNames()
  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyFiles = files?.length
    ? files.filter(el => (el?.file?.name ? !checkIsImageLink(el?.file?.name) : !checkIsImageLink(el)))
    : []
  const notEmptyPhotos = files?.length ? files.filter(el => checkIsImageLink(el?.file?.name || el)) : []

  return files?.length ? (
    <div
      className={direction === 'column' ? classNames.imagesAndFilesWrapperColumn : classNames.imagesAndFilesWrapperMini}
      style={{
        width,
        flexDirection: direction === 'column' ? 'column' : 'row',
      }}
    >
      {(notToShowEmpty && notEmptyPhotos?.length) || !notToShowEmpty ? (
        <div className={cx(classNames.imagesWrapper, { [classNames.notToShowEmptyWrapper]: notToShowEmpty })}>
          {notEmptyPhotos?.length ? (
            <CustomSlider>
              {notEmptyPhotos.map((photo, index) => (
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
                      images: files
                        .filter(el => checkIsImageLink(el?.file?.name || el))
                        .map(img => img?.data_url || img),
                      imgIndex: index,
                    })
                  }}
                />
              ))}
            </CustomSlider>
          ) : (
            <div className={classNames.emptyIconWrapper}>
              <div className={classNames.emptyWrapper}>
                <div className={classNames.emptyIcon}>
                  <PhotoCameraIcon style={{ color: '#C4C4C4', fontSize: '30px' }} />
                </div>
                <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {(notToShowEmpty && notEmptyFiles?.length) || !notToShowEmpty ? (
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
                    <InsertDriveFileIcon color="primary" style={{ width: '60px', height: '60px' }} />
                    <Typography className={classNames.documentTitle}>
                      {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                    </Typography>
                    <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                  </div>
                ) : (
                  <Link key={index} href={file} className={classNames.documentWrapper} target="__blank">
                    <InsertDriveFileIcon color="primary" style={{ width: '60px', height: '60px' }} />
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
              <div className={classNames.emptyWrapperMini}>
                <div className={classNames.emptyIconMini}>
                  <InboxIcon style={{ color: '#C4C4C4', fontSize: '40px', padding: 10 }} />
                </div>
                <Typography className={classNames.emptyDocs}>{t(TranslationKey['No documents'])}</Typography>
              </div>
            </div>
          )}
        </div>
      ) : null}
      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
        setImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
      />
    </div>
  ) : (
    <div className={classNames.emptyProposalsIconWrapperMini}>
      <div className={classNames.emptyProposalsIconMini}>
        <InboxIcon style={{ color: '#C4C4C4', fontSize: '40px', padding: 10 }} />
      </div>
      <div>
        <Typography className={classNames.emptyProposalsTitleMini}>{t(TranslationKey['No files added'])}</Typography>
      </div>
    </div>
  )
}
