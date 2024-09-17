import { Avatar, Divider, Paper, Rating } from '@mui/material'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { RequestStatus, colorByStatus } from '@constants/requests/request-status'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Text } from '@components/shared/text'

import { calcNumberMinusPercent } from '@utils/calculation'
import { formatDateDistanceFromNowStrict, formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './my-services-info-custom.style'

export const MyServicesInfoCustom = ({ request, announcementData, onClickSuggestDealBtn }) => {
  const { classes: styles, cx } = useStyles()
  const now = new Date()

  const newProductPrice =
    calcNumberMinusPercent(request?.request?.priceAmazon, request?.request?.cashBackInPercent) || null

  const disableProposeDealButton = request?.request?.status === RequestStatus.EXPIRED

  return (
    <Paper className={styles.root}>
      <div className={styles.mainBlockWrapper}>
        <div className={styles.buttonAndTitleWrapper}>
          <div className={styles.titleAndCounterkWrapper}>
            <div className={styles.titleBlockWrapper}>
              <Avatar src={getUserAvatarSrc(request?.request.createdBy._id)} className={styles.userPhoto} />

              <div className={styles.titleWrapper}>
                <p className={styles.title}>{request?.request.createdBy.name}</p>

                <Rating readOnly value={5} size="small" />
              </div>
            </div>

            <p className={styles.successDeals}>
              {t(TranslationKey['The number of total successful transactions:']) + ' 0'}
            </p>
          </div>

          <Button disabled={disableProposeDealButton} onClick={onClickSuggestDealBtn}>
            {t(TranslationKey['Suggest a deal'])}
          </Button>
        </div>

        <div className={styles.requestTitleAndInfo}>
          <p className={styles.requestTitle}>{request?.request.title}</p>
          <div className={styles.requestInfoWrapper}>
            {request?.request?.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] &&
            request?.request?.priceAmazon ? (
              <div className={styles.blockInfoWrapper}>
                <div className={styles.blockInfoCell}>
                  <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Product price'])}</p>
                  <div className={styles.pricesWrapper}>
                    {newProductPrice && (
                      <p className={cx(styles.blockInfoCellText, { [styles.newPrice]: newProductPrice })}>
                        {'$ ' + toFixed(newProductPrice, 2)}
                      </p>
                    )}

                    <p
                      className={cx(styles.blockInfoCellText, {
                        [styles.oldPrice]: newProductPrice,
                      })}
                    >
                      {'$ ' + toFixed(request?.request?.priceAmazon, 2)}
                    </p>
                  </div>
                </div>

                <div className={styles.blockInfoCell}>
                  <p className={styles.blockInfoCellTitle}>{t(TranslationKey.CashBack)}</p>
                  <p className={cx(styles.blockInfoCellText)}>
                    {toFixed(request?.request?.cashBackInPercent, 2) + ' %'}
                  </p>
                </div>
              </div>
            ) : null}
            <div className={styles.blockInfoWrapper}>
              <div className={styles.blockInfoCell}>
                <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</p>
                <p className={cx(styles.price, styles.blockInfoCellText)}>{toFixed(request?.request.price, 2) + '$'}</p>
              </div>

              <div className={styles.blockInfoCell}>
                <p className={styles.blockInfoCellTitle}>{t(TranslationKey.Status)}</p>

                <Text
                  text={MyRequestStatusTranslate(request?.request.status)}
                  color={colorByStatus(request?.request.status)}
                />
              </div>
            </div>

            <div className={cx(styles.blockInfoWrapper)}>
              <div className={styles.blockInfoCell}>
                <p className={styles.blockInfoCellTitle}>{t(TranslationKey.Time)}</p>
                <p className={styles.blockInfoCellText}>
                  {request && formatDateDistanceFromNowStrict(request?.request.timeoutAt, now)}
                </p>
              </div>

              <div className={styles.blockInfoCell}>
                <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Request type'])}</p>
                <p className={cx(styles.blockInfoCellText, styles.announcementTitle)}>
                  {request?.request?.spec?.title}
                </p>
              </div>
            </div>

            <div className={cx(styles.blockInfoWrapper, styles.blockInfoWrapperLast)}>
              <div className={styles.blockInfoCell}>
                <p className={styles.blockInfoCellTitle}>{t(TranslationKey.Updated)}</p>
                <p className={styles.blockInfoCellText}>{formatNormDateTime(request?.request.updatedAt)}</p>
              </div>

              <div className={styles.blockInfoCell}>
                <p className={styles.blockInfoCellTitle}>{t(TranslationKey['Performance time'])}</p>
                <p className={cx(styles.blockInfoCellText)}>{formatNormDateTime(request?.request.timeoutAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <Divider orientation="vertical" />

        <div className={cx(styles.announcementBlock)}>
          <p className={styles.requestTitle}>{t(TranslationKey.Announcement)}</p>
          <div className={cx(styles.announcementTitleWrapper)}>
            <p className={cx(styles.requestTitle, styles.announcementTitle)}>{announcementData?.title}</p>
            <p className={cx(styles.announcementDecription)}>{announcementData?.description}</p>
          </div>
        </div>
      </div>
    </Paper>
  )
}
