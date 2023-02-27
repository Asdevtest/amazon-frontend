/* eslint-disable no-unused-vars */
import {Divider, Grid, Typography, Avatar} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CustomCarousel} from '@components/custom-carousel'
import {MultilineRequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './service-exchange-card.style'

export const ServiceExchangeCard = ({item, onClickViewMore, isFirst}) => {
  const {classes: classNames} = useClassNames()

  return (
    <div className={classNames.cardWrapper}>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.cardTitle}>{item.title}</Typography>
      </div>

      <div className={classNames.descriptionWrapper}>
        <Typography className={classNames.cardDescription}>{item.description}</Typography>
      </div>

      <div className={classNames.cardCarouselWrapper}>
        <CustomCarousel>
          {/* {product.images.map((imageHash, index) => (
          <img
            key={index}
            alt=""
            className={classNames.carouselImage}
            src={getAmazonImageUrl(imageHash, true)}
            onClick={() => {
              setShowImageModal(!showImageModal)
              setBigImagesOptions({images: product.images, imgIndex: index})
            }}
          />
        ))} */}
        </CustomCarousel>
      </div>

      <div className={classNames.detailsWrapper}>
        <div className={classNames.numberOfRequests}>
          <Typography className={classNames.cardDescription}>{item.description}</Typography>
          <Typography className={classNames.cardDescription}>{item.description}</Typography>
        </div>

        <div className={classNames.numberOfRequests}>
          <Typography className={classNames.cardDescription}>{item.description}</Typography>
          <Typography className={classNames.cardDescription}>{item.description}</Typography>
        </div>
      </div>
    </div>
  )
}

{
  /* <div className={classNames.cardWrapper}>
      <div className={classNames.cardTitleBlockWrapper}>
        <Typography className={classNames.cardTitle}>{item.title}</Typography>
      </div>
      <div className={classNames.statusWrapper}>
        <Typography className={classNames.statusText}>{t(TranslationKey.Status)}</Typography>
        <MultilineRequestStatusCell status={item.status} />
      </div>

      <Divider orientation={'horizontal'} />

      <div className={classNames.cardActionBlockWrapper}>
        <div className={classNames.userInfoWrapper}>
          <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

          <div className={classNames.nameRatingWrapper}>
            <UserLink blackText name={item.createdBy.name} userId={item.createdBy._id} />

            <Rating disabled value={item.createdBy.rating} />
          </div>
        </div>

        <Divider orientation={'horizontal'} className={classNames.divider} />

        <div className={classNames.timeInfoWrapper}>
          <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>
          <Typography className={classNames.deadline}>{`${t(TranslationKey.Deadline)} ${formatNormDateTime(
            item.timeoutAt,
          )}`}</Typography>
        </div>
        <div className={classNames.timeWrapper}>
          <div className={classNames.updatedAtWrapper}>
            <Typography className={classNames.updatedAtText}>{t(TranslationKey.Updated)}</Typography>

            <Typography className={classNames.updatedAtText}>
              {formatNormDateTimeWithParseISO(item.updatedAt)}
            </Typography>
          </div>
          <Typography className={classNames.cardTime}>{`${t(TranslationKey.Time)}: ${toFixed(
            item.timeLimitInMinutes / 60,
            2,
          )} ${t(TranslationKey.hour)} `}</Typography>
        </div>

        <Button
          tooltipInfoContent={isFirst && t(TranslationKey['Open detailed information about the request'])}
          variant="contained"
          color="primary"
          className={classNames.actionButton}
          onClick={() => onClickViewMore(item._id)}
        >
          {t(TranslationKey.Details)}
        </Button>
        <Typography className={classNames.cardSubTitle}>
          {translateProposalsLeftMessage(
            item.maxAmountOfProposals - item.countProposalsByStatuses.acceptedProposals,
            item.maxAmountOfProposals,
          )}
        </Typography>
      </div>
    </div> */
}
