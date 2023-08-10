import { FC } from 'react'

import Checkbox from '@mui/material/Checkbox'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSlider } from '@components/shared/custom-slider'
import { UserLink } from '@components/user/user-link'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { IService, linksToMediaFilesInterface } from '@typings/master-user'

import { useClassNames } from './announcement-card.styles'

interface onClickThumbnailArguments {
  images: Array<string | linksToMediaFilesInterface>
  imgIndex: number
}

interface AnnouncementCardProps {
  announcementData: IService
  isSelectedCard: boolean
  onClickThumbnail?: (images: onClickThumbnailArguments) => void
}

export const AnnouncementCard: FC<AnnouncementCardProps> = props => {
  const { classes: classNames } = useClassNames()

  const { announcementData, isSelectedCard, onClickThumbnail } = props

  const imagesForRender = announcementData?.linksToMediaFiles?.filter(el =>
    checkIsImageLink(typeof el !== 'string' ? el?.file?.name : el),
  )

  return (
    <div className={classNames.root}>
      {/* <div className={classNames.header}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.title}>{announcementData?.title}</p>
          <Checkbox color="primary" checked={isSelectedCard} />
        </div>

        <p className={classNames.description}>{announcementData?.description}</p>
      </div>

      <div className={classNames.cardCarouselWrapper}>
        <CustomSlider>
          {imagesForRender.map((imageHash, index) => (
            <img
              key={index}
              alt=""
              className={classNames.carouselImage}
              src={getAmazonImageUrl(imageHash, true)}
              onClick={() => {
                !!onClickThumbnail &&
                  onClickThumbnail({
                    images: imagesForRender,
                    imgIndex: index,
                  })
              }}
            />
          ))}
        </CustomSlider>
      </div>

      <div className={classNames.detailsWrapper}>
        <div className={classNames.detailsSubWrapper}>
          <p className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
          <p className={classNames.detailDescription}>
            {announcementData.type === 0
              ? t(TranslationKey.Universal)
              : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[announcementData.type])}
          </p>
        </div>

        <div className={classNames.detailsSubWrapper}>
          <p className={classNames.detailTitle}>{t(TranslationKey.Performer) + ':'}</p>
          <div className={classNames.userInfo}>
            <img src={getUserAvatarSrc(announcementData.createdBy._id)} className={classNames.cardImg} />

            <UserLink
              blackText
              ratingSize="small"
              name={announcementData?.createdBy?.name}
              userId={announcementData?.createdBy?._id}
              rating={announcementData?.createdBy?.rating}
              customStyles={{ fontSize: 14 }}
            />
          </div>
        </div>
      </div> */}
    </div>
  )
}
