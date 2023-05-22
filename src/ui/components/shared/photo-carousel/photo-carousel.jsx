import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Avatar, Typography } from '@mui/material'

import { useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BigImagesModal } from '@components/modals/big-images-modal'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './photo-carousel.style'
import { CustomSlider } from '../custom-slider'

export const PhotoCarousel = observer(({ files, isAmazonPhoto, view, alignButtons, small = false, imageClass }) => {
  const { classes: classNames } = useClassNames()
  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyPhotos = isAmazonPhoto
    ? files?.map(el => getAmazonImageUrl(el, true))
    : files?.filter(el => checkIsImageLink(el?.file?.name || el))

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
                classes={{ img: small ? classNames.smallImage : imageClass ? imageClass : classNames.image }}
                onClick={() => {
                  setShowPhotosModal(!showPhotosModal)

                  setBigImagesOptions({
                    images: isAmazonPhoto
                      ? files?.map(el => getAmazonImageUrl(el, true))
                      : files?.filter(el => checkIsImageLink(el?.file?.name || el)).map(img => img?.data_url || img),

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

      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
        setImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
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
})
