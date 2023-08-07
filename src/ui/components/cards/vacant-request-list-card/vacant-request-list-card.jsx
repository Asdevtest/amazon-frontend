import { cx } from '@emotion/css'

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

import { formatNormDateTime, formatNormDateTimeWithParseISO, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useClassNames } from './vacant-request-list-card.style'

export const VacantRequestListCard = ({ item, onClickViewMore, isFirst }) => {
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
    <div className={cx(classNames.cardWrapper, getCardClassName(item.timeoutAt))}>
      <div className={classNames.cardTitleBlockWrapper}>
        <div className={classNames.cardTitleBlockHeaderWrapper}>
          <div className={classNames.userInfoWrapper}>
            <Avatar src={getUserAvatarSrc(item?.createdBy?._id)} className={classNames.cardImg} />

            <div className={classNames.nameWrapper}>
              <UserLink blackText name={item?.createdBy?.name} userId={item?.createdBy?._id} />

              <Rating disabled value={item?.createdBy?.rating} />
            </div>
          </div>
          <div className={classNames.titleWrapper}>
            <Typography className={classNames.cardTitle}>
              {`${item.title} / ${t(TranslationKey.ID)}`}{' '}
              <span className={cx(classNames.cardTitle, classNames.idText)}>{item.humanFriendlyId}</span>
            </Typography>
          </div>
        </div>
        <div className={classNames.cardTitleBlockFooterWrapper}>
          <Typography className={classNames.cardSubTitle}>
            {translateProposalsLeftMessage(
              item?.maxAmountOfProposals - item?.countProposalsByStatuses?.acceptedProposals,
              item?.maxAmountOfProposals,
            )}
          </Typography>
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
                  <VacantRequestPriceCell
                    AlignLeft
                    price={item.priceAmazon}
                    cashBackInPercent={item.cashBackInPercent}
                  />
                </div>
              }
            />
          ) : (
            <div className={classNames.emptyDiv} />
          )}

          {item.typeTask === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
            <Field
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.fieldContainer}
              label={'CashBack'}
              inputComponent={
                <Typography className={classNames.accentText}>{toFixed(item.cashBackInPercent, 2) + '%'}</Typography>
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
              <Typography className={classNames.deadline} style={{ color: colorByRequestStatus(item.status) }}>
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
              <Typography className={cx(classNames.accentText, getDeadlineColor(item.timeoutAt))}>{`${toFixed(
                item.timeLimitInMinutes / 60,
                2,
              )} ${t(TranslationKey.hour)} `}</Typography>
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
            label={t(TranslationKey.Deadline)}
            inputComponent={
              <Typography className={classNames.accentText}>{`${formatNormDateTime(item.timeoutAt)}`}</Typography>
            }
          />
        </div>
      </div>

      <div className={classNames.priorityWrapper}>
        {Number(item?.priority) === requestPriority.urgentPriority && (
          <img className={classNames.priorityIcon} src="/assets/icons/fire.svg" />
        )}
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
  )
}
