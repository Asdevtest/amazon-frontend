import { Avatar, Divider, Paper, Rating, Typography } from '@mui/material'

import { RequestStatus } from '@constants/requests/request-status'
import { freelanceRequestType, freelanceRequestTypeByKey } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

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
                <Typography className={styles.title}>{request?.request.createdBy.name}</Typography>

                <Rating
                  readOnly
                  value={5}
                  size="small"
                  // onChange={onChangeField('rating')}
                />
              </div>
            </div>

            <Typography className={styles.successDeals}>
              {t(TranslationKey['The number of total successful transactions:']) + ' 0'}
            </Typography>
          </div>

          <Button
            variant="contained"
            color="primary"
            disabled={disableProposeDealButton}
            className={styles.dealBtn}
            onClick={onClickSuggestDealBtn}
          >
            {t(TranslationKey['Suggest a deal'])}
          </Button>
        </div>

        <div className={styles.requestTitleAndInfo}>
          <Typography className={styles.requestTitle}>{request?.request.title}</Typography>
          <div className={styles.requestInfoWrapper}>
            {request?.request?.spec?.type === freelanceRequestTypeByKey[freelanceRequestType.BLOGGER] &&
            request?.request?.priceAmazon ? (
              <div className={styles.blockInfoWrapper}>
                <div className={styles.blockInfoCell}>
                  <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey['Product price'])}</Typography>
                  <div className={styles.pricesWrapper}>
                    {newProductPrice && (
                      <Typography className={cx(styles.blockInfoCellText, { [styles.newPrice]: newProductPrice })}>
                        {'$ ' + toFixed(newProductPrice, 2)}
                      </Typography>
                    )}

                    <Typography
                      className={cx(styles.blockInfoCellText, {
                        [styles.oldPrice]: newProductPrice,
                      })}
                    >
                      {'$ ' + toFixed(request?.request?.priceAmazon, 2)}
                    </Typography>
                  </div>
                </div>

                <div className={styles.blockInfoCell}>
                  <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey.CashBack)}</Typography>
                  <Typography className={cx(styles.blockInfoCellText)}>
                    {toFixed(request?.request?.cashBackInPercent, 2) + ' %'}
                  </Typography>
                </div>
              </div>
            ) : null}
            <div className={styles.blockInfoWrapper}>
              <div className={styles.blockInfoCell}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</Typography>
                <Typography className={cx(styles.price, styles.blockInfoCellText)}>
                  {toFixed(request?.request.price, 2) + '$'}
                </Typography>
              </div>

              <div className={styles.blockInfoCell}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey.Status)}</Typography>
                <RequestStatusCell
                  status={request?.request.status}
                  textStyle={{ fontWeight: 600, fontSize: 14, lineHeight: '19px', textAlign: 'left' }}
                />
              </div>
            </div>

            <div className={cx(styles.blockInfoWrapper)}>
              <div className={styles.blockInfoCell}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey.Time)}</Typography>
                <Typography className={styles.blockInfoCellText}>
                  {request && formatDateDistanceFromNowStrict(request?.request.timeoutAt, now)}
                </Typography>
              </div>

              <div className={styles.blockInfoCell}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey['Task type'])}</Typography>
                <Typography className={cx(styles.blockInfoCellText, styles.announcementTitle)}>
                  {request?.request?.spec?.title}
                </Typography>
              </div>
            </div>

            <div className={cx(styles.blockInfoWrapper, styles.blockInfoWrapperLast)}>
              <div className={styles.blockInfoCell}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey.Updated)}</Typography>
                <Typography className={styles.blockInfoCellText}>
                  {formatNormDateTime(request?.request.updatedAt)}
                </Typography>
              </div>

              <div className={styles.blockInfoCell}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey['Performance time'])}</Typography>
                <Typography className={cx(styles.blockInfoCellText)}>
                  {formatNormDateTime(request?.request.timeoutAt)}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <Divider orientation="vertical" />

        <div className={cx(styles.announcementBlock)}>
          <Typography className={styles.requestTitle}>{t(TranslationKey.Announcement)}</Typography>
          <div className={cx(styles.announcementTitleWrapper)}>
            <Typography className={cx(styles.requestTitle, styles.announcementTitle)}>
              {announcementData?.title}
            </Typography>
            <Typography className={cx(styles.announcementDecription)}>{announcementData?.description}</Typography>
          </div>
        </div>
      </div>
    </Paper>
  )
}
