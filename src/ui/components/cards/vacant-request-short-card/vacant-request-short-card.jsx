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

import { VacantRequestPriceCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime, formatNormDateTimeWithParseISO } from '@utils/date-time'
import { getBorderForDeadline } from '@utils/deadline-border'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useClassNames } from './vacant-request-short-card.style'

export const VacantRequestShortCard = ({ item, onClickViewMore, isFirst }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.cardWrapper} style={getBorderForDeadline(item.timeoutAt)}>
      <div className={classNames.cardHeader}>
        <div className={classNames.userInfoWrapper}>
          <Avatar src={getUserAvatarSrc(item?.createdBy?._id)} className={classNames.cardImg} />

          <div className={classNames.nameRatingWrapper}>
            <UserLink blackText name={item?.createdBy?.name} userId={item?.createdBy?._id} />

            <Rating disabled value={item?.createdBy?.rating} />
          </div>
        </div>

        <div className={classNames.idAndPriorityWrapper}>
          <div className={classNames.idWrapper}>
            <Typography className={classNames.idTitle}>{t(TranslationKey.ID) + ':'}</Typography>
            <Typography className={cx(classNames.idTitle, classNames.idText)}>{item.humanFriendlyId}</Typography>
          </div>

          {Number(item?.priority) === requestPriority.urgentPriority && (
            <img className={classNames.priorityIcon} src="/assets/icons/fire.svg" />
          )}
        </div>
      </div>

      <div className={classNames.cardTitleBlockWrapper}>
        <Typography className={classNames.cardTitle}>{item.title}</Typography>
      </div>

      <div className={classNames.cardActionBlockWrapper}>
        <div className={classNames.mainInfosWrapper}>
          <div>
            {item.typeTask === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
              <Field
                labelClasses={classNames.fieldLabel}
                containerClasses={classNames.fieldContainer}
                label={t(TranslationKey['Product price'])}
                inputComponent={
                  <div className={classNames.priceAmazonWrapper}>
                    <VacantRequestPriceCell
                      AlignLeft
                      price={item.priceAmazon}
                      cashBackInPercent={item.cashBackInPercent}
                    />
                  </div>
                }
              />
            ) : null}

            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey['Request price'])}
              inputComponent={
                <Typography className={classNames.accentText}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              }
            />

            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey.Time)}
              inputComponent={
                <Typography className={classNames.accentText}>{`${toFixed(item.timeLimitInMinutes / 60, 2)} ${t(
                  TranslationKey.hour,
                )} `}</Typography>
              }
            />

            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey.Updated)}
              inputComponent={
                <Typography className={classNames.accentText}>
                  {formatNormDateTimeWithParseISO(item.updatedAt)}
                </Typography>
              }
            />
          </div>

          <div>
            {item.typeTask === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
              <Field
                labelClasses={cx(classNames.fieldLabel, classNames.rightLieldLabel)}
                containerClasses={classNames.fieldContainer}
                label={'CashBack'}
                inputComponent={
                  <Typography className={cx(classNames.accentText, classNames.rightText)}>
                    {toFixed(item.cashBackInPercent, 2) + '%'}
                  </Typography>
                }
              />
            ) : null}

            <Field
              labelClasses={cx(classNames.fieldLabel, classNames.rightLieldLabel)}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey.Status)}
              inputComponent={
                <Typography
                  className={cx(classNames.accentText, classNames.rightText)}
                  style={{ color: colorByRequestStatus(item.status) }}
                >
                  {MyRequestStatusTranslate(item.status)}
                </Typography>
              }
            />

            <Field
              labelClasses={cx(classNames.fieldLabel, classNames.rightLieldLabel)}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey['Request type'])}
              inputComponent={
                <Typography className={cx(classNames.accentText, classNames.rightText)}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[item.typeTask])}
                </Typography>
              }
            />
            <Field
              labelClasses={cx(classNames.fieldLabel, classNames.rightLieldLabel)}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey.Deadline)}
              inputComponent={
                <Typography
                  className={cx(classNames.accentText, classNames.rightText, classNames.dontWrapText)}
                >{`${formatNormDateTime(item.timeoutAt)}`}</Typography>
              }
            />
          </div>
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
            item?.maxAmountOfProposals - item?.countProposalsByStatuses?.acceptedProposals,
            item?.maxAmountOfProposals,
          )}
        </Typography>
      </div>
    </div>
  )
}
