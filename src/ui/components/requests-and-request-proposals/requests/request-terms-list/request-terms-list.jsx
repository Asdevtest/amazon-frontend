import { Typography } from '@mui/material'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantRequestPriceCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { useStyles } from '@components/requests-and-request-proposals/requests/request-terms-list/request-terms-list.style'
import { Field } from '@components/shared/field'

import { formatNormDateTime, formatNormDateTimeWithParseISO, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const RequestTermsList = props => {
  const { request, wrapperClassName, withBorder } = props
  const { classes: styles, cx } = useStyles()

  const getDeadlineColor = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS) {
      return styles.redColor
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
      return styles.yellowColor
    }
  }

  return (
    <div
      className={cx(styles.body, {
        [styles.bodyWithBorder]: !!withBorder,
        [wrapperClassName]: !!wrapperClassName,
      })}
    >
      {request?.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] ? (
        <div>
          <Field
            labelClasses={styles.fieldLabel}
            containerClasses={styles.fieldContainer}
            label={t(TranslationKey['Product price'])}
            inputComponent={
              <VacantRequestPriceCell
                AlignLeft
                price={request?.priceAmazon}
                cashBackInPercent={request?.cashBackInPercent}
              />
            }
          />

          <Field
            labelClasses={styles.fieldLabel}
            containerClasses={styles.fieldContainer}
            label={'CashBack'}
            inputComponent={<p className={styles.accentText}>{toFixed(request?.cashBackInPercent, 2) + '%'}</p>}
          />
        </div>
      ) : null}
      <div>
        <Field
          labelClasses={styles.fieldLabel}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey['Request price'])}
          inputComponent={<p className={styles.accentText}>{toFixedWithDollarSign(request?.price, 2)}</p>}
        />

        <Field
          labelClasses={styles.fieldLabel}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey.Status)}
          inputComponent={
            <p className={styles.accentText} style={{ color: colorByStatus(request?.status) }}>
              {MyRequestStatusTranslate(request?.status)}
            </p>
          }
        />
      </div>
      <div>
        <Field
          labelClasses={styles.fieldLabel}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey['Time till deadline'])}
          inputComponent={
            <Typography className={cx(styles.accentText, getDeadlineColor(request?.timeoutAt))}>{`${Math.round(
              getDistanceBetweenDatesInSeconds(request?.timeoutAt) / 3600,
            )} ${t(TranslationKey.hour)} `}</Typography>
          }
        />

        <Field
          labelClasses={styles.fieldLabel}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey['Request type'])}
          inputComponent={<p className={styles.accentText}>{freelanceRequestTypeTranslate(request?.spec?.title)}</p>}
        />
      </div>

      <div>
        <Field
          labelClasses={styles.fieldLabel}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey.Updated)}
          inputComponent={<p className={styles.accentText}>{formatNormDateTimeWithParseISO(request?.updatedAt)}</p>}
        />
        <Field
          labelClasses={styles.fieldLabel}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey.Deadline)}
          inputComponent={<p className={styles.accentText}>{`${formatNormDateTime(request?.timeoutAt)}`}</p>}
        />
      </div>
    </div>
  )
}
