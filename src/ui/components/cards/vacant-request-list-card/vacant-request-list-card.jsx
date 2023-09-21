import { cx } from '@emotion/css'
import React from 'react'

import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

import { requestPriority } from '@constants/requests/request-priority'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByRequestStatus } from '@constants/requests/request-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { OrderCell, VacantRequestPriceCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime, formatNormDateTimeWithParseISO, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useClassNames } from './vacant-request-list-card.style'

export const VacantRequestListCard = ({ item, onClickViewMore, onDoubleClick, isFirst }) => {
  const { classes: classNames } = useClassNames()

  const getCardClassName = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 86400) {
      return classNames.redBackground
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 172800) {
      return classNames.yellowBackground
    }
  }

  const getDeadlineColor = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 86400) {
      return classNames.redColor
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 172800) {
      return classNames.yellowColor
    }
  }

  return (
    <div
      className={cx(classNames.cardWrapper, getCardClassName(item.timeoutAt))}
      onDoubleClick={() => onDoubleClick(item._id)}
    >
      <div className={classNames.cardTitleBlockWrapper}>
        <div className={classNames.cardTitleBlockHeaderWrapper}>
          <div className={classNames.titleWrapper}>
            <Typography className={classNames.cardTitle}>
              {`${item.title} / ${t(TranslationKey.ID)}`}{' '}
              <span className={cx(classNames.cardTitle, classNames.idText)}>{item.humanFriendlyId}</span>
            </Typography>
          </div>
          <div className={classNames.requestInfoWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(item?.createdBy?._id)} className={classNames.cardImg} />

              <div className={classNames.nameWrapper}>
                <UserLink blackText name={item?.createdBy?.name} userId={item?.createdBy?._id} />

                <Rating disabled value={item?.createdBy?.rating} />
              </div>
            </div>

            <div className={classNames.productInfo}>
              <OrderCell withoutSku imageSize={'small'} product={item.product} />
            </div>
          </div>
        </div>
        <div className={classNames.cardTitleBlockFooterWrapper}>
          <Typography className={classNames.cardSubTitle}>
            {translateProposalsLeftMessage(
              item?.maxAmountOfProposals - item?.countProposalsByStatuses?.acceptedProposals,
              item?.maxAmountOfProposals,
            )}
          </Typography>
          {/* <Typography className={classNames.cardSubTitle}> */}
          {/*   {t(TranslationKey.Updated)}: <span>{formatNormDateTimeWithParseISO(item.updatedAt)}</span> */}
          {/* </Typography> */}
        </div>
      </div>

      <div className={classNames.requestTermsWrapper}>
        <RequestTermsList request={item} />
      </div>

      <div className={classNames.controls}>
        <div className={classNames.buttonWrapper}>
          <div className={classNames.priorityWrapper}>
            {Number(item?.priority) === requestPriority.urgentPriority && (
              <img className={classNames.priorityIcon} src="/assets/icons/fire.svg" />
            )}
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
        </div>
      </div>
    </div>
  )
}
