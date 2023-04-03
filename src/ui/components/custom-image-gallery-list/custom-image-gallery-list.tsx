import {Avatar, Typography} from '@mui/material'

import {FC, useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {NoPhotoIcon} from '@constants/svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {BigImagesModal} from '@components/modals/big-images-modal'

import {checkIsImageLink} from '@utils/checks'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './custom-image-gallery-list.style'

interface FilesObject {
  data_url: string
  file: {
    name: string
  }
}
interface CustomImageGalleryListProps {
  files: (string | FilesObject)[]
  isAmazonPhoto: boolean
}

interface BigImagesOptionsState {
  images: Array<string>
  imgIndex: number
}

export const CustomImageGalleryList: FC<CustomImageGalleryListProps> = observer(props => {
  const {classes: classNames} = useClassNames()

  const {files, isAmazonPhoto} = props

  const [filesForRender, setFilesForRender] = useState(files)

  useEffect(() => {
    setFilesForRender(files)
  }, [SettingsModel.languageTag, files])

  const [bigImagesOptions, setBigImagesOptions] = useState<BigImagesOptionsState>({images: [], imgIndex: 0})
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyPhotos = isAmazonPhoto
    ? files?.map(el => getAmazonImageUrl(el, true))
    : files?.filter(el => {
        if (typeof el === 'string') {
          return checkIsImageLink(el)
        } else {
          return checkIsImageLink(el?.file?.name)
        }
      })

  return !!filesForRender && filesForRender?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      {notEmptyPhotos.map((photo: string, index: number) => (
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
                images: isAmazonPhoto
                  ? files?.map(el => getAmazonImageUrl(el, true))
                  : files
                      ?.filter(el => {
                        if (typeof el === 'string') {
                          return checkIsImageLink(el)
                        } else {
                          return checkIsImageLink(el?.file?.name)
                        }
                      })
                      .map(el => {
                        if (typeof el === 'string') {
                          return el
                        } else {
                          return el?.data_url
                        }
                      }),
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
          <NoPhotoIcon className={classNames.noPhotoIcon} />
        </div>
        <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
      </div>
    </div>
  )
})
