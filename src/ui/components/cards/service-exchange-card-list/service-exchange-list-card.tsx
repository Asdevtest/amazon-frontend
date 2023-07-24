/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable react/no-children-prop */

/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { FC } from 'react'

import { Avatar, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomSlider } from '@components/shared/custom-slider'
import { UserLink } from '@components/user/user-link'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useClassNames } from './service-exchange-list-card.style'

interface CreatedByInterface {
  _id: string
  name: string
}

interface linksToMediaFilesInterface {
  file: { name: Array<string> }
}

interface RequestsInterface {
  _id: string
  title: string
  humanFriendlyId: number
  price: number
  status: string
  timeoutAt: string
  createdBy: CreatedByInterface
  updatedAt: string
}

interface Service {
  _id: string
  type: number
  requests: Array<RequestsInterface>
  linksToMediaFiles: Array<string | linksToMediaFilesInterface>
  title: string
  description: string
  createdBy: CreatedByInterface
  createdAt: string
  updatedAt: string
}

interface ServiceExchangeCardListProps {
  service: Service
  choose: boolean
  order: boolean
  pathname: string
  onClickThumbnail: (data: { images: Array<string | linksToMediaFilesInterface>; imgIndex: number }) => void
  onClickButton: (data: Service) => void
}

export const ServiceExchangeCardList: FC<ServiceExchangeCardListProps> = props => {
  const { service, choose, order, pathname, onClickThumbnail, onClickButton } = props

  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.cardWrapper}>
      <div className={classNames.cardCarouselWrapper}>
        {/*  @ts-ignore */}
        <CustomSlider>
          {service.linksToMediaFiles
            .filter(el => checkIsImageLink(typeof el === 'string' ? el : el?.file?.name))
            .map((imageHash, index) => (
              <img
                key={index}
                alt=""
                className={classNames.carouselImage}
                src={getAmazonImageUrl(imageHash, true)}
                onClick={() => {
                  onClickThumbnail({
                    images: service.linksToMediaFiles.filter(el =>
                      checkIsImageLink(typeof el === 'string' ? el : el?.file?.name),
                    ),
                    imgIndex: index,
                  })
                }}
              />
            ))}
        </CustomSlider>
      </div>

      <div className={classNames.titleAndDescriptionWrapper}>
        <Typography className={classNames.cardTitle}>{service.title}</Typography>

        <Typography className={classNames.cardDescription}>{service.description}</Typography>
      </div>

      <div className={classNames.detailsAndButtonWrapper}>
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

                <div className={classNames.nameWrapper}>
                  <UserLink
                    blackText
                    name={service.createdBy.name}
                    userId={service.createdBy._id}
                    customStyles={{ fontSize: 14 }}
                    withAvatar={undefined}
                    maxNameWidth={undefined}
                    customClassNames={undefined}
                  />
                  <Rating disabled value={5} size="small" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classNames.detailsWrapperAll}>
            <div className={classNames.detailsSubWrapperAll}>
              <Typography className={classNames.detailTitle}>
                {t(TranslationKey['Number of requests']) + ':'}
              </Typography>
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
          <Button success={choose || order} className={cx(classNames.openBtn)} onClick={() => onClickButton(service)}>
            {choose ? t(TranslationKey.Choose) : order ? t(TranslationKey['To order']) : t(TranslationKey.Open)}
          </Button>
        </div>
      </div>
    </div>
  )
}
