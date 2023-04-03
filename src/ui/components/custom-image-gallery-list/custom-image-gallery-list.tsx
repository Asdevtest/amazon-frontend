import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import {Avatar, Typography} from '@mui/material'

import {FC, useState} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {BigImagesModal} from '@components/modals/big-images-modal'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './custom-image-gallery-list.style'

interface Props {
  files: Array<string>
}

interface BigImagesOptionsState {
  images: Array<string>
  imgIndex: number
}

export const CustomImageGalleryList: FC<Props> = observer(({files}) => {
  const {classes: classNames} = useClassNames()

  const [bigImagesOptions, setBigImagesOptions] = useState<BigImagesOptionsState>({images: [], imgIndex: 0})
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyPhotos = files?.map(el => getAmazonImageUrl(el, true))

  return !!files && files?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      {/* {!!notEmptyPhotos && notEmptyPhotos?.length ? ( */}
      {notEmptyPhotos.map((photo: string | undefined, index: number) => (
        <div key={index} className={classNames.imageWrapper}>
          <Avatar
            variant="square"
            alt={'!'}
            src={photo}
            className={classNames.smallImage}
            classes={{img: classNames.img}}
            onClick={() => {
              setShowPhotosModal(!showPhotosModal)

              setBigImagesOptions({
                images: files?.map(el => getAmazonImageUrl(el, true)),
                imgIndex: index,
              })
            }}
          />
          <Typography className={classNames.photoTitle}>{'Img'}</Typography>
        </div>
      ))}

      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  ) : (
    <div className={classNames.emptyIconWrapper}>
      <div className={classNames.emptyWrapper}>
        <div className={classNames.emptyIcon}>
          <PhotoCameraIcon style={{color: '#C4C4C4', fontSize: '30px'}} />
        </div>
        <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
      </div>
    </div>
  )
})
