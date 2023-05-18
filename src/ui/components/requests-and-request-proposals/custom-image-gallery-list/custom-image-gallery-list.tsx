import { Avatar, Tooltip, Typography } from '@mui/material'

import { FC, useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { BigImagesModal } from '@components/modals/big-images-modal'
import { BigObjectImagesModal } from '@components/modals/big-object-images-modal'
import { NoPhotoIcon } from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './custom-image-gallery-list.style'

interface FilesObject {
  fileLink: string

  commentByClient: string
  commentByPerformer: string
  _id: string
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
  const { classes: classNames } = useClassNames()

  const { files, isAmazonPhoto } = props

  const isObjectFiles = files?.some(el => typeof el === 'object')

  const [filesForRender, setFilesForRender] = useState(files)

  const [curImageId, setCurImageId] = useState<string | null>(null)

  // console.log('filesForRender', filesForRender)

  useEffect(() => {
    setFilesForRender(files)
  }, [SettingsModel.languageTag, files])

  const [bigImagesOptions, setBigImagesOptions] = useState<BigImagesOptionsState>({ images: [], imgIndex: 0 })
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyPhotos = isAmazonPhoto
    ? filesForRender?.map(el => getAmazonImageUrl(el, true))
    : filesForRender?.filter(el => {
        if (typeof el === 'string') {
          return checkIsImageLink(el)
        } else {
          return checkIsImageLink(el?.fileLink)
        }
      })

  return !!filesForRender && filesForRender?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      {notEmptyPhotos.map((photo: string | FilesObject, index: number) => (
        <div key={index} className={classNames.imageWrapper}>
          <Avatar
            variant="square"
            alt={'!'}
            src={typeof photo === 'string' ? photo : photo?.fileLink}
            className={classNames.smallImage}
            classes={{ img: classNames.img }}
            onClick={() => {
              if (isObjectFiles) {
                setCurImageId(typeof photo === 'string' ? photo : photo._id)
              } else {
                setBigImagesOptions({
                  images: isAmazonPhoto
                    ? filesForRender?.map(el => getAmazonImageUrl(el, true))
                    : filesForRender
                        ?.filter(el => {
                          if (typeof el === 'string') {
                            return checkIsImageLink(el)
                          } else {
                            return checkIsImageLink(el?.fileLink)
                          }
                        })
                        .map(el => {
                          if (typeof el === 'string') {
                            return el
                          } else {
                            return el?.fileLink
                          }
                        }),
                  imgIndex: index,
                })
              }

              setShowPhotosModal(!showPhotosModal)
            }}
          />
          {typeof photo !== 'string' && (
            <Tooltip title={photo.commentByClient}>
              <Typography className={classNames.photoTitle}>{`${index + 1} ${photo.commentByClient}`}</Typography>
            </Tooltip>
          )}
        </div>
      ))}

      {isObjectFiles ? (
        <BigObjectImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          imagesData={files.map(
            el => typeof el === 'object' && { ...el, image: el.fileLink, imageComment: el.commentByClient || '' },
          )}
          curImageId={curImageId}
          setCurImageId={setCurImageId}
          renderBtns={undefined}
          isRedImageComment={undefined}
        />
      ) : (
        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
          setImageIndex={(imgIndex: number) => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />
      )}
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
