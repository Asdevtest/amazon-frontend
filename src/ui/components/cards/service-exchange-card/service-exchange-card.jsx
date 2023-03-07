/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Divider, Grid, Typography, Avatar} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CustomCarousel} from '@components/custom-carousel'
import {MultilineRequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './service-exchange-card.style'

export const ServiceExchangeCard = ({service, onClickThumbnail, choose, order, history, onClickButton}) => {
  const {classes: classNames} = useClassNames()

  console.log('service', service)

  return (
    <div className={classNames.cardWrapper}>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.cardTitle}>{service.title}</Typography>
      </div>

      <div className={classNames.descriptionWrapper}>
        <Typography className={classNames.cardDescription}>{service.description}</Typography>
      </div>

      <div className={classNames.cardCarouselWrapper}>
        <CustomCarousel>
          {service.linksToMediaFiles.map((imageHash, index) => (
            <img
              key={index}
              alt=""
              className={classNames.carouselImage}
              src={getAmazonImageUrl(imageHash, true)}
              onClick={() => {
                onClickThumbnail({images: service.linksToMediaFiles, imgIndex: index})
              }}
            />
          ))}
        </CustomCarousel>
      </div>

      {history?.location?.pathname !== '/freelancer/freelance/my-services' ? (
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
                  customStyles={{fontSize: 14}}
                />
                <Rating disabled value={5} size="small" classes={classNames.rating} />
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
        <Button success={choose || order} className={cx(classNames.openBtn)} onClick={() => onClickButton(service)}>
          {choose ? t(TranslationKey.Choose) : order ? t(TranslationKey['To order']) : t(TranslationKey.Open)}
        </Button>
      </div>
      <div className={classNames.buttonWrapper}>
        <Button className={cx(classNames.openBtn)}>{t(TranslationKey.Open)}</Button>
      </div>
      <div className={classNames.buttonWrapper}>
        <Button className={cx(classNames.openBtn)}>{t(TranslationKey.Open)}</Button>
      </div>
    </div>
  )
}
