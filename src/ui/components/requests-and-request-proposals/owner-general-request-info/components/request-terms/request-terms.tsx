import { FC, memo } from 'react'
import { MdDone } from 'react-icons/md'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import {
  colorByDifficultyLevel,
  difficultyLevelByCode,
  difficultyLevelTranslate,
} from '@constants/statuses/difficulty-level'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Text } from '@components/shared/text'

import { formatDateDistanceFromNowStrict, formatNormDateTime } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ISpec } from '@typings/shared/spec'

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
  taskComplexity: number
  ideaIds: { xid: string; _id: string }
  onClickIdeaId: (ideaId: string) => void
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
    taskComplexity,
    ideaIds,
    onClickIdeaId,
  } = props
  return (
    <div className={styles.requestInformationWrapper}>
      <div className={styles.requestInformationTitleWrapper}>
        <p className={styles.sectionTitle}>{t(TranslationKey['Request terms'])}</p>

        {withoutConfirmation && (
          <div className={styles.confirmationWrapper}>
            <MdDone size={19} className={styles.doneIcon} />

            <p
              title={t(TranslationKey['Allowed to the performer to take the application to work without confirmation'])}
              className={styles.sectionTitle}
            >
              {`(${t(TranslationKey['Without confirmation']).toLocaleLowerCase()})`}
            </p>
          </div>
        )}

        <div className={styles.flexRow}>
          <p className={styles.sectionTitle}>{t(TranslationKey.Category)}:</p>
          <p
            className={styles.sectionTitle}
            style={{ color: colorByDifficultyLevel(difficultyLevelByCode[taskComplexity]) }}
          >
            {difficultyLevelTranslate(difficultyLevelByCode[taskComplexity])}
          </p>
        </div>
        {ideaIds ? (
          <>
            <p className={styles.sectionTitle}>{t(TranslationKey.Idea) + ' №'}:</p>
            <p className={styles.lnkTitle} onClick={() => onClickIdeaId(ideaIds._id)}>
              {ideaIds.xid}
            </p>
          </>
        ) : null}
      </div>

      <div className={styles.requestInfoWrapper}>
        <div className={styles.blockInfoWrapper}>
          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Request type'])}</p>
            <p className={styles.blockInfoCellText}>{spec?.title}</p>
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
              <div className={styles.flexRow}>
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

            <Text text={MyRequestStatusTranslate(status)} color={colorByStatus(status)} />
          </div>

          <div className={styles.blockInfoCell}>
            <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Performance time'])}</p>
            <p className={cx(styles.blockInfoCellText)}>{formatNormDateTime(timeoutAt)}</p>
          </div>
        </div>

        <div className={styles.blockInfoWrapper}>
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
