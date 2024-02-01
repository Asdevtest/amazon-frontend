import Typography from '@mui/material/Typography'

import { requestPriority } from '@constants/requests/request-priority'
import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { OrderCell, VacantRequestPriceCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime, formatNormDateTimeWithParseISO, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useStyles } from './vacant-request-short-card.style'

export const VacantRequestShortCard = ({ item, onClickViewMore, onDoubleClick, isFirst }) => {
  const { classes: styles, cx } = useStyles()

  const getCardClassName = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS) {
      return styles.redBackground
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
      return styles.yellowBackground
    }
  }

  const getDeadlineColor = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS) {
      return styles.redColor
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
      return styles.yellowColor
    }
  }

  return (
    <div
      className={cx(styles.cardWrapper, getCardClassName(item.timeoutAt))}
      onDoubleClick={() => onDoubleClick(item._id)}
    >
      <div className={styles.cardHeader}>
        <UserLink
          blueText
          withAvatar
          ratingSize="large"
          name={item?.createdBy?.name}
          userId={item?.createdBy?._id}
          rating={item?.createdBy?.rating}
          customAvatarStyles={{ width: 40, height: 40 }}
          customStyles={{ fontSize: 16, lineHeight: '20px' }}
          customRatingClass={{ fontSize: 20, opacity: 1 }}
        />

        <div className={styles.idAndPriorityWrapper}>
          <div className={styles.idWrapper}>
            <Typography className={styles.idTitle}>{t(TranslationKey.ID) + ':'}</Typography>
            <Typography className={cx(styles.idTitle, styles.idText)}>{item.humanFriendlyId}</Typography>
          </div>

          {Number(item?.priority) === requestPriority.urgentPriority && (
            <img className={styles.priorityIcon} src="/assets/icons/fire.svg" />
          )}
        </div>
      </div>

      <OrderCell withoutSku imageSize={'small'} product={item.product} />

      <div className={styles.cardTitleBlockWrapper}>
        <Typography className={styles.cardTitle}>{item.title}</Typography>
      </div>

      <div className={styles.cardActionBlockWrapper}>
        <div className={styles.mainInfosWrapper}>
          <div>
            {item.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
              <Field
                labelClasses={styles.fieldLabel}
                containerClasses={styles.fieldContainer}
                label={t(TranslationKey['Product price'])}
                inputComponent={
                  <div className={styles.priceAmazonWrapper}>
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
              labelClasses={styles.fieldLabel}
              containerClasses={styles.fieldContainer}
              label={t(TranslationKey['Request price'])}
              inputComponent={
                <Typography className={styles.accentText}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              }
            />

            <Field
              labelClasses={styles.fieldLabel}
              containerClasses={styles.fieldContainer}
              label={t(TranslationKey.Time)}
              inputComponent={
                <Typography className={cx(styles.accentText, getDeadlineColor(item?.timeoutAt))}>{`${Math.round(
                  getDistanceBetweenDatesInSeconds(item?.timeoutAt) / 3600,
                )} ${t(TranslationKey.hour)} `}</Typography>
              }
            />

            <Field
              labelClasses={styles.fieldLabel}
              containerClasses={styles.fieldContainer}
              label={t(TranslationKey.Updated)}
              inputComponent={
                <Typography className={styles.accentText}>{formatNormDateTimeWithParseISO(item.updatedAt)}</Typography>
              }
            />
          </div>

          <div>
            {item.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
              <Field
                labelClasses={cx(styles.fieldLabel, styles.rightLieldLabel)}
                containerClasses={styles.fieldContainer}
                label={'CashBack'}
                inputComponent={
                  <Typography className={cx(styles.accentText, styles.rightText)}>
                    {toFixed(item.cashBackInPercent, 2) + '%'}
                  </Typography>
                }
              />
            ) : null}

            <Field
              labelClasses={cx(styles.fieldLabel, styles.rightLieldLabel)}
              containerClasses={styles.fieldContainer}
              label={t(TranslationKey.Status)}
              inputComponent={
                <Typography
                  className={cx(styles.accentText, styles.rightText)}
                  style={{ color: colorByStatus(item.status) }}
                >
                  {MyRequestStatusTranslate(item.status)}
                </Typography>
              }
            />

            <Field
              labelClasses={cx(styles.fieldLabel, styles.rightLieldLabel)}
              containerClasses={styles.fieldContainer}
              label={t(TranslationKey['Request type'])}
              inputComponent={
                <Typography className={cx(styles.accentText, styles.rightText, styles.capitalize)}>
                  {item.spec?.title}
                </Typography>
              }
            />
            <Field
              labelClasses={cx(styles.fieldLabel, styles.rightLieldLabel)}
              containerClasses={styles.fieldContainer}
              label={t(TranslationKey.Deadline)}
              inputComponent={
                <Typography
                  className={cx(styles.accentText, styles.rightText, styles.dontWrapText)}
                >{`${formatNormDateTime(item.timeoutAt)}`}</Typography>
              }
            />
          </div>
        </div>

        <Button
          tooltipInfoContent={isFirst && t(TranslationKey['Open detailed information about the request'])}
          variant="contained"
          color="primary"
          className={styles.actionButton}
          onClick={() => onClickViewMore(item._id)}
        >
          {t(TranslationKey.Details)}
        </Button>
        <Typography className={styles.cardSubTitle}>
          {translateProposalsLeftMessage(
            item?.maxAmountOfProposals - item?.countProposalsByStatuses?.acceptedProposals,
            item?.maxAmountOfProposals,
          )}
        </Typography>
      </div>
    </div>
  )
}
