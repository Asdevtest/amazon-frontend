import { FC, memo } from 'react'

import DoneIcon from '@mui/icons-material/Done'

import {
  freelanceRequestType,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatDateDistanceFromNowStrict, formatNormDateTime } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ISpec } from '@typings/spec'

import { useStyles } from './request-terms.style'

interface RequestTermsProps {
  withoutConfirmation: boolean
  spec: ISpec
  timeoutAt: string
  newProductPrice: number
  priceAmazon: number
  cashBackInPercent: number
  price: number
  updatedAt: string
  status: string
}

export const RequestTerms: FC<RequestTermsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    withoutConfirmation,
    spec,
    timeoutAt,
    newProductPrice,
    priceAmazon,
    cashBackInPercent,
    price,
    updatedAt,
    status,
  } = props

  return (
    <div className={cx(styles.requestInformationWrapper, styles.secondBlock)}>
      <div className={styles.requestInformationTitleWrapper}>
        <p className={styles.sectionTitle}>{t(TranslationKey['Request terms'])}</p>

        {withoutConfirmation && (
          <div className={styles.confirmationWrapper}>
            <DoneIcon className={styles.doneIcon} />

            <Text
              tooltipInfoContent={t(
                TranslationKey['Allowed to the performer to take the application to work without confirmation'],
              )}
              className={styles.sectionTitle}
            >
              {`(${t(TranslationKey['Without confirmation']).toLocaleLowerCase()})`}
            </Text>
          </div>
        )}
      </div>

      <div className={styles.requestInfoWrapper}>
        <div className={styles.blockInfoWrapper}>
          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Task type'])}</p>
            <p className={cx(styles.blockInfoCellText)}>{freelanceRequestTypeTranslate(spec?.title)}</p>
          </div>

          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey.Time)}</p>
            <p className={styles.blockInfoCellText}>
              {timeoutAt && formatDateDistanceFromNowStrict(timeoutAt, new Date())}
            </p>
          </div>
        </div>

        {spec?.type ===
        freelanceRequestTypeByKey[freelanceRequestType.BLOGGER as keyof typeof freelanceRequestTypeByKey] ? (
          <div className={styles.blockInfoWrapper}>
            <div className={styles.blockInfoCell}>
              <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Product price'])}</p>
              <div className={styles.pricesWrapper}>
                {newProductPrice && (
                  <p className={cx(styles.blockInfoCellText, { [styles.newPrice]: !!newProductPrice })}>
                    {'$ ' + toFixed(newProductPrice, 2)}
                  </p>
                )}

                <p
                  className={cx(styles.blockInfoCellText, {
                    [styles.oldPrice]: !!newProductPrice,
                  })}
                >
                  {'$ ' + toFixed(priceAmazon, 2)}
                </p>
              </div>
            </div>

            <div className={styles.blockInfoCell}>
              <p className={styles.blockInfoCellTitle}>{t(TranslationKey.CashBack)}</p>
              <p className={cx(styles.blockInfoCellText)}>{toFixed(cashBackInPercent, 2) + ' %'}</p>
            </div>
          </div>
        ) : null}

        <div className={cx(styles.blockInfoWrapper)}>
          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey.Status)}</p>
            <RequestStatusCell
              status={status}
              textStyle={{
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '19px',
                textAlign: 'left',
                whiteSpace: 'pre-wrap',
              }}
            />
          </div>

          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Performance time'])}</p>
            <p className={cx(styles.blockInfoCellText)}>{formatNormDateTime(timeoutAt)}</p>
          </div>
        </div>

        <div className={cx(styles.blockInfoWrapper, styles.blockInfoWrapperLast)}>
          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</p>
            {price && <p className={cx(styles.price, styles.blockInfoCellText)}>{toFixedWithDollarSign(price, 2)}</p>}
          </div>

          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey.Updated)}</p>
            <p className={styles.blockInfoCellText}>{formatNormDateTime(updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
})
