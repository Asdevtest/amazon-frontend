import {Grid, Typography, Avatar} from '@mui/material'
import Rating from '@mui/material/Rating'

import React from 'react'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/freelance-request-type'
import {MyRequestStatusTranslate} from '@constants/request-proposal-status'
import {colorByRequestStatus} from '@constants/request-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
// import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field'
import {UserLink} from '@components/user-link'

import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {translateProposalsLeftMessage} from '@utils/validation'

import {useClassNames} from './vacant-request-list-card.style'

export const VacantRequestListCard = ({item, onClickViewMore, isFirst}) => {
  const {classes: classNames} = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <div className={classNames.cardTitleBlockHeaderWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(item.createdBy._id)} className={classNames.cardImg} />

              <div className={classNames.nameWrapper}>
                <UserLink blackText name={item.createdBy.name} userId={item.createdBy._id} />

                <Rating disabled value={item.createdBy.rating} />
              </div>
            </div>
            <Typography className={classNames.cardTitle}>{item.title}</Typography>
          </div>
          <div className={classNames.cardTitleBlockFooterWrapper}>
            <Typography className={classNames.cardSubTitle}>
              {translateProposalsLeftMessage(
                item.maxAmountOfProposals - item.countProposalsByStatuses.acceptedProposals,
                item.maxAmountOfProposals,
              )}
            </Typography>

            {/* <div className={classNames.updatedAtWrapper}>
              <Typography className={classNames.updatedAtText}>{t(TranslationKey.Updated) + ': '}</Typography>

              <Typography className={classNames.accentText}>
                {formatNormDateTimeWithParseISO(item.updatedAt)}
              </Typography>
            </div> */}
          </div>
        </div>

        <div className={classNames.mainInfosWrapper}>
          <div>
            {item.typeTask === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
              <Field
                labelClasses={classNames.fieldLabel}
                containerClasses={classNames.fieldContainer}
                label={t(TranslationKey['Product price'])}
                inputComponent={
                  <div className={classNames.priceAmazonWrapper}>
                    <Typography className={classNames.redText}>
                      {`$ ${toFixed(item.priceAmazon - (item.priceAmazon * item.cashBackInPercent) / 100, 2)}`}
                    </Typography>

                    <Typography className={classNames.cashBackPrice}>{`$ ${toFixed(item.priceAmazon, 2)}`}</Typography>
                  </div>
                }
              />
            ) : null}

            {item.typeTask === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
              <Field
                labelClasses={classNames.fieldLabel}
                containerClasses={classNames.fieldContainer}
                label={'CashBack'}
                inputComponent={
                  <Typography className={classNames.accentText}>{item.cashBackInPercent + '%'}</Typography>
                }
              />
            ) : null}
          </div>
          <div>
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
              label={t(TranslationKey.Status)}
              inputComponent={
                <Typography className={classNames.deadline} style={{color: colorByRequestStatus(item.status)}}>
                  {MyRequestStatusTranslate(item.status)}
                </Typography>
              }
            />
          </div>
          <div>
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
              label={t(TranslationKey['Request type'])}
              inputComponent={
                <Typography className={classNames.accentText}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[item.typeTask])}
                </Typography>
              }
            />
          </div>

          <div>
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
            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={t(TranslationKey.Updated)}
              inputComponent={
                <Typography className={classNames.accentText}>{`${t(TranslationKey.Deadline)} ${formatNormDateTime(
                  item.timeoutAt,
                )}`}</Typography>
              }
            />
          </div>
        </div>

        <div className={classNames.buttonWrapper}>
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
    </Grid>
  )
}
