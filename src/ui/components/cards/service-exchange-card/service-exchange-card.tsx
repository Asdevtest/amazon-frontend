/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Typography, Avatar } from '@mui/material'
import Rating from '@mui/material/Rating'

import React, { FC } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { UserLink } from '@components/user/user-link'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useClassNames } from './service-exchange-card.style'
import { CustomSlider } from '@components/shared/custom-slider'

interface onClickThumbnailArguments {
  images: Array<string | linksToMediaFilesInterface>
  imgIndex: number
}

interface Requests {
  createdBy: CreatedBy
  humanFriendlyId: number
  price: number
  status: string
  timeoutAt: string
  title: string
  updatedAt: string
  _id: string
}

interface CreatedBy {
  name: string
  _id: string
}

interface linksToMediaFilesInterface {
  file: { name: Array<string> }
}

interface Service {
  createdBy: CreatedBy
  linksToMediaFiles: Array<string | linksToMediaFilesInterface>
  requests: Array<Requests>
  type: number
  description: string
  title: string
  updatedAt: string
  _id: string
}

interface ServiceExchangeCardProps {
  service: Service
  choose?: boolean
  order?: boolean
  pathname?: string
  onClickThumbnail?: (images: onClickThumbnailArguments) => void
  onClickButton?: (service: Service) => void
}

export const ServiceExchangeCard: FC<ServiceExchangeCardProps> = props => {
  const { classes: classNames } = useClassNames()

  const { service, choose, order, pathname, onClickButton, onClickThumbnail } = props

  const imagesForRender = service?.linksToMediaFiles?.filter(el =>
    checkIsImageLink(typeof el !== 'string' ? el?.file?.name : el),
  )

  return (
    <div className={classNames.cardWrapper}>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.cardTitle}>{service.title}</Typography>
      </div>

      <div className={classNames.descriptionWrapper}>
        <Typography className={classNames.cardDescription}>{service.description}</Typography>
      </div>

      <div className={classNames.cardCarouselWrapper}>
        {/* @ts-ignore */}
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

      {pathname !== '/freelancer/freelance/my-services' ? (
        <div className={classNames.detailsWrapper}>
          <div className={classNames.detailsSubWrapper}>
            <Typography className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</Typography>
            <Typography className={classNames.detailDescription}>
              {service.type === 0
                ? t(TranslationKey.Universal)
                : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.type])}
            </Typography>
          </div>

          <div className={classNames.detailsSubWrapper}>
            <Typography className={classNames.detailTitle}>{t(TranslationKey.Performer) + ':'}</Typography>
            <div className={classNames.userInfo}>
              <Avatar src={getUserAvatarSrc(service.createdBy._id)} className={classNames.cardImg} />
              <div>
                {/* @ts-ignore */}
                <UserLink
                  blackText
                  name={service?.createdBy?.name}
                  userId={service?.createdBy?._id}
                  customStyles={{ fontSize: 14 }}
                />
                <Rating disabled value={5} size="small" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classNames.detailsWrapperAll}>
          <div className={classNames.detailsSubWrapperAll}>
            <Typography className={classNames.detailTitle}>{t(TranslationKey['Number of requests']) + ':'}</Typography>
            <Typography className={classNames.detailDescription}>{service.requests.length}</Typography>
          </div>
          <div className={classNames.detailsSubWrapperAll}>
            <Typography className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</Typography>
            <Typography className={classNames.detailDescription}>
              {service.type === 0
                ? t(TranslationKey.Universal)
                : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.type])}
            </Typography>
          </div>
        </div>
      )}

      <div className={classNames.buttonWrapper}>
        <Button
          success={choose || order}
          className={cx(classNames.openBtn)}
          onClick={() => !!onClickButton && onClickButton(service)}
        >
          {choose ? t(TranslationKey.Choose) : order ? t(TranslationKey['To order']) : t(TranslationKey.Open)}
        </Button>
      </div>
    </div>
  )
}
