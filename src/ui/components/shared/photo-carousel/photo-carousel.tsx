/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useState } from 'react'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Avatar, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { CustomSlider } from '../custom-slider'

import { useClassNames } from './photo-carousel.style'

interface FilesInterface {
  file: { name: Array<string> }
  data_url: string
}

interface PhotoCarouselProps {
  files: Array<string | FilesInterface>
  isAmazonPhoto: boolean
  view: string
  alignButtons: string
  small: boolean
  imageClass: string
}

export const PhotoCarousel: FC<PhotoCarouselProps> = props => {
  const { classes: classNames } = useClassNames()

  const { files, isAmazonPhoto, view, alignButtons, small = false, imageClass } = props

  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 } as {
    images: Array<string>
    imgIndex: number
  })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyPhotos = isAmazonPhoto
    ? files?.map(el => getAmazonImageUrl(el, true))
    : files?.filter(el => checkIsImageLink(typeof el !== 'string' ? el?.file?.name : el))

  return files?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      <div className={classNames.imageWrapper}>
        {notEmptyPhotos?.length ? (
          <CustomSlider view={view || 'simple'} alignButtons={alignButtons || 'center'}>
            {notEmptyPhotos.map((photo, index) => (
              <Avatar
                key={index}
                variant="square"
                alt={'!'}
                src={photo?.data_url || photo}
                // @ts-ignore
                classes={{
                  img: small ? classNames.smallImage : imageClass ? imageClass : classNames.image,
                  root: classNames.root,
                }}
                onClick={() => {
                  setShowPhotosModal(!showPhotosModal)

                  setBigImagesOptions({
                    images: isAmazonPhoto
                      ? files?.map(el => getAmazonImageUrl(el, true))
                      : files
                          ?.filter(el => checkIsImageLink(typeof el !== 'string' ? el?.file?.name : el))
                          .map(img => (typeof img !== 'string' ? img?.data_url : img)),

                    imgIndex: index,
                  })
                }}
              />
            ))}
          </CustomSlider>
        ) : (
          <div className={classNames.emptyIconWrapper}>
            <div className={classNames.emptyIcon}>
              <PhotoCameraIcon style={{ color: '#C4C4C4', fontSize: '40px' }} />
            </div>
          </div>
        )}
      </div>

      <ImageModal
        showPreviews
        imageList={bigImagesOptions.images}
        currentImageIndex={bigImagesOptions.imgIndex}
        handleCurrentImageIndex={imgIndex =>
          setBigImagesOptions(() => ({
            ...bigImagesOptions,
            imgIndex,
          }))
        }
        handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        isOpenModal={showPhotosModal}
      />
    </div>
  ) : (
    <div className={classNames.emptyIconWrapper}>
      <div className={classNames.emptyWrapper}>
        <div className={classNames.emptyIcon}>
          <PhotoCameraIcon style={{ color: '#C4C4C4', fontSize: '30px' }} />
        </div>
        <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
      </div>
    </div>
  )
}
